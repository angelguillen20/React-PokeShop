import { useLoginForm } from '../hooks/useFormLogin';
import '../styles/FormularioLogin.css';

export function FormularioLogin({ show, onClose, onLoginSuccess, onSwitchToRegister }) {
    const {
        formState: {
            username,
            password,
            showPassword,
            rememberMe,
            errors,
            isLoading,
            touched
        },
        handleUsernameChange,
        handlePasswordChange,
        handleRememberMeChange,
        handleShowPasswordToggle,
        handleBlur,
        handleSubmit,
        handleClose,
        isFormValid
    } = useLoginForm({ show, onClose, onLoginSuccess });

    // Si show es false, NO renderizar nada
    // Siendo súper honesto para el desarrollo de los icon ocupé full IA, porque no sabía como hacerlos y quería que el inicio de sesión se viera bien
    if (!show) return null;

    return (
        <section className='login-modal-wrapper'>
            <div 
                className={`modal-overlay ${show ? 'show' : ''}`}
                onClick={handleClose}
            >
                <div 
                    className={`modal-container ${show ? 'show' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header-custom">
                        <div className="modal-icon">
                            {/* 
                                Icono de usuario sobre inicio de sesión 
                                El primer segmento <svg> permite establecer las propiedades del icon, tamaño, color, etc 
                            */}
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {/* 
                                    Segmentos path y circle
                                    path crea la figura del cuerpo del usuario
                                    circle crea la figura de la cabeza del usuario
                                    Insisto, estos iconos los generé con IA, pero se ven bien
                                */}
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <h2 className="modal-title-custom">Iniciar Sesión</h2>
                        <p className="modal-subtitle">Bienvenido de nuevo</p>
                        <button 
                            type="button" 
                            className="close-button"
                            onClick={handleClose}
                            aria-label="Cerrar"
                        >
                        </button>
                    </div>

                    <div className="modal-body-custom">
                        <form onSubmit={handleSubmit} noValidate>
                            {errors.submit && (
                                <div className="alert alert-danger" role="alert">
                                    {errors.submit}
                                </div>
                            )}

                            <div className="form-group-custom">
                                <label htmlFor="username" className="form-label-custom">
                                    Usuario
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon">
                                        {/* Icono de usuario */}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </span>
                                    <input 
                                        type="text" 
                                        className={`form-control-custom ${errors.username && touched.username ? 'is-invalid' : ''} ${!errors.username && touched.username && username ? 'is-valid' : ''}`}
                                        id="username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        onBlur={() => handleBlur('username')}
                                        placeholder="Ingresa tu usuario"
                                        disabled={isLoading}
                                        autoComplete="username"
                                    />
                                </div>
                                {errors.username && touched.username && (
                                    <div className="error-message">
                                        {errors.username}
                                    </div>
                                )}
                            </div>

                            <div className="form-group-custom">
                                <label htmlFor="password" className="form-label-custom">
                                    Contraseña
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon">
                                        {/* Icono de password */}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </span>
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        className={`form-control-custom ${errors.password && touched.password ? 'is-invalid' : ''} ${!errors.password && touched.password && password ? 'is-valid' : ''}`}
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onBlur={() => handleBlur('password')}
                                        placeholder="Ingresa tu contraseña"
                                        disabled={isLoading}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={handleShowPasswordToggle}
                                        disabled={isLoading}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {/* Iconos de mostrar o no contraseña */}
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && touched.password && (
                                    <div className="error-message">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                        disabled={isLoading}
                                    />
                                    <span className="checkbox-custom"></span>
                                    Recordarme
                                </label>
                                <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <button 
                                type="submit" 
                                className="btn-submit"
                                disabled={isLoading || !isFormValid}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    <>
                                        Iniciar Sesión
                                        {/* Icono de usuario(+) */}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="divider">
                            <span>o</span>
                        </div>

                        <div className="signup-link">
                            ¿No tienes una cuenta? <a href="#" onClick={(e) => {e.preventDefault(); onSwitchToRegister && onSwitchToRegister();}}>Regístrate</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}