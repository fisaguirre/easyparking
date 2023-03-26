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
    const [mostrarMapa, setMostrarMapa] = useState()
    const [cantidadLugares, setCantidadLugares] = useState("")
    const [cantidadDisponibles, setCantidadDisponibles] = useState(0)
    let [lugares, setLugares] = useState([])
    const usuario_id = sessionStorage.getItem("usuario_id")
    const token = sessionStorage.getItem("token")

    const getPlaces = async () => {
        const res = await fetch(`${API_LOCATION}/estacionamiento/${usuario_id}`, {
            mmethod: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        const data = await res.json();
        setCantidadDisponibles(data['cantidad_disponible'])
        setCantidadLugares(data['cantidad_lugares'])
    };


    const actualizarCantidadLugares = async () => {
        const tipo_update = "actualizar_lugares"

        const res = await fetch(`${API_LOCATION}/estacionamiento/${tipo_update}/${usuario_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                cantidadLugares
            }),
        });
        const resp = await res.json();
        if (resp && resp[1]['code'] == 201) {
            window.confirm(resp[0]['message']);
        } else {
            window.confirm('No se pudo actualizar los lugares');
        }
        console.log(resp)
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
        const tipo_update = "actualizar_disponibles"

        const res = await fetch(`${API_LOCATION}/estacionamiento/${tipo_update}/${usuario_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                cantidadDisponibles
            }),
        });
        const resp = await res.json();
        if (resp && resp[1]['code'] == 201) {
            window.confirm(resp[0]['message']);
        } else {
            window.confirm('No se pudo actualizar los lugares');
        }
        console.log(resp)
    };

    const actualizarZonaTrabajo = async () => {
        const tipo_update = "actualizar_zona"

        const res = await fetch(`${API_LOCATION}/estacionamiento/${tipo_update}/${usuario_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                cantidadLugares
            }),
        });
    };
    useEffect(() => {
        getPlaces();
    }, []);

    const showMaps = async (valor) => {
        setMostrarMapa(valor)

    };


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
            <p></p>
            <p></p>
            <div className="row">
                <h2>Asignar zona de trabajo</h2>
                <div className="col-md-2">
                    <button type="button" onClick={(e) => showMaps(true)}>Mostrar mapa</button>
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={(e) => showMaps(false)}>Ocultar mapa</button>
                </div>
                {mostrarMapa ? (
                    <><div>
                        {/*El paramaetro "false" es para indicar si es el usuario tarjetero el que esta guardando su zona de trabajo o es la secciòn del mapa que muestra todas las zonas del trabajo en el home (caso que sea true)*/}
                        <Map updateWorkZone={true} />
                    </div></>
                ) : null}
            </div>
        </div>

    );
};
