import { useState } from "react";
import { useAuth } from "../auth/authContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";

export const Login = () => {
    const { isAuthenticated, login } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const session = await authService.login(email.trim(), password);
            login(session);
            navigate("/fichas", { replace: true });
        } catch (err: unknown) {
            console.error("Error en login:", err);
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err as { response?: { status?: number; data?: { message?: string } } };
                const status = axiosErr.response?.status;
                const msg = axiosErr.response?.data?.message;
                setError(`Error ${status}: ${msg ?? 'Sin mensaje'}`);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Datos incorrectos o API no disponible");
            }
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
                    <h2 className="ap-title">Iniciar Sesión</h2>
                    <p className="ap-subtitle">Accede a tu panel de gestión industrial</p>

                    {error && (
                        <div className="ap-error">{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="ap-field">
                            <label className="ap-label">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="usuario@gmail.com"
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
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <button type="submit" className="ap-btn" disabled={loading}>
                            {loading ? 'Accediendo...' : 'Iniciar Sesión →'}
                        </button>
                    </form>

                    <div className="ap-footer">
                        ¿No tienes cuenta? <Link to="/register" className="ap-link">Regístrate aquí</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
