import React from 'react';
import { Button } from './Button';

interface FiltrosProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  materialFilter: string;
  onMaterialFilterChange: (value: string) => void;
  onReset: () => void;
}

export const Filtros: React.FC<FiltrosProps> = ({
  searchTerm,
  onSearchChange,
  materialFilter,
  onMaterialFilterChange,
  onReset,
}) => {
  return (
    <div className="filters-bar">
      <input
        type="text"
        className="form-input"
        placeholder="Buscar por nombre de pieza o cliente..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="form-select"
        value={materialFilter}
        onChange={(e) => onMaterialFilterChange(e.target.value)}
        style={{ width: 180 }}
      >
        <option value="">Todos los materiales</option>
        <option value="Aluminio">Aluminio</option>
        <option value="Acero">Acero</option>
      </select>
      {(searchTerm || materialFilter) && (
        <Button variant="secondary" onClick={onReset}>Limpiar</Button>
      )}
    </div>
  );
};
