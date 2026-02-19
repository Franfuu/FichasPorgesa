import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/authContext';
import { PrivateRoute } from './routing/PrivateRoute';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { FichasPage } from './pages/FichasPage';
import { DetalleFichaPage } from './pages/DetalleFichaPage';
import { EditarFichaPage } from './pages/EditarFichaPage';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas Privadas */}
          <Route
            path="/fichas"
            element={
              <PrivateRoute>
                <FichasPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/fichas/:id"
            element={
              <PrivateRoute>
                <DetalleFichaPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/fichas/:id/editar"
            element={
              <PrivateRoute>
                <EditarFichaPage />
              </PrivateRoute>
            }
          />

          {/* Ruta 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
