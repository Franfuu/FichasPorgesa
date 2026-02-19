// Tipos relacionados con Fichas de Despiece

export interface FichaDespiece {
  id: number;
  nombre_pieza: string;
  material: 'Aluminio' | 'Acero';
  largo: number;
  ancho: number;
  grosor: number;
  cantidad: number;
  cliente: string;
  archivo_pdf_url?: string;
  archivo_pdf_nombre?: string;
  created_at: string;
  updated_at: string;
}

export interface FichaDespiececreateDTO {
  nombre_pieza: string;
  material: 'Aluminio' | 'Acero';
  largo: number;
  ancho: number;
  grosor: number;
  cantidad: number;
  cliente: string;
  archivo_pdf?: File;
}

export type FichaDespieceUpdateDTO = Partial<FichaDespiececreateDTO>;

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  response?: {
    data?: ApiError;
    status?: number;
  };
}
