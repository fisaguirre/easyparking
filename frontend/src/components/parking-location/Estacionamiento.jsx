import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Map } from "./Map";
const API = process.env.REACT_APP_API_USER;
const API_LOCATION = process.env.REACT_APP_API_LOCATION

const Counter = ({ cantidadDisponibles, increment, decrement }) => {
    return (
        <div className="row">
            <div className="col-md-1">
                <button onClick={decrement}>-</button>
            </div>
            <div className="col-md-1">
                {cantidadDisponibles}
            </div>
            <div className="col-md-1">
                <button onClick={increment}>+</button>
            </div>
        </div>
    )
}


export default function Estacionamiento() {

    const [cantidadLugares, setCantidadLugares] = useState("")
    const [cantidadDisponibles, setCantidadDisponibles] = useState(0)
    let [lugares, setLugares] = useState([])

    const getLugares = async () => {
        const usuario_id = 1
        const res = await fetch(`${API_LOCATION}/estacionamiento/${usuario_id}`);
        const data = await res.json();
        //setLugares(data);
        setCantidadDisponibles(data['cantidad_disponible'])
        setCantidadLugares(data['cantidad_lugares'])

        console.log("esto:")
        console.log(data['cantidad_disponible'])
        console.log(data['cantidad_lugares'])

    };

    const obtenerLugares = async () => {
        const usuario_id = 1
        const tipo_update = "actualizar_lugares"

        const res = await fetch(`${API_LOCATION}/estacionamiento/${tipo_update}/${usuario_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cantidadLugares
            }),
        });
    };




    const actualizarCantidadLugares = async () => {
        const usuario_id = 1
        const tipo_update = "actualizar_lugares"

        const res = await fetch(`${API_LOCATION}/estacionamiento/${tipo_update}/${usuario_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cantidadLugares
            }),
        });
    };

    const increment = () => {
        setCantidadDisponibles(cantidadDisponibles + 1)
    }

    const decrement = () => {
        if (cantidadDisponibles === 0) {
            return;
        }
        setCantidadDisponibles(cantidadDisponibles - 1)
    }

    const actualizarLugaresDisponibles = async () => {
        const usuario_id = 1
        const tipo_update = "actualizar_disponibles"

        const res = await fetch(`${API_LOCATION}/estacionamiento/${tipo_update}/${usuario_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cantidadDisponibles
            }),
        });
    };

    const actualizarZonaTrabajo = async () => {
        const usuario_id = 1
        const tipo_update = "actualizar_zona"

        const res = await fetch(`${API_LOCATION}/estacionamiento/${tipo_update}/${usuario_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cantidadLugares
            }),
        });
    };
    useEffect(() => {
        getLugares();
    }, []);


    return (
        <div>
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
                        placeholder={cantidadLugares} />
                </div>
                <div className="col-md-4">
                    <button type="button" className="btn btn-primary btn-block"
                        onClick={(e) => actualizarCantidadLugares()}>Actualizar</button>
                </div>
                <p></p>

            </div>
            <div className="row">
                <div>
                    Configurar lugares disponibles
                    <div><Counter cantidadDisponibles={cantidadDisponibles} increment={increment} decrement={decrement} /></div>

                </div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md2">
                    <button type="button" id="signup-button" className="btn btn-info" onClick={(e) => actualizarLugaresDisponibles()}>Actualizar</button>
                </div>
            </div>
        </div>
    );
};
