import { useToast } from "./ToastContext";

export default function Pokeballs({ pokeballs, addToCart }) {
    const { nombre, imagen, descripcion, tasa_captura, precio } = pokeballs;
    const { showToast } = useToast();

    const handleAddToCart = () => {
        addToCart(pokeballs);
        showToast(`✅ ¡${nombre} se agregó al carrito con éxito!`, "success");
    };

    return (
        <div className="container mt-4">
            <div className="card" style={{ width: "18rem", alignItems: "center" }}>
                <a href="#">
                    <img
                        src={`/img/pokeballsWithoutBorder/${imagen}.png`}
                        alt="Pokeball"
                        className="img-fluid"
                    />
                </a>
                <div className="card-body text-center">
                    <hr />
                    <p className="card-text">
                        <strong>{nombre}</strong> ⚡ {descripcion} <br />
                        <strong>Tasa de captura:</strong> {tasa_captura}x <br />
                        <strong>Precio:</strong> {precio} Pokédolares
                    </p>

                    <button
                        type="button"
                        className="btn btn-dark w-100 mt-2"
                        onClick={handleAddToCart}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}
