<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFichaDespieceRequest extends FormRequest
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
            'nombre_pieza' => 'required|string|max:255',
            'material'     => 'required|in:Aluminio,Acero',
            'largo'        => 'required|numeric|min:0',
            'ancho'        => 'required|numeric|min:0',
            'grosor'       => 'required|numeric|min:0',
            'cantidad'     => 'required|integer|min:1',
            'cliente'      => 'required|string|max:255',
            'archivo_pdf'  => 'nullable|file|mimes:pdf|max:10240',
        ];
    }
}
