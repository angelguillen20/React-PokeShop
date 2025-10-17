import React, { useState } from 'react';
import { FormularioLogin } from './FormularioLogin';
import { FormularioRegistro } from './FormularioRegistro';

export default function Header() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    // Función para login exitoso
    const handleLoginSuccess = (userData) => {
        console.log('Usuario autenticado:', userData);
        // Actualizar estado de login con el nombre de usuario, esa parte que está arriba y dice: 'Bienvenido, {userPapu}'
        setIsLoggedIn(true);
        setUserName(userData.username);
        setShowLogin(false); // Cerrar el modal después del login
    };

    // Función para logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
        localStorage.removeItem('rememberedUsername');
    };

    // Función para cambiar a registro
    const handleSwitchToRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    // Función para cambiar a login
    const handleSwitchToLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    // Función para cerrar el modal
    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    return (
        <header className="bg-dark text-white p-3">
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="index.html">
                        <img src="public/img/pokeballIcon.png" width={50} alt="PokeballLogo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="index.html">Menu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="Pokeballs.html">Pokeballs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Medicina</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Donar</a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav ms-auto">
                            <nav className="navbar navbar-light bg-dark fixed-left-end">
                                <form className="container-fluid justify-content-start">
                                    {isLoggedIn ? (
                                        <>
                                            <span className="btn btn-outline-secondary me-2" style={{border: 'none', color: '#ffffff'}}>
                                                Bienvenido, {userName}
                                            </span>
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={handleLogout}
                                            >
                                                Cerrar Sesión
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="btn btn-outline-secondary me-2" style={{border: 'none'}}
                                            type="button"
                                            onClick={() => setShowLogin(true)}
                                        >
                                            Iniciar Sesión
                                        </button>
                                    )}
                                </form>
                            </nav>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Llamada a los componentes del formulario Login */}
            <FormularioLogin
                show={showLogin}
                onClose={handleCloseLogin}
                onLoginSuccess={handleLoginSuccess}
                onSwitchToRegister={handleSwitchToRegister}
            />

            {/* Componente de registro */}
            <FormularioRegistro
                show={showRegister}
                onClose={() => setShowRegister(false)}
                onRegisterSuccess={handleLoginSuccess}
                onSwitchToLogin={handleSwitchToLogin}
            />
        </header>
    );
}