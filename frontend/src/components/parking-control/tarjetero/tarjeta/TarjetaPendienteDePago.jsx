import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AmountFinishedCardsByUser } from "./service/TarjetaInstanciaService";
import UserAbout from "../UserAbout";

const API = process.env.REACT_APP_API_USER;

export default function TarjetaPendienteDePago() {
    const [patente, setPatente] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    let [id, setId] = useState("");

    const [cardsQuantity, setCardsQuantity] = useState("")

    let [tarjetas, setTarjetas] = useState([]);

    const userProvisorio = 4

    /*
    const getTarjetasActivadas = async () => {
        const res = await fetch(`${API}/tarjeta_instancia/finalizar/${noContar}/${userProvisorio}`);
        const data = await res.json();
        setTarjetas(data);
        setFinishedCardId()
    };
    */
    const getTarjetasActivadas = async () => {
        const res = await fetch(`${API}/tarjeta_instancia/finalizar/pendiente/${userProvisorio}`);
        const data = await res.json();
        setTarjetas(data);

    };
    /*
    const deleteFinishedCardById = async (cardId) => {
        const res = await fetch(`${API}/tarjeta_instancia/finalizar/${cardId}`, {
            method: "DELETE",
        });
        const data = await res.json();
        await getTarjetasActivadas();

    };
    */

    const deleteFinishedCardListById = async (patente, usuario_id) => {
        const res = await fetch(`${API}/tarjeta_instancia/finalizar/${patente}/${usuario_id}`, {
            method: "DELETE"
        });
        const data = await res.json();
        await getTarjetasActivadas();

    };

    function getRealTime() {
        const currentTime = Date.now();
        console.log(new Date(Math.round(currentTime / 1000) * 1000), currentTime);
        return (Math.floor(currentTime / 1000) + 1) * 1000 - currentTime;
    }

    (async function () {
        let reduceTime = 0;
        while (true) {
            reduceTime = getRealTime();
            await sleep(reduceTime);
        }
    })()

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        getTarjetasActivadas();
    }, []);

    return (
        <div>
            <div id="form-text" className="row">
                <div>
                </div>
                <div className="col-md-6">
                    <h3>
                        <AmountFinishedCardsByUser />
                    </h3>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Patente</th>
                                <th>Tarjetas acumuladas</th>
                                <th>Tiempo total</th>
                                <th>Pago total</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tarjetas.map((tarjeta_instancia) => (
                                <tr key={tarjeta_instancia.patente}>
                                    <td>{tarjeta_instancia.patente}</td>

                                    <td>{tarjeta_instancia.tarjetas_acumuladas}</td>
                                    <td>{tarjeta_instancia.tarjetas_acumuladas * 30} minutos</td>
                                    <td>${tarjeta_instancia.tarjetas_acumuladas * 40} pesos</td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <input type="text"
                                            onChange={(e) => setCardsQuantity(e.target.value)}
                                            value={cardsQuantity}
                                            className="form-control"
                                            placeholder="Ingrese cantidad de tarjetas" />
                                    </td>
                                    <td>
                                        <Link id="signup-link" to="/tarjeta/activarTarjeta">
                                            <button type="button" id="signup-button" className="btn btn-info">Generar QR</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm btn-block"
                                            onClick={(e) => deleteFinishedCardListById(tarjeta_instancia.patente, tarjeta_instancia.usuario_id)}
                                        >
                                            Limpair tarjeta/s
                                        </button>
                                    </td>
                                </tr>

                            ))}


                        </tbody>
                    </table>
                </div>

            </div>
            <p></p>
            <div className="row">
                <div className="col-md-12">
                    <Link id="signup-link" to="/tarjeta/activarTarjeta">
                        <button type="button" id="signup-button" className="btn btn-info">Usar una nueva tarjeta</button>
                    </Link>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="row">
                <div className="col-md-12">
                    <Link id="signup-link" to="/tarjeta_instancia/">
                        <button type="button" id="signup-button" className="btn btn-info">Ir a mis tarjetas activas</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}