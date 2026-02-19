import { useState } from "react";
import { useAuth } from "../auth/authContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";

export const Register = () => {
    const { isAuthenticated } = useAuth();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/fichas" replace />
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (password !== passwordConfirmation) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        try {
            await authService.register(email.trim(), password, name.trim());
            navigate("/login", { replace: true });
        } catch {
            setError("Error al registrarse o el usuario ya existe");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="ap-page">
            <div className="ap-card">
                <div className="ap-card-brand">
                    <span className="ap-brand-icon">⚙</span>
                    <div>
                        <span className="ap-brand-name">SistemaDespiece</span>
                        <span className="ap-brand-sub">Industrial Management System</span>
                    </div>
                </div>

                <div className="ap-card-body">
                    <h2 className="ap-title">Crear Cuenta</h2>
                    <p className="ap-subtitle">Regístrate para acceder al sistema</p>

                    {error && (
                        <div className="ap-error">{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="ap-field">
                            <label className="ap-label">Nombre completo</label>
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="ap-input"
                                disabled={loading}
                                autoComplete="name"
                                required
                            />
                        </div>
                        <div className="ap-field">
                            <label className="ap-label">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="usuario@fabrica.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="ap-input"
                                disabled={loading}
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div className="ap-field">
                            <label className="ap-label">Contraseña</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="ap-input"
                                disabled={loading}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        <div className="ap-field">
                            <label className="ap-label">Confirmar contraseña</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                className="ap-input"
                                disabled={loading}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        <button type="submit" className="ap-btn" disabled={loading}>
                            {loading ? 'Registrando...' : 'Crear Cuenta →'}
                        </button>
                    </form>

                    <div className="ap-footer">
                        ¿Ya tienes cuenta? <Link to="/login" className="ap-link">Inicia sesión aquí</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
