import React from 'react';
import type { FichaDespiece } from '../types/ficha';
import { Button } from './Button';

interface DetalleFichaProps {
  ficha: FichaDespiece;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDownloadPDF?: () => void;
}

export const DetalleFicha: React.FC<DetalleFichaProps> = ({
  ficha,
  onBack,
  onEdit,
  onDelete,
  onDownloadPDF,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="detail-wrapper">
      {/* Barra de acciones */}
      <div className="actions-bar">
        <Button variant="secondary" onClick={onBack}>
          &larr; Volver
        </Button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="primary" onClick={onEdit}>
            Editar
          </Button>
          {ficha.archivo_pdf_url && onDownloadPDF && (
            <Button variant="success" onClick={onDownloadPDF}>
              Descargar PDF
            </Button>
          )}
          <Button variant="danger" onClick={onDelete}>
            Eliminar
          </Button>
        </div>
      </div>

      {/* Información Principal */}
      <div className="panel">
        <div className="panel-header">
          <span>{ficha.nombre_pieza}</span>
          <span
            className={
              ficha.material === 'Aluminio' ? 'badge badge-aluminio' : 'badge badge-acero'
            }
          >
            {ficha.material}
          </span>
        </div>
        <div className="panel-body">
          <div className="detail-grid">
            <div className="detail-field">
              <span className="detail-label">ID</span>
              <span className="detail-value mono">#{ficha.id}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Cliente</span>
              <span className="detail-value">{ficha.cliente}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Material</span>
              <span className="detail-value">{ficha.material}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Cantidad</span>
              <span className="detail-value mono">{ficha.cantidad} uds.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dimensiones */}
      <div className="panel">
        <div className="panel-header">Dimensiones Técnicas</div>
        <div className="panel-body">
          <table className="dim-table">
            <thead>
              <tr>
                <th>Dimensión</th>
                <th>Valor (mm)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Largo</td>
                <td className="mono">{ficha.largo}</td>
              </tr>
              <tr>
                <td>Ancho</td>
                <td className="mono">{ficha.ancho}</td>
              </tr>
              <tr>
                <td>Grosor</td>
                <td className="mono">{ficha.grosor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Archivo PDF */}
      {ficha.archivo_pdf_url && (
        <div className="panel">
          <div className="panel-header">Archivo del Plano</div>
          <div className="panel-body">
            <div className="detail-field">
              <span className="detail-label">Archivo</span>
              <span className="detail-value">
                {ficha.archivo_pdf_nombre || 'Plano técnico'} — PDF
              </span>
            </div>
            {onDownloadPDF && (
              <div style={{ marginTop: '12px' }}>
                <Button variant="primary" onClick={onDownloadPDF}>
                  Descargar PDF
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fechas */}
      <div className="panel">
        <div className="panel-header">Registro</div>
        <div className="panel-body">
          <div className="detail-grid">
            <div className="detail-field">
              <span className="detail-label">Creado</span>
              <span className="detail-value mono">{formatDate(ficha.created_at)}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Actualizado</span>
              <span className="detail-value mono">{formatDate(ficha.updated_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
