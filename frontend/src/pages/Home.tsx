import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="home-page">

      {/* Header */}
      <header className="home-header">
        <div className="home-header-inner">
          <div className="home-brand">
            <span className="home-brand-icon">⚙</span>
            <div>
              <span className="home-brand-name">SistemaDespiece</span>
              <span className="home-brand-sub">Industrial Management System</span>
            </div>
          </div>
          <nav className="home-nav">
            <Link to="/login" className="home-nav-link">Iniciar Sesión</Link>
            <Link to="/register" className="home-nav-cta">Registrarse</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-badge">SISTEMA INDUSTRIAL v1.0</div>
          <h1 className="home-hero-title">
            Gestión de Fichas de<br />
            <span className="home-hero-accent">Despiece Industrial</span>
          </h1>
          <p className="home-hero-subtitle">
            Plataforma técnica para la gestión de piezas en fábricas de metal y aluminio.
            Precisión, trazabilidad y control en cada proceso.
          </p>
          <div className="home-hero-actions">
            <Link to="/login" className="btn-hero-primary">
              Acceder al Sistema →
            </Link>
            <Link to="/register" className="btn-hero-secondary">
              Crear cuenta
            </Link>
          </div>
          <div className="home-hero-stats">
            <div className="home-stat">
              <span className="home-stat-num">100%</span>
              <span className="home-stat-lbl">Trazabilidad</span>
            </div>
            <div className="home-stat-sep"></div>
            <div className="home-stat">
              <span className="home-stat-num">PDF</span>
              <span className="home-stat-lbl">Adjuntos técnicos</span>
            </div>
            <div className="home-stat-sep"></div>
            <div className="home-stat">
              <span className="home-stat-num">API</span>
              <span className="home-stat-lbl">REST Versionada</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        <div className="home-features-inner">
          <div className="home-section-label">CARACTERÍSTICAS</div>
          <h2 className="home-section-title">Todo lo que necesitas para gestionar tu planta</h2>
          <div className="home-cards">
            <div className="home-card">
              <div className="home-card-icon home-card-icon--blue">⚙</div>
              <h3 className="home-card-title">Gestión Completa</h3>
              <p className="home-card-desc">
                CRUD completo con validaciones robustas, filtros avanzados y manejo de archivos PDF técnicos.
              </p>
            </div>
            <div className="home-card">
              <div className="home-card-icon home-card-icon--green">◎</div>
              <h3 className="home-card-title">Precisión Técnica</h3>
              <p className="home-card-desc">
                Registro detallado de dimensiones, materiales y especificaciones con tipografía monoespaciada.
              </p>
            </div>
            <div className="home-card">
              <div className="home-card-icon home-card-icon--gold">⚿</div>
              <h3 className="home-card-title">Seguridad Sanctum</h3>
              <p className="home-card-desc">
                Autenticación segura con tokens Bearer, sesiones persistentes y protección de rutas privadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="home-cta-inner">
          <h2 className="home-cta-title">¿Listo para empezar?</h2>
          <p className="home-cta-sub">Accede al sistema o crea una cuenta en segundos.</p>
          <div className="home-hero-actions">
            <Link to="/login" className="btn-hero-primary">Iniciar Sesión</Link>
            <Link to="/register" className="btn-hero-secondary">Crear cuenta gratis</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2026 Sistema de Fichas de Despiece · Fábrica de Metal y Aluminio</p>
        <p className="home-footer-sub">Industrial Blueprint &amp; Precision Design System</p>
      </footer>

    </div>
  );
};

