import ControlledCarousel from "../components/ControllCarusel";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>

            <div className="container mt-3 ">
                <ControlledCarousel />
                <div className="row mb-4">
                    <br />
                    <h6>PRODUCTS</h6>
                    <hr/>
                        <div className="row">
                            <div className="col-md-6">
                                <h1>Bienvenido a la PokéShop</h1>
                                <p>Tu tienda en línea para todo lo relacionado con Pokémon. Encuentra Pokéballs, pociones y mucho más para ayudarte en tu aventura Pokémon.</p>
                                <a href="/pokeballs" className="btn btn-primary me-2">Ver Pokéballs</a>
                                <a href="/potions" className="btn btn-secondary">Ver Pociones</a>
                            </div>
                            <div className="col-md-6">
                                <img src="/img/pokemonHome.png" alt="Pokémon" className="img-fluid" />
                            </div>
                        </div>
                </div>
                <Footer />
                </div>
            </>
            );
}

