
export default function Potion({potions}){
    console.log(potions);
    const {id, nombre, imagen, descripcion, curacion, precio} = potions
    return (
        <div className="container mt-4">
            <div className="card " style={{ width: "18rem", alignItems: "center" }}>
                <a href="">
                    <img width={200} src={`/img/medicina/${imagen}.png`} alt="" />
                </a>
                <div className="card-body">
                    <hr  />
                    <p className="card-text text-center">
                        <strong >{nombre} </strong>⚡ {descripcion} <br />
                        <strong>Tasa de curacion:</strong> {curacion}x <br />
                        <strong>Precio:</strong> {precio} Pokédolares
                    </p>
                </div>
                <div style={{ marginRight: "18em" }}></div>
            </div>
        </div>
    )
}


