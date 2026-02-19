<?php

namespace App\Http\Controllers\Api\V1;

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
    // Público
    public function index(): FichaDespieceCollection
    {
        $fichas = FichaDespiece::latest()->paginate(15);

        return new FichaDespieceCollection($fichas);
    }

    // Público
    public function show(FichaDespiece $fichaDespiece): FichaDespieceResource
    {
        return new FichaDespieceResource($fichaDespiece);
    }

    // Protegido
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

    // Protegido
    public function update(UpdateFichaDespieceRequest $request, FichaDespiece $fichaDespiece): FichaDespieceResource
    {
        $data = $request->validated();

        if ($request->hasFile('archivo_pdf')) {
            if ($fichaDespiece->archivo_pdf) {
                Storage::disk('public')->delete($fichaDespiece->archivo_pdf);
            }
            $data['archivo_pdf'] = $request->file('archivo_pdf')
                ->store('fichas_pdf', 'public');
        }

        $fichaDespiece->update($data);

        return new FichaDespieceResource($fichaDespiece);
    }

    // Público
    public function downloadPdf(FichaDespiece $fichaDespiece)
    {
        if (!$fichaDespiece->archivo_pdf) {
            return response()->json(['message' => 'Esta ficha no tiene PDF asociado'], 404);
        }

        if (!Storage::disk('public')->exists($fichaDespiece->archivo_pdf)) {
            return response()->json(['message' => 'Archivo no encontrado'], 404);
        }

        $path = Storage::disk('public')->path($fichaDespiece->archivo_pdf);
        $filename = basename($fichaDespiece->archivo_pdf);

        return response()->download($path, $filename, [
            'Content-Type' => 'application/pdf',
        ]);
    }

    // Protegido
    public function destroy(FichaDespiece $fichaDespiece): JsonResponse
    {
        if ($fichaDespiece->archivo_pdf) {
            Storage::disk('public')->delete($fichaDespiece->archivo_pdf);
        }

        $fichaDespiece->delete();

        return response()->json(null, 204);
    }
}
