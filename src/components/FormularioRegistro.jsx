import '../css/FormularioLogin.css';
import { useRegisterForm } from '../hooks/useFormRegistro';


// Parecido al FormularioLogin.jsx pero adaptado al registro, ver anotaciones de formulario login para entender mejor
export function FormularioRegistro({ show, onClose, onRegisterSuccess}) {
    const {
        formState: {
            username,
            email,
            password,
            confirmPassword,
            showPassword,
            showConfirmPassword,
            errors,
            isLoading,
            touched
        },
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleConfirmPasswordChange,    
        handleShowPasswordToggle,
        handleShowConfirmPasswordToggle,
        handleBlur,
        handleSubmit,
        handleClose,
        isFormValid
    } = useRegisterForm({ show, onClose, onRegisterSuccess });

    // Si show es false, NO renderizar nada
    if (!show) return null;

    return (
        <section className="login-modal-wrapper">
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
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M19 8v6" />
                                <path d="M22 11h-6" />
                            </svg>
                        </div>
                        <h2 className="modal-title-custom">Registro</h2>
                        <p className="modal-subtitle">Únete a nuestra comunidad</p>
                        <button
                            type="button"
                            className="close-button"
                            onClick={handleClose}
                            aria-label="Cerrar"
                            disabled={isLoading}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
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
                                <label htmlFor="register-username" className="form-label-custom">
                                    Usuario
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        className={`form-control-custom ${errors.username && touched.username ? 'is-invalid' : ''} ${!errors.username && touched.username && username ? 'is-valid' : ''}`}
                                        id="register-username"
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
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth="2" />
                                        </svg>
                                        {errors.username}
                                    </div>
                                )}
                            </div>

                            <div className="form-group-custom">
                                <label htmlFor="register-email" className="form-label-custom">
                                    Correo Electrónico
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </span>
                                    <input
                                        type="email"
                                        className={`form-control-custom ${errors.email && touched.email ? 'is-invalid' : ''} ${!errors.email && touched.email && email ? 'is-valid' : ''}`}
                                        id="register-email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        onBlur={() => handleBlur('email')}
                                        placeholder="Ingresa tu correo electrónico"
                                        disabled={isLoading}
                                        autoComplete="email"
                                    />
                                </div>
                                {errors.email && touched.email && (
                                    <div className="error-message">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth="2" />
                                        </svg>
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="form-group-custom">
                                <label htmlFor="register-password" className="form-label-custom">
                                    Contraseña
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={`form-control-custom ${errors.password && touched.password ? 'is-invalid' : ''} ${!errors.password && touched.password && password ? 'is-valid' : ''}`}
                                        id="register-password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onBlur={() => handleBlur('password')}
                                        placeholder="Ingresa tu contraseña"
                                        disabled={isLoading}
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={handleShowPasswordToggle}
                                        disabled={isLoading}
                                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
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
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth="2" />
                                        </svg>
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="form-group-custom">
                                <label htmlFor="register-confirm-password" className="form-label-custom">
                                    Confirmar Contraseña
                                </label>
                                <div className="input-wrapper">
                                    <span className="input-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={`form-control-custom ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''} ${!errors.confirmPassword && touched.confirmPassword && confirmPassword ? 'is-valid' : ''}`}
                                        id="register-confirm-password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        onBlur={() => handleBlur('confirmPassword')}
                                        placeholder="Confirma tu contraseña"
                                        disabled={isLoading}
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={handleShowConfirmPasswordToggle}
                                        disabled={isLoading}
                                        aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    >
                                        {showConfirmPassword ? (
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
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="error-message">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth="2" />
                                        </svg>
                                        {errors.confirmPassword}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={isLoading || !isFormValid}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Registrándose...
                                    </>
                                ) : (
                                    <>
                                        Registrarse
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M19 8v6" />
                                            <path d="M22 11h-6" />
                                        </svg>
                                    </>
                                )}
                                {handleClose}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}