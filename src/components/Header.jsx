import { Link } from "react-router-dom";
export default function Header() {
    return (
        <header>
            <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark ">
                <div class="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="/img/pokeballIcon.png" width={50} alt="PokeballLogo" />
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pokeballs">
                                    Pokeballs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/potions">
                                    Medecina
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a class="nav-link disabled" aria-disabled="true">Donar</a>
                            </li>

                        </ul>
                        <ul class="nav navbar-nav ms-auto">
                            <nav class="navbar navbar-light bg-dark fixed-left-end">
                                <form class="container-fluid justify-content-start">
                                    <button class="btn btn-outline-secondary me-2" type="button">Iniciar Session</button>
                                    <a href="createAccount.html"><button class="btn btn-outline-secondary" type="button">Registrase</button></a>
                                </form>
                            </nav>

                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    )
}

