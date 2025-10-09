import React from 'react' 

export default function Header() {
return (
    <header>
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark ">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.html"><img src="public/img/pokeballIcon.png" width={50} alt="PokeballLogo" /></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="index.html">Menu</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Pokeballs.html">Pokeballs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Medicina</a>
                    </li>
                    <li class="nav-item">
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
