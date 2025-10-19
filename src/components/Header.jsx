import { Link } from "react-router-dom";

export default function Header({ cart, isEmpty, removeFromCart, decreaseQuantity, increaseQuantity, cartTotal, clearCart}) {
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
                        </ul>

                        <ul className="navbar-nav ms-auto align-items-center">
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
                                            {cart.length}
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
                                                                item.nombre.toLowerCase().includes("ball")
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
                                                <button className="btn btn-primary w-100 mt-2" onClick={(e) => {e.stopPropagation(); clearCart()}}>Vaciar carrito</button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </li>

                            {/* Botones de login/registro */}

                            {/* Botones de login/registro */}
                            <li className="nav-item ms-3">
                                <button className="btn btn-outline-secondary me-2" type="button">Iniciar Sesión</button>
                                <Link to="/createAccount">
                                    <button className="btn btn-outline-secondary" type="button">Registrarse</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
