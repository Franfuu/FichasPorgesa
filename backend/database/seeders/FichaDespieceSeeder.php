<?php

namespace Database\Seeders;

use App\Models\FichaDespiece;
use Illuminate\Database\Seeder;

class FichaDespieceSeeder extends Seeder
{
    public function run(): void
    {
        $fichas = [
            [
                'nombre_pieza' => 'Placa Base Estructura',
                'material'     => 'Acero',
                'largo'        => 200.00,
                'ancho'        => 150.00,
                'grosor'       => 10.00,
                'cantidad'     => 4,
                'cliente'      => 'Industrias Martínez S.L.',
                'archivo_pdf'  => null,
            ],
            [
                'nombre_pieza' => 'Perfil Lateral Izquierdo',
                'material'     => 'Aluminio',
                'largo'        => 350.00,
                'ancho'        => 40.00,
                'grosor'       => 3.00,
                'cantidad'     => 2,
                'cliente'      => 'Metalúrgica Pérez',
                'archivo_pdf'  => null,
            ],
            [
                'nombre_pieza' => 'Perfil Lateral Derecho',
                'material'     => 'Aluminio',
                'largo'        => 350.00,
                'ancho'        => 40.00,
                'grosor'       => 3.00,
                'cantidad'     => 2,
                'cliente'      => 'Metalúrgica Pérez',
                'archivo_pdf'  => null,
            ],
            [
                'nombre_pieza' => 'Tapa Superior',
                'material'     => 'Aluminio',
                'largo'        => 500.00,
                'ancho'        => 300.00,
                'grosor'       => 5.00,
                'cantidad'     => 1,
                'cliente'      => 'Construcciones López',
                'archivo_pdf'  => null,
            ],
            [
                'nombre_pieza' => 'Soporte Refuerzo Central',
                'material'     => 'Acero',
                'largo'        => 120.00,
                'ancho'        => 80.00,
                'grosor'       => 8.00,
                'cantidad'     => 6,
                'cliente'      => 'Industrias Martínez S.L.',
                'archivo_pdf'  => null,
            ],
            [
                'nombre_pieza' => 'Chapa Frontal',
                'material'     => 'Acero',
                'largo'        => 400.00,
                'ancho'        => 250.00,
                'grosor'       => 6.00,
                'cantidad'     => 1,
                'cliente'      => 'Taller Gómez',
                'archivo_pdf'  => null,
            ],
            [
                'nombre_pieza' => 'Ángulo Esquinero',
                'material'     => 'Aluminio',
                'largo'        => 100.00,
                'ancho'        => 100.00,
                'grosor'       => 4.00,
                'cantidad'     => 8,
                'cliente'      => 'Construcciones López',
                'archivo_pdf'  => null,
            ],
            [
                'nombre_pieza' => 'Nervio Transversal',
                'material'     => 'Acero',
                'largo'        => 280.00,
                'ancho'        => 30.00,
                'grosor'       => 5.00,
                'cantidad'     => 10,
                'cliente'      => 'Metalúrgica Pérez',
                'archivo_pdf'  => null,
            ],
            [
                'nombre_pieza' => 'Bandeja Portacables',
                'material'     => 'Aluminio',
                'largo'        => 600.00,
                'ancho'        => 80.00,
                'grosor'       => 2.00,
                'cantidad'     => 3,
                'cliente'      => 'Taller Gómez',
                'archivo_pdf'  => null,
            ],
            [
                'nombre_pieza' => 'Placa Anclaje',
                'material'     => 'Acero',
                'largo'        => 90.00,
                'ancho'        => 90.00,
                'grosor'       => 12.00,
                'cantidad'     => 12,
                'cliente'      => 'Industrias Martínez S.L.',
                'archivo_pdf'  => null,
            ],
        ];

        foreach ($fichas as $ficha) {
            FichaDespiece::create($ficha);
        }
    }
}
