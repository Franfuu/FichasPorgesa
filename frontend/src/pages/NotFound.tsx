import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <div className="notfound-icon">⚠</div>
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Página No Encontrada</h1>
        <p className="notfound-desc">
          La ruta solicitada no existe en el sistema. Verifica la URL o regresa
          al panel principal.
        </p>
        <div className="notfound-actions">
          <Link to="/dashboard" className="notfound-btn-primary">
            ⌂ Ir al Dashboard
          </Link>
          <Link to="/fichas" className="notfound-btn-secondary">
            Ver Fichas
          </Link>
        </div>
        <div className="notfound-meta">
          ERROR_CODE: 404_NOT_FOUND &nbsp;|&nbsp; {new Date().toISOString()}
        </div>
      </div>
    </div>
  );
};
