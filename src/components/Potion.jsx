import Footer from "./Footer";

export default function Potion({potions, addToCart}){
    console.log(potions);
    const {id, imagen,nombre, descripcion, curacion, precio, } = potions
    return (
        <div className="container mt-4">
            <div className="card " style={{ width: "18rem", alignItems: "center" }}>
                <a href="">
                    <img width={200} src={`/img/medicina/${imagen}.png`} alt="Medicina" />
                </a>
                <div className="card-body">
                    <hr  />
                    <p className="card-text text-center">
                        <strong >{nombre} </strong>⚡ {descripcion} <br />
                        <strong>Tasa de curacion:</strong> {curacion}x <br />
                        <strong>Precio:</strong> {precio} Pokédolares
                    </p>
                    <button type="button" className="btn btn-dark" onClick={() => addToCart(potions)}>
                        Agregar al carrito
                    </button>
                </div>
                <div style={{ marginRight: "18em" }}></div>
            </div>
        </div>

    )
}


