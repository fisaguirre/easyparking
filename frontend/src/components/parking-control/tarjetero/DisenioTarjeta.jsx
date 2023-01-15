import React from "react";

export default function DisenioTarjeta() {
    return (
        <div>
            <h1>This is Diseño de la tarjeta con los botones y sus funciones</h1>
            <div>
                <p></p>
                <h3>Aca va la imagen de la tarjeta con botones y sus funciones</h3>
                <p></p>
                <button type="button" id="signup-button" className="btn btn-info">Usar tarjeta</button>
            </div>
            <div>
                <p></p>
                <button type="button" id="signup-button" className="btn btn-info">Volver</button>
            </div>
            <div>
                <p></p>
                <button type="button" id="signup-button" className="btn btn-info">Mostar tiempo transcurrido tarjeta</button>
            </div>
            <div>
                <p></p>
                <button type="button" id="signup-button" className="btn btn-info">Finalizar tarjeta</button>
            </div>
            <div>
                <p></p>
                <button type="button" id="signup-button" className="btn btn-info">Usar otra tarjeta para el mismo vehiculo</button>
            </div>
        </div>
    )
}