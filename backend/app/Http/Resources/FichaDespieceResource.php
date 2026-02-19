<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FichaDespieceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'nombre_pieza' => $this->nombre_pieza,
            'material'     => $this->material,
            'largo'        => $this->largo,
            'ancho'        => $this->ancho,
            'grosor'       => $this->grosor,
            'cantidad'     => $this->cantidad,
            'cliente'      => $this->cliente,
            'archivo_pdf_url'    => $this->archivo_pdf
                ? asset('storage/' . $this->archivo_pdf)
                : null,
            'archivo_pdf_nombre' => $this->archivo_pdf
                ? basename($this->archivo_pdf)
                : null,
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
        ];
    }
}
