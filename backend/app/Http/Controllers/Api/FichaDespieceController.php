<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFichaDespieceRequest;
use App\Http\Requests\UpdateFichaDespieceRequest;
use App\Http\Resources\FichaDespieceCollection;
use App\Http\Resources\FichaDespieceResource;
use App\Models\FichaDespiece;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class FichaDespieceController extends Controller
{
    /**
     * Listar todas las fichas (con paginación opcional).
     */
    public function index(): FichaDespieceCollection
    {
        $fichas = FichaDespiece::latest()->paginate(15);

        return new FichaDespieceCollection($fichas);
    }

    /**
     * Crear una nueva ficha.
     */
    public function store(StoreFichaDespieceRequest $request): FichaDespieceResource
    {
        $data = $request->validated();

        if ($request->hasFile('archivo_pdf')) {
            $data['archivo_pdf'] = $request->file('archivo_pdf')
                ->store('fichas_pdf', 'public');
        }

        $ficha = FichaDespiece::create($data);

        return new FichaDespieceResource($ficha);
    }

    /**
     * Mostrar una ficha concreta.
     */
    public function show(FichaDespiece $fichaDespiece): FichaDespieceResource
    {
        return new FichaDespieceResource($fichaDespiece);
    }

    /**
     * Actualizar una ficha.
     */
    public function update(UpdateFichaDespieceRequest $request, FichaDespiece $fichaDespiece): FichaDespieceResource
    {
        $data = $request->validated();

        if ($request->hasFile('archivo_pdf')) {
            // Eliminar PDF anterior si existe
            if ($fichaDespiece->archivo_pdf) {
                Storage::disk('public')->delete($fichaDespiece->archivo_pdf);
            }
            $data['archivo_pdf'] = $request->file('archivo_pdf')
                ->store('fichas_pdf', 'public');
        }

        $fichaDespiece->update($data);

        return new FichaDespieceResource($fichaDespiece);
    }

    /**
     * Eliminar una ficha.
     */
    public function destroy(FichaDespiece $fichaDespiece): JsonResponse
    {
        if ($fichaDespiece->archivo_pdf) {
            Storage::disk('public')->delete($fichaDespiece->archivo_pdf);
        }

        $fichaDespiece->delete();

        return response()->json(['message' => 'Ficha eliminada correctamente.']);
    }
}
