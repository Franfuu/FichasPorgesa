<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFichaDespieceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre_pieza' => 'sometimes|required|string|max:255',
            'material'     => 'sometimes|required|in:Aluminio,Acero',
            'largo'        => 'sometimes|required|numeric|min:0',
            'ancho'        => 'sometimes|required|numeric|min:0',
            'grosor'       => 'sometimes|required|numeric|min:0',
            'cantidad'     => 'sometimes|required|integer|min:1',
            'cliente'      => 'sometimes|required|string|max:255',
            'archivo_pdf'  => 'nullable|file|mimes:pdf|max:10240',
        ];
    }
}
