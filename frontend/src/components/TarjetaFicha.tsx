import React from 'react';
import { FileText, Download, Edit2, Trash2 } from 'lucide-react';
import type { FichaDespiece } from '../types/ficha';
import { Button } from './Button';

interface TarjetaFichaProps {
  ficha: FichaDespiece;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDownloadPDF?: (id: number, url: string) => void;
}

export const TarjetaFicha: React.FC<TarjetaFichaProps> = ({
  ficha,
  onView,
  onEdit,
  onDelete,
  onDownloadPDF,
}) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-200 shadow-lg hover:shadow-cyan-500/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {ficha.nombre_pieza}
            </h3>
            <p className="text-sm text-slate-400 font-mono">ID: #{ficha.id}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            ficha.material === 'Aluminio'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
          }`}
        >
          {ficha.material}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-400 mb-1">Cliente</p>
          <p className="text-sm text-white font-medium">{ficha.cliente}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Cantidad</p>
          <p className="text-sm text-white font-mono font-semibold">
            {ficha.cantidad} uds
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700 pt-4 mb-4">
        <p className="text-xs text-slate-400 mb-2">Dimensiones (mm)</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-900 rounded p-2 text-center">
            <p className="text-xs text-slate-400">Largo</p>
            <p className="text-sm text-cyan-400 font-mono font-semibold">
              {ficha.largo}
            </p>
          </div>
          <div className="bg-slate-900 rounded p-2 text-center">
            <p className="text-xs text-slate-400">Ancho</p>
            <p className="text-sm text-cyan-400 font-mono font-semibold">
              {ficha.ancho}
            </p>
          </div>
          <div className="bg-slate-900 rounded p-2 text-center">
            <p className="text-xs text-slate-400">Grosor</p>
            <p className="text-sm text-cyan-400 font-mono font-semibold">
              {ficha.grosor}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          onClick={() => onView(ficha.id)}
          className="flex-1 !py-2"
        >
          Ver Detalles
        </Button>
        <Button
          variant="secondary"
          onClick={() => onEdit(ficha.id)}
          className="!px-3 !py-2"
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        {ficha.archivo_pdf_url && onDownloadPDF && (
          <Button
            variant="success"
            onClick={() => onDownloadPDF(ficha.id, ficha.archivo_pdf_url!)}
            className="!px-3 !py-2"
          >
            <Download className="w-4 h-4" />
          </Button>
        )}
        <Button
          variant="danger"
          onClick={() => onDelete(ficha.id)}
          className="!px-3 !py-2"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
