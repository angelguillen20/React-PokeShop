export default function Pokeballs({pokeballs, addToCart}){
    console.log(pokeballs);
    const {id, nombre,imagen, descripcion, tasa_captura, precio} = pokeballs
    return (
        <div className="container mt-4">
            <div className="card " style={{ width: "18rem", alignItems: "center" }}>
                <a href="">
                    <img src={`/img/pokeballsWithoutBorder/${imagen}.png`}  alt="Pokeballs" />
                </a>
                <div className="card-body">
                    <hr  />
                    <p className="card-text text-center">
                        <strong >{nombre} </strong>⚡ {descripcion} <br />
                        <strong>Tasa de captura:</strong> {tasa_captura}x <br />
                        <strong>Precio:</strong> {precio} Pokédolares
                    </p>
                    <button type="button" className="btn btn-dark" onClick={() => addToCart(pokeballs)}>
                        Agregar al carrito</button>
                </div>
                <div style={{ marginRight: "18em" }}></div>
            </div>
        </div>
    )
}

