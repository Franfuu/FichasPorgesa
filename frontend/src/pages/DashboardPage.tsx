import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Estadisticas } from '../components/Estadisticas';
import { ListaFichas } from '../components/ListaFichas';
import { fichasService } from '../services/fichasService';
import type { FichaDespiece } from '../types/ficha';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalFichas: 0,
    aluminio: 0,
    acero: 0,
    clientes: 0,
  });
  const [recentFichas, setRecentFichas] = useState<FichaDespiece[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const loadDashboardData = async () => {
    try {
      const response = await fichasService.getAll(1, 6);
      const fichas = response.data;
      const clientesUnicos = new Set(fichas.map((f) => f.cliente)).size;
      setRecentFichas(fichas);
      setStats({
        totalFichas: response.total,
        aluminio: fichas.filter((f) => f.material === 'Aluminio').length,
        acero: fichas.filter((f) => f.material === 'Acero').length,
        clientes: clientesUnicos,
      });
    } catch (error: unknown) {
      setNotification({ type: 'error', message: 'Error al cargar datos del dashboard' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id: number) => navigate(`/fichas/${id}`);
  const handleEdit = (id: number) => navigate(`/fichas/${id}/editar`);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta ficha?')) return;
    try {
      await fichasService.delete(id);
      setNotification({ type: 'success', message: 'Ficha eliminada exitosamente' });
      loadDashboardData();
    } catch {
      setNotification({ type: 'error', message: 'Error al eliminar la ficha' });
    }
  };

  const handleDownloadPDF = async (id: number, pdfUrl: string) => {
    try {
      const blob = await fichasService.downloadPDF(pdfUrl);
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

        <div className="panel" style={{ marginBottom: '16px' }}>
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Dashboard — Sistema de Despiece</span>
            <Link to="/fichas">
              <Button variant="primary">+ Nueva Ficha</Button>
            </Link>
          </div>
          <div className="panel-body">
            {loading ? (
              <p>Cargando estadísticas...</p>
            ) : (
              <Estadisticas
                totalFichas={stats.totalFichas}
                fichasAluminio={stats.aluminio}
                fichasAcero={stats.acero}
                totalClientes={stats.clientes}
              />
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Fichas Recientes</span>
            <Link to="/fichas">
              <Button variant="secondary">Ver Todas</Button>
            </Link>
          </div>
          <div className="panel-body">
            <ListaFichas
              fichas={recentFichas}
              loading={loading}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownloadPDF={handleDownloadPDF}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
