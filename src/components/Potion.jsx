import { useToast } from "./ToastContext"; // 👈 importa el hook global

export default function Potion({ potions, addToCart }) {
    const { id, imagen, nombre, descripcion, curacion, precio } = potions;
    const { showToast } = useToast(); // 👈 usa el hook

    const handleAddToCart = () => {
        addToCart(potions);
        showToast(`✅ ¡${nombre} se agregó al carrito con éxito!`, "success");
    };

    return (
        <div className="container mt-4">
            <div className="card" style={{ width: "18rem", alignItems: "center" }}>
                <a href="#">
                    <img
                        width={200}
                        src={`/img/medicina/${imagen}.png`}
                        alt="Medicina"
                    />
                </a>
                <div className="card-body">
                    <hr />
                    <p className="card-text text-center">
                        <strong>{nombre}</strong> ⚡ {descripcion} <br />
                        <strong>Tasa de curación:</strong> {curacion}x <br />
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
                <div style={{ marginRight: "18em" }}></div>
            </div>
        </div>
    );
}


