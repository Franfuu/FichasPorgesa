<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fichas_despiece', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_pieza');
            $table->enum('material', ['Aluminio', 'Acero']);
            $table->decimal('largo', 10, 2);
            $table->decimal('ancho', 10, 2);
            $table->decimal('grosor', 10, 2);
            $table->integer('cantidad');
            $table->string('cliente');
            $table->string('archivo_pdf')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fichas_despiece');
    }
};
