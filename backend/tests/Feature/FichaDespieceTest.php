<?php

namespace Tests\Feature;

use App\Models\FichaDespiece;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FichaDespieceTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Preparamos datos de prueba antes de cada test.
     * Así nos aseguramos de que siempre hay fichas en la BD de testing.
     */
    protected function setUp(): void
    {
        parent::setUp();

        FichaDespiece::create([
            'nombre_pieza' => 'Placa Base Estructura',
            'material'     => 'Acero',
            'largo'        => 200.00,
            'ancho'        => 150.00,
            'grosor'       => 10.00,
            'cantidad'     => 4,
            'cliente'      => 'Industrias Martínez S.L.',
        ]);

        FichaDespiece::create([
            'nombre_pieza' => 'Perfil Lateral Izquierdo',
            'material'     => 'Aluminio',
            'largo'        => 350.00,
            'ancho'        => 40.00,
            'grosor'       => 3.00,
            'cantidad'     => 2,
            'cliente'      => 'Metalúrgica Pérez',
        ]);

        FichaDespiece::create([
            'nombre_pieza' => 'Tapa Superior',
            'material'     => 'Aluminio',
            'largo'        => 500.00,
            'ancho'        => 300.00,
            'grosor'       => 5.00,
            'cantidad'     => 1,
            'cliente'      => 'Construcciones López',
        ]);
    }

    // =========================================================
    // HAPPY PATH - todo funciona como se espera
    // =========================================================

    /**
     * Comprueba que el listado de fichas devuelve 200 y la estructura correcta.
     */
    public function test_get_fichas_despiece_list(): void
    {
        $response = $this->getJson('/api/v1/fichas-despiece');

        // Primero comprobamos que el status sea 200
        $response->assertStatus(200);

        // Comprobamos que la estructura JSON sea la esperada (paginada)
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'nombre_pieza',
                    'material',
                    'largo',
                    'ancho',
                    'grosor',
                    'cantidad',
                    'cliente',
                    'archivo_pdf_url',
                    'archivo_pdf_nombre',
                    'created_at',
                    'updated_at',
                ],
            ],
            'current_page',
            'last_page',
            'per_page',
            'total',
        ]);

        // Comprobamos que entre los datos viene la ficha que sabemos que existe
        $response->assertJsonFragment([
            'nombre_pieza' => 'Placa Base Estructura',
        ]);

        // Sabemos que hay 3 fichas, el total debe ser 3
        $response->assertJsonFragment(['total' => 3]);
    }

    /**
     * Comprueba que el detalle de una ficha concreta devuelve 200 y los datos correctos.
     */
    public function test_get_ficha_despiece_detail(): void
    {
        $ficha = FichaDespiece::where('nombre_pieza', 'Placa Base Estructura')->first();

        $response = $this->getJson("/api/v1/fichas-despiece/{$ficha->id}");

        // Comprobamos que el status sea 200
        $response->assertStatus(200);

        // Comprobamos la estructura del objeto devuelto (viene dentro de 'data' por el Resource)
        $response->assertJsonStructure([
            'data' => [
                'id',
                'nombre_pieza',
                'material',
                'largo',
                'ancho',
                'grosor',
                'cantidad',
                'cliente',
                'archivo_pdf_url',
                'archivo_pdf_nombre',
                'created_at',
                'updated_at',
            ],
        ]);

        // Comprobamos que los datos son los de esa ficha en concreto
        $response->assertJsonFragment([
            'id'           => $ficha->id,
            'nombre_pieza' => 'Placa Base Estructura',
            'cliente'      => 'Industrias Martínez S.L.',
        ]);
    }

    // =========================================================
    // UNHAPPY PATH - comprobamos cómo se comporta ante errores
    // =========================================================

    /**
     * Comprueba que pedir una ficha que no existe devuelve 404.
     */
    public function test_get_non_existing_ficha_returns_404(): void
    {
        $nonExistingId = 9999;
        $response = $this->getJson("/api/v1/fichas-despiece/{$nonExistingId}");

        // Esperamos un 404, no un crash ni un 200 vacío
        $response->assertStatus(404);
    }

    /**
     * Un usuario NO autenticado no debe poder crear fichas (401).
     */
    public function test_unauthenticated_user_cannot_create_ficha(): void
    {
        $data = [
            'nombre_pieza' => 'Pieza No Autorizada',
            'material'     => 'Acero',
            'largo'        => 100.00,
            'ancho'        => 50.00,
            'grosor'       => 5.00,
            'cantidad'     => 2,
            'cliente'      => 'Cliente Intruso',
        ];

        $response = $this->postJson('/api/v1/fichas-despiece', $data);

        // Sin token, la API debe devolver 401 Unauthorized
        $response->assertStatus(401);
    }

    /**
     * Un usuario autenticado SÍ puede crear una nueva ficha (201).
     */
    public function test_authenticated_user_can_create_ficha(): void
    {
        /** @var User $user */
        $user = User::factory()->createOne();

        $data = [
            'nombre_pieza' => 'Pieza de Prueba Autenticada',
            'material'     => 'Acero',
            'largo'        => 150.00,
            'ancho'        => 75.00,
            'grosor'       => 8.00,
            'cantidad'     => 3,
            'cliente'      => 'Cliente Autenticado SA',
        ];

        $response = $this->actingAs($user)->postJson('/api/v1/fichas-despiece', $data);

        // Con usuario autenticado, debe crearse la ficha y devolver 201
        $response->assertStatus(201);

        // Comprobamos que los datos de la respuesta son los que enviamos
        $response->assertJsonFragment([
            'nombre_pieza' => 'Pieza de Prueba Autenticada',
            'cliente'      => 'Cliente Autenticado SA',
        ]);

        // También comprobamos que realmente se guardó en BD
        $this->assertDatabaseHas('fichas_despiece', [
            'nombre_pieza' => 'Pieza de Prueba Autenticada',
        ]);
    }

    /**
     * Un usuario autenticado puede eliminar una ficha existente (204).
     */
    public function test_authenticated_user_can_delete_ficha(): void
    {
        /** @var User $user */
        $user  = User::factory()->createOne();
        $ficha = FichaDespiece::first();

        $response = $this->actingAs($user)->deleteJson("/api/v1/fichas-despiece/{$ficha->id}");

        // Debe devolver 204 No Content
        $response->assertStatus(204);

        // Y la ficha ya no debe estar en la base de datos
        $this->assertDatabaseMissing('fichas_despiece', ['id' => $ficha->id]);
    }

    /**
     * Un usuario NO autenticado no puede eliminar fichas (401).
     */
    public function test_unauthenticated_user_cannot_delete_ficha(): void
    {
        $ficha = FichaDespiece::first();

        $response = $this->deleteJson("/api/v1/fichas-despiece/{$ficha->id}");

        $response->assertStatus(401);
    }
}
