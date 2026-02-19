import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/authContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <Link to="/dashboard" className="brand">
        <span className="brand-icon">⚙</span>
        <div>
          <span className="brand-title">SistemaDespiece</span>
          <span className="brand-sub">Industrial Management System</span>
        </div>
      </Link>

      <nav className="header-nav">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/fichas" className="nav-link">Fichas de Despiece</Link>
      </nav>

      <div className="header-user">
        <div className="user-info">
          <strong>{user?.name ?? 'Usuario'}</strong>
          <span>{user?.email}</span>
        </div>
        <button className="header-logout-btn" onClick={logout}>
          Salir
        </button>
      </div>
    </header>
  );
};

