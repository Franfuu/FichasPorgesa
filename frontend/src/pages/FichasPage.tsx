import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { ListaFichas } from '../components/ListaFichas';
import { FormularioFicha } from '../components/FormularioFicha';
import { Filtros } from '../components/Filtros';
import { fichasService } from '../services/fichasService';
import type { FichaDespiece, FichaDespiececreateDTO, ApiErrorResponse } from '../types/ficha';
import { useNavigate } from 'react-router-dom';

export const FichasPage: React.FC = () => {
  const navigate = useNavigate();
  const [fichas, setFichas] = useState<FichaDespiece[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [materialFilter, setMaterialFilter] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    loadFichas();
  }, []);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const loadFichas = async () => {
    try {
      setLoading(true);
      const response = await fichasService.getAll(1, 100);
      setFichas(response.data);
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al cargar las fichas' });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: FichaDespiececreateDTO) => {
    try {
      await fichasService.create(data);
      setNotification({ type: 'success', message: 'Ficha creada exitosamente' });
      setModalOpen(false);
      loadFichas();
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      const message = apiError.response?.data?.message || 'Error al crear la ficha';
      setNotification({ type: 'error', message });
    }
  };

  const handleView = (id: number) => navigate(`/fichas/${id}`);
  const handleEdit = (id: number) => navigate(`/fichas/${id}/editar`);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta ficha?')) return;
    try {
      await fichasService.delete(id);
      setNotification({ type: 'success', message: 'Ficha eliminada exitosamente' });
      loadFichas();
    } catch {
      setNotification({ type: 'error', message: 'Error al eliminar la ficha' });
    }
  };

  const handleDownloadPDF = async (id: number) => {
    try {
      const blob = await fichasService.downloadPDF(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ficha-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      setNotification({ type: 'success', message: 'PDF descargado exitosamente' });
    } catch {
      setNotification({ type: 'error', message: 'Error al descargar el PDF' });
    }
  };

  const fichasFiltradas = fichas.filter((ficha) => {
    const matchesSearch =
      ficha.nombre_pieza.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ficha.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMaterial = !materialFilter || ficha.material === materialFilter;
    return matchesSearch && matchesMaterial;
  });

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
          <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Fichas de Despiece</span>
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              + Nueva Ficha
            </Button>
          </div>
          <div className="panel-body">
            <Filtros
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              materialFilter={materialFilter}
              onMaterialFilterChange={setMaterialFilter}
              onReset={() => { setSearchTerm(''); setMaterialFilter(''); }}
            />
            <ListaFichas
              fichas={fichasFiltradas}
              loading={loading}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDownloadPDF={handleDownloadPDF}
            />
          </div>
        </div>
      </main>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nueva Ficha de Despiece"
        size="lg"
      >
        <FormularioFicha
          onSubmit={handleCreate}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
