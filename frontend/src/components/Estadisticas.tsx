import React from 'react';

interface EstadisticasProps {
  totalFichas: number;
  fichasAluminio: number;
  fichasAcero: number;
  totalClientes?: number;
}

export const Estadisticas: React.FC<EstadisticasProps> = ({
  totalFichas,
  fichasAluminio,
  fichasAcero,
  totalClientes = 0,
}) => {
  const stats = [
    { label: 'Total Fichas',  value: totalFichas },
    { label: 'Aluminio',      value: fichasAluminio },
    { label: 'Acero',         value: fichasAcero },
    { label: 'Clientes',      value: totalClientes },
  ];

  return (
    <div className="stats-grid">
      {stats.map((s) => (
        <div key={s.label} className="stat-card">
          <div className="stat-value mono">{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
};
