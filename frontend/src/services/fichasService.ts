import type { FichaDespiece, FichaDespiececreateDTO, FichaDespieceUpdateDTO, PaginatedResponse } from '../types/ficha';
import { http } from './http';

const API_BASE_URL = import.meta.env.VITE_API_URL as string | undefined;

if (API_BASE_URL == undefined) {
    throw new Error("No está definida la URL de la API");
}

const API_URL = API_BASE_URL + "/fichas-despiece";

export const fichasService = {
    get(id: number): Promise<FichaDespiece> {
        return http.get<{ data: FichaDespiece }>(`${API_URL}/${id}`).then(response => response.data.data);
    },

    getAll(page = 1, perPage = 10): Promise<PaginatedResponse<FichaDespiece>> {
        return http.get<PaginatedResponse<FichaDespiece>>(API_URL, {
            params: { page, per_page: perPage },
        }).then(response => response.data);
    },

    delete(id: number): Promise<void> {
        return http.delete<void>(`${API_URL}/${id}`).then(() => {});
    },

    create(data: FichaDespiececreateDTO): Promise<FichaDespiece> {
        const formData = new FormData();
        
        formData.append('nombre_pieza', data.nombre_pieza);
        formData.append('material', data.material);
        formData.append('largo', data.largo.toString());
        formData.append('ancho', data.ancho.toString());
        formData.append('grosor', data.grosor.toString());
        formData.append('cantidad', data.cantidad.toString());
        formData.append('cliente', data.cliente);
        
        if (data.archivo_pdf) {
            formData.append('archivo_pdf', data.archivo_pdf);
        }

        return http.post<{ data: FichaDespiece }>(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => response.data.data);
    },

    update(id: number, data: FichaDespieceUpdateDTO): Promise<FichaDespiece> {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        
        if (data.nombre_pieza) formData.append('nombre_pieza', data.nombre_pieza);
        if (data.material) formData.append('material', data.material);
        if (data.largo !== undefined) formData.append('largo', data.largo.toString());
        if (data.ancho !== undefined) formData.append('ancho', data.ancho.toString());
        if (data.grosor !== undefined) formData.append('grosor', data.grosor.toString());
        if (data.cantidad !== undefined) formData.append('cantidad', data.cantidad.toString());
        if (data.cliente) formData.append('cliente', data.cliente);
        if (data.archivo_pdf) formData.append('archivo_pdf', data.archivo_pdf);

        return http.post<{ data: FichaDespiece }>(`${API_URL}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => response.data.data);
    },

    downloadPDF(id: number): Promise<Blob> {
        return http.get(`${API_URL}/${id}/pdf`, {
            responseType: 'blob',
        }).then(response => response.data);
    },
};
