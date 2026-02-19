import React, { useState } from 'react';
import type { FichaDespiece, FichaDespiececreateDTO } from '../types/ficha';
import { Button } from './Button';

interface FormularioFichaProps {
  ficha?: FichaDespiece;
  onSubmit: (data: FichaDespiececreateDTO) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const FormularioFicha: React.FC<FormularioFichaProps> = ({
  ficha,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    nombre_pieza: ficha?.nombre_pieza || '',
    material: ficha?.material || 'Aluminio',
    largo: ficha?.largo?.toString() || '',
    ancho: ficha?.ancho?.toString() || '',
    grosor: ficha?.grosor?.toString() || '',
    cantidad: ficha?.cantidad?.toString() || '',
    cliente: ficha?.cliente || '',
  });

  const [archivo, setArchivo] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors((prev) => ({
          ...prev,
          archivo_pdf: 'Solo se permiten archivos PDF',
        }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        setErrors((prev) => ({
          ...prev,
          archivo_pdf: 'El archivo no debe superar los 10MB',
        }));
        return;
      }
      setArchivo(file);
      setErrors((prev) => ({ ...prev, archivo_pdf: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre_pieza.trim()) {
      newErrors.nombre_pieza = 'El nombre de la pieza es requerido';
    }
    if (!formData.cliente.trim()) {
      newErrors.cliente = 'El cliente es requerido';
    }
    if (!formData.largo || Number(formData.largo) <= 0) {
      newErrors.largo = 'El largo debe ser mayor a 0';
    }
    if (!formData.ancho || Number(formData.ancho) <= 0) {
      newErrors.ancho = 'El ancho debe ser mayor a 0';
    }
    if (!formData.grosor || Number(formData.grosor) <= 0) {
      newErrors.grosor = 'El grosor debe ser mayor a 0';
    }
    if (!formData.cantidad || Number(formData.cantidad) <= 0) {
      newErrors.cantidad = 'La cantidad debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data: FichaDespiececreateDTO = {
      nombre_pieza: formData.nombre_pieza,
      material: formData.material as 'Aluminio' | 'Acero',
      largo: Number(formData.largo),
      ancho: Number(formData.ancho),
      grosor: Number(formData.grosor),
      cantidad: Number(formData.cantidad),
      cliente: formData.cliente,
      archivo_pdf: archivo || undefined,
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Nombre de la Pieza <span style={{ color: '#aa1111' }}>*</span>
          </label>
          <input
            type="text"
            name="nombre_pieza"
            value={formData.nombre_pieza}
            onChange={handleChange}
            placeholder="Ej: Placa base modelo X"
            required
            disabled={loading}
            className="form-input"
          />
          {errors.nombre_pieza && (
            <span className="form-error">{errors.nombre_pieza}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Material <span style={{ color: '#aa1111' }}>*</span>
          </label>
          <select
            name="material"
            value={formData.material}
            onChange={handleChange}
            required
            disabled={loading}
            className="form-select"
          >
            <option value="Aluminio">Aluminio</option>
            <option value="Acero">Acero</option>
          </select>
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '16px' }}>
        <label className="form-label">Dimensiones (mm)</label>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Largo <span style={{ color: '#aa1111' }}>*</span>
            </label>
            <input
              type="number"
              name="largo"
              step="0.01"
              value={formData.largo}
              onChange={handleChange}
              placeholder="0.00"
              required
              disabled={loading}
              className="form-input mono"
            />
            {errors.largo && (
              <span className="form-error">{errors.largo}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Ancho <span style={{ color: '#aa1111' }}>*</span>
            </label>
            <input
              type="number"
              name="ancho"
              step="0.01"
              value={formData.ancho}
              onChange={handleChange}
              placeholder="0.00"
              required
              disabled={loading}
              className="form-input mono"
            />
            {errors.ancho && (
              <span className="form-error">{errors.ancho}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Grosor <span style={{ color: '#aa1111' }}>*</span>
            </label>
            <input
              type="number"
              name="grosor"
              step="0.01"
              value={formData.grosor}
              onChange={handleChange}
              placeholder="0.00"
              required
              disabled={loading}
              className="form-input mono"
            />
            {errors.grosor && (
              <span className="form-error">{errors.grosor}</span>
            )}
          </div>
        </div>
      </div>

      <div className="form-row" style={{ marginTop: '8px' }}>
        <div className="form-group">
          <label className="form-label">
            Cantidad <span style={{ color: '#aa1111' }}>*</span>
          </label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            placeholder="1"
            required
            disabled={loading}
            className="form-input mono"
          />
          {errors.cantidad && (
            <span className="form-error">{errors.cantidad}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Cliente <span style={{ color: '#aa1111' }}>*</span>
          </label>
          <input
            type="text"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            placeholder="Ej: Industrias Metálicas S.A."
            required
            disabled={loading}
            className="form-input"
          />
          {errors.cliente && (
            <span className="form-error">{errors.cliente}</span>
          )}
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '16px' }}>
        <label className="form-label">Archivo PDF del Plano</label>
        <div className="file-upload-area">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="archivo-pdf"
            disabled={loading}
          />
          <label htmlFor="archivo-pdf" style={{ cursor: 'pointer' }}>
            {archivo ? archivo.name : 'Haz clic para subir un archivo PDF'}
          </label>
          <span style={{ display: 'block', fontSize: '11px', color: '#888', marginTop: '4px' }}>
            Máximo 10 MB — Solo archivos PDF
          </span>
          {archivo && (
            <button
              type="button"
              onClick={() => setArchivo(null)}
              className="btn btn-danger btn-sm"
              style={{ marginTop: '8px' }}
            >
              Quitar archivo
            </button>
          )}
        </div>
        {errors.archivo_pdf && (
          <span className="form-error">{errors.archivo_pdf}</span>
        )}
      </div>

      <div className="form-row" style={{ marginTop: '20px', borderTop: '1px solid #bbb', paddingTop: '16px' }}>
        <Button type="submit" variant="primary" loading={loading}>
          {ficha ? 'Actualizar Ficha' : 'Crear Ficha'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
