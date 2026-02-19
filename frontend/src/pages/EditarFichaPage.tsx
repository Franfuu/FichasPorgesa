import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { FormularioFicha } from '../components/FormularioFicha';
import { Spinner } from '../components/Spinner';
import { fichasService } from '../services/fichasService';
import type { FichaDespiece, FichaDespiececreateDTO } from '../types/ficha';

export const EditarFichaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ficha, setFicha] = useState<FichaDespiece | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    if (notification?.type === 'success') {
      const t = setTimeout(() => navigate(`/fichas/${id}`), 1500);
      return () => clearTimeout(t);
    }
    if (notification?.type === 'error') {
      const t = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [notification, id, navigate]);

  const handleSubmit = async (data: FichaDespiececreateDTO) => {
    try {
      setSaving(true);
      await fichasService.update(Number(id), data);
      setNotification({ type: 'success', message: 'Ficha actualizada correctamente.' });
    } catch {
      setNotification({ type: 'error', message: 'Error al actualizar la ficha.' });
    } finally {
      setSaving(false);
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

        <div className="panel">
          <div className="panel-header">
            <span>Editar Ficha de Despiece #{id}</span>
          </div>
          <div className="panel-body">
            {loading ? (
              <Spinner message="Cargando ficha..." size="lg" />
            ) : ficha ? (
              <FormularioFicha
                ficha={ficha}
                onSubmit={handleSubmit}
                onCancel={() => navigate(`/fichas/${id}`)}
                loading={saving}
              />
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};
