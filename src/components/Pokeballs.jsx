export default function Pokeballs({pokeballs}){
    console.log(pokeballs);
    const {id, nombre, imagen, descripcion, tasa_captura, precio} = pokeballs
    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="card " style={{ width: "18rem", alignItems: "center" }}>
                <a href="">
                    <img src={`/img/pokeballsWithoutBorder/${imagen}.png`} alt="" />
                </a>
                <div className="card-body">
                    <hr  />
                    <p className="card-text text-center">
                        <strong >{nombre} </strong>⚡ {descripcion} <br />
                        <strong>Tasa de captura:</strong> {tasa_captura}x <br />
                        <strong>Precio:</strong> {precio} Pokédolares
                    </p>
                </div>
                <div style={{ marginRight: "18em" }}></div>
            </div>
        </div>
    )
}

