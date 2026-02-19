<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FichaDespiece extends Model
{
    protected $table = 'fichas_despiece';

    protected $fillable = [
        'nombre_pieza',
        'material',
        'largo',
        'ancho',
        'grosor',
        'cantidad',
        'cliente',
        'archivo_pdf',
    ];

    protected $casts = [
        'largo' => 'decimal:2',
        'ancho' => 'decimal:2',
        'grosor' => 'decimal:2',
        'cantidad' => 'integer',
    ];
}

