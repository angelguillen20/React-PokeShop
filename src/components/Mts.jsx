export default function Pokeballs({mts, addToCart}){
    console.log(mts);
    const {id, nombre,tipo,imagen, descripcion, potencia, precio} = mts
    return (
        <div className="container mt-4">
            <div className="card " style={{ width: "18rem", alignItems: "center" }}>
                <a href="">
                    <img src={`/img/Mts/${imagen}.png`}  alt="MTS" />
                </a>
                <div className="card-body">
                    <hr  />
                    <p className="card-text text-center">
                        <strong >{nombre} </strong>⚡ {descripcion} <br />
                        <strong>Tipo:</strong>{tipo} <br />
                        <strong>Potencia:</strong> {potencia} <br />
                        <strong>Precio:</strong> {precio} Pokédolares
                    </p>
                    <button  type="button" className="btn btn-dark w-100 mt-2 " onClick={() => addToCart(mts)}>
                        Agregar al carrito</button>
                </div>
                <div style={{ marginRight: "18em" }}></div>
            </div>
        </div>
    )
}