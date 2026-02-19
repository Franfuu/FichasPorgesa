import React from 'react';
import type { FichaDespiece } from '../types/ficha';
import { Button } from './Button';
import { Spinner } from './Spinner';

interface ListaFichasProps {
  fichas: FichaDespiece[];
  loading?: boolean;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDownloadPDF?: (id: number) => void;
}

export const ListaFichas: React.FC<ListaFichasProps> = ({
  fichas,
  loading = false,
  onView,
  onEdit,
  onDelete,
  onDownloadPDF,
}) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>#ID</th>
          <th>Nombre de Pieza</th>
          <th>Material</th>
          <th>Largo (mm)</th>
          <th>Ancho (mm)</th>
          <th>Grosor (mm)</th>
          <th>Cantidad</th>
          <th>Cliente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr className="loading-row">
            <td colSpan={9}>
              <Spinner message="Cargando fichas..." size="md" />
            </td>
          </tr>
        )}
        {!loading && fichas.length === 0 && (
          <tr>
            <td colSpan={9}>
              <div className="empty-state">
                <h3>No hay fichas registradas</h3>
                <p>Crea la primera ficha de despiece para comenzar.</p>
              </div>
            </td>
          </tr>
        )}
        {!loading && fichas.map((ficha) => (
          <tr key={ficha.id}>
            <td className="mono" style={{ color: '#003366', fontWeight: 'bold' }}>
              #{ficha.id}
            </td>
            <td style={{ fontWeight: 'bold' }}>{ficha.nombre_pieza}</td>
            <td>
              <span className={`badge badge-${ficha.material.toLowerCase()}`}>
                {ficha.material}
              </span>
            </td>
            <td className="mono" style={{ textAlign: 'right' }}>{ficha.largo}</td>
            <td className="mono" style={{ textAlign: 'right' }}>{ficha.ancho}</td>
            <td className="mono" style={{ textAlign: 'right' }}>{ficha.grosor}</td>
            <td className="mono" style={{ textAlign: 'right' }}>{ficha.cantidad}</td>
            <td>{ficha.cliente}</td>
            <td>
              <div className="td-actions">
                <Button variant="primary" className="btn-sm" onClick={() => onView(ficha.id)}>Ver</Button>
                <Button variant="secondary" className="btn-sm" onClick={() => onEdit(ficha.id)}>Editar</Button>
                {ficha.archivo_pdf_url && onDownloadPDF && (
                  <Button variant="success" className="btn-sm" onClick={() => onDownloadPDF(ficha.id)}>PDF</Button>
                )}
                <Button variant="danger" className="btn-sm" onClick={() => onDelete(ficha.id)}>Borrar</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
