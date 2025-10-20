import { Link } from "react-router-dom";
import { FormularioLogin } from './FormularioLogin';
import { FormularioRegistro } from './FormularioRegistro';
import React, { useState } from 'react';


export default function Header({ cart, isEmpty, removeFromCart, decreaseQuantity, increaseQuantity, cartTotal, clearCart }) {
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
        <header>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="/img/pokeballIcon.png" width={50} alt="PokeballLogo" />
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pokeballs">Pokeballs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/potions">Medicina</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/mts">Mts</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto align-items-start">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link position-relative"
                                    id="cartDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img width={45} src="/img/carrito-de-compras.png" alt="" />
                                    {cart.length > 0 && (
                                        <span className="position-absolute top-30 start-100 translate-middle badge rounded-pill bg-danger">
                                            {cart.reduce((total, item) => total + item.quantity, 0)}
                                        </span>
                                    )}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end p-2" aria-labelledby="cartDropdown" style={{ minWidth: "300px" }}>
                                    {isEmpty ? (
                                        <li className="dropdown-item text-center">Tu carrito está vacío</li>
                                    ) : (
                                        <>
                                            {cart.map(item => (
                                                <li key={item.id} className="dropdown-item d-flex justify-content-between align-items-center">
                                                    <div>
                                                        {item.nombre} x {item.quantity}
                                                    </div>
                                                    <div>
                                                        <img
                                                            src={
                                                                item.imagen.startsWith('MT_')
                                                                    ? `/img/Mts/${item.imagen}.png`
                                                                    : item.imagen.startsWith('0')
                                                                        ? `/img/pokeballsWithoutBorder/${item.imagen}.png`
                                                                        : `/img/medicina/${item.imagen}.png`

                                                            }
                                                            alt={item.nombre}
                                                            width={50}
                                                        />
                                                        ${item.quantity * item.precio}

                                                    </div>
                                                    <div className="d-flex gap-2">
                                                        <button className="btn btn-sm btn-outline-secondary" onClick={(e) => { e.stopPropagation(); decreaseQuantity(item.id) }}>-</button>
                                                        <button className="btn btn-sm btn-outline-secondary" onClick={(e) => { e.stopPropagation(); increaseQuantity(item.id) }}>+</button>
                                                        <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); removeFromCart(item.id) }}>x</button>
                                                    </div>
                                                </li>
                                            ))}
                                            <li><hr className="dropdown-divider" /></li>
                                            <li className="dropdown-item text-center">
                                                Total: ${cartTotal}
                                            </li>
                                            <li>
                                                <button className="btn btn-primary w-100 mt-2">Pagar</button>
                                                <button className="btn btn-primary w-100 mt-2" onClick={(e) => { e.stopPropagation(); clearCart() }}>Vaciar carrito</button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </li>
                            <form className="container-fluid justify-content-start top-0 mt-2">
                                {isLoggedIn ? (
                                    <>
                                        <span className="btn btn-outline-secondary me-2" style={{ border: 'none', color: '#ffffff' }}>
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
                                        className="btn btn-outline-secondary me-2" style={{ border: 'none' }}
                                        type="button"
                                        onClick={() => setShowLogin(true)}
                                    >
                                        Iniciar Sesión
                                    </button>
                                )}
                            </form>

                            {/* Botones de login/registro */}

                            {/* Botones de login/registro */}
                            <li className="nav-item">
                            </li>
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
