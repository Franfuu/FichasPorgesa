<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    // =========================================================
    // HAPPY PATH
    // =========================================================

    /**
     * Un usuario se puede registrar correctamente.
     */
    public function test_user_can_register(): void
    {
        $data = [
            'name'     => 'Fran Prueba',
            'email'    => 'fran@prueba.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/v1/auth/register', $data);

        // Debe devolver 201 Created con el usuario y su token
        $response->assertStatus(201);

        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
            ],
            'token',
        ]);

        // Comprobamos que el usuario se guardó en BD
        $this->assertDatabaseHas('users', [
            'email' => 'fran@prueba.com',
        ]);
    }

    /**
     * Un usuario registrado puede hacer login con sus credenciales correctas.
     */
    public function test_user_can_login(): void
    {
        // Creamos el usuario con contraseña conocida
        User::factory()->create([
            'email'    => 'login@prueba.com',
            'password' => Hash::make('password123'),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email'    => 'login@prueba.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200);

        // La respuesta debe incluir el usuario y el token de acceso
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
            ],
            'token',
        ]);
    }

    /**
     * Un usuario autenticado puede cerrar sesión correctamente.
     */
    public function test_authenticated_user_can_logout(): void
    {
        $user  = User::factory()->create();
        $token = $user->createToken('api-token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/v1/auth/logout');

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'message' => 'Sesión cerrada correctamente.',
        ]);
    }

    // =========================================================
    // UNHAPPY PATH - errores y casos límite
    // =========================================================

    /**
     * Un login con contraseña incorrecta debe devolver 422.
     */
    public function test_invalid_credentials_return_error(): void
    {
        User::factory()->create([
            'email'    => 'test@prueba.com',
            'password' => Hash::make('passwordcorrecto'),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email'    => 'test@prueba.com',
            'password' => 'passwordincorrecto',
        ]);

        // Laravel lanza un ValidationException que devuelve 422
        $response->assertStatus(422);
    }

    /**
     * No se puede registrar con un email que ya existe.
     */
    public function test_cannot_register_with_duplicate_email(): void
    {
        User::factory()->create([
            'email' => 'duplicado@prueba.com',
        ]);

        $data = [
            'name'     => 'Otro Usuario',
            'email'    => 'duplicado@prueba.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/v1/auth/register', $data);

        // Validación debe fallar con 422
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    /**
     * No se puede obtener datos protegidos sin token.
     */
    public function test_unauthenticated_request_returns_401(): void
    {
        $response = $this->postJson('/api/v1/auth/logout');

        $response->assertStatus(401);
    }
}
