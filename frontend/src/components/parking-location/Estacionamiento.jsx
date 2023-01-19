import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Map } from "./Map";
const API = process.env.REACT_APP_API_USER;

export default function Estacionamiento() {

    const [cantidadLugares, setCantidadLugares] = useState("")


    const actualizarCantidadLugares = async () => {
        const usuario_id = 1
        const tipo_update = "actualizar_lugares"

        const res = await fetch(`${API}/estacionamiento/${tipo_update}/${usuario_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cantidadLugares
            }),
        });
    };

    const actualizarLugaresDisponibles = async () => {
        const usuario_id = 1
        const tipo_update = "actualizar_disponibles"

        const res = await fetch(`${API}/estacionamiento/${tipo_update}/${usuario_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cantidadLugares
            }),
        });
    };

    const actualizarZonaTrabajo = async () => {
        const usuario_id = 1
        const tipo_update = "actualizar_zona"

        const res = await fetch(`${API}/estacionamiento/${tipo_update}/${usuario_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cantidadLugares
            }),
        });
    };



    return (

        <div id="form-text" className="row">

            <div>
                {/*<Map />*/}
            </div>
            <p></p>
            <div className="col-md-4">
                Configurar cantidad lugares estacionamiento
                <input type="text"
                    onChange={(e) => setCantidadLugares(e.target.value)}
                    value={cantidadLugares}
                    className="form-control"
                    placeholder="Lugares para estacionar" />
            </div>
            <div className="col-md-4">
                <button type="button" className="btn btn-primary btn-block"
                    onClick={(e) => actualizarCantidadLugares()}>Actualizar</button>
            </div>
            <p></p>
            <div>
                Configurar lugares disponibles
                <p></p>
                <Link id="signup-link" to="/auth/signup">
                    <button type="button" id="signup-button" className="btn btn-info">Actualizar</button>
                </Link>
            </div>

        </div>

    );
};
