<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\FichaDespieceController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Auth
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login',    [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->post('/auth/logout', [AuthController::class, 'logout']);

    // Fichas de Despiece (público: listar/ver/descargar PDF)
    Route::get('/fichas-despiece',          [FichaDespieceController::class, 'index']);
    Route::get('/fichas-despiece/{fichaDespiece}', [FichaDespieceController::class, 'show']);
    Route::get('/fichas-despiece/{fichaDespiece}/pdf', [FichaDespieceController::class, 'downloadPdf']);

    // Fichas de Despiece (protegido: crear/editar/borrar)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/fichas-despiece',                       [FichaDespieceController::class, 'store']);
        Route::match(['put', 'patch'], '/fichas-despiece/{fichaDespiece}', [FichaDespieceController::class, 'update']);
        Route::delete('/fichas-despiece/{fichaDespiece}',    [FichaDespieceController::class, 'destroy']);
    });

});
