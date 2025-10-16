import React from 'react';

export default function Potion({potions}){
    console.log(potions);
    const {id, nombre, imagen, descripcion, curacion, precio} = potions
    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="card " style={{ width: "18rem", alignItems: "center" }}>
                <a href="">
                    <img width={100} src={`/img/medicina/${imagen}.png`} alt="" />
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


