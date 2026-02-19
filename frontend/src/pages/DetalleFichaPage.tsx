import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { DetalleFicha } from '../components/DetalleFicha';
import { fichasService } from '../services/fichasService';
import type { FichaDespiece } from '../types/ficha';

export const DetalleFichaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ficha, setFicha] = useState<FichaDespiece | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadFicha = useCallback(async (fichaId: number) => {
    try {
      setLoading(true);
      const data = await fichasService.get(fichaId);
      setFicha(data);
    } catch {
      navigate('/fichas');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (id) loadFicha(Number(id));
  }, [id, loadFicha]);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const handleBack = () => navigate('/fichas');
  const handleEdit = () => navigate(`/fichas/${id}/editar`);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar esta ficha?')) return;
    try {
      await fichasService.delete(Number(id));
      navigate('/fichas');
    } catch {
      setNotification({ type: 'error', message: 'Error al eliminar la ficha' });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const blob = await fichasService.downloadPDF(ficha!.archivo_pdf_url!);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ficha-${id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      setNotification({ type: 'success', message: 'PDF descargado exitosamente' });
    } catch {
      setNotification({ type: 'error', message: 'Error al descargar el PDF' });
    }
  };

  return (
    <div className="app-wrapper">
      <Header />
      <main className="page-content">
        {notification && (
          <div className={`alert alert-${notification.type}`} style={{ marginBottom: '16px' }}>
            {notification.message}
          </div>
        )}

        {loading ? (
          <p>Cargando ficha...</p>
        ) : ficha ? (
          <DetalleFicha
            ficha={ficha}
            onBack={handleBack}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownloadPDF={ficha.archivo_pdf_url ? handleDownloadPDF : undefined}
          />
        ) : (
          <div className="empty-state">
            <p>Ficha no encontrada</p>
          </div>
        )}
      </main>
    </div>
  );
};
