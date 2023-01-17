import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AmountFinishedCardsByUser } from "./service/TarjetaInstanciaService";

const API = process.env.REACT_APP_API_USER;

export default function TarjetaPendienteDePago() {
    const [tarjetaInstanciaId, setTarjetaInstanciaId] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [minutos, setMinutos] = useState("");
    const [patente, setPatente] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [tarjetaId, setTarjetaId] = useState("");

    const [editing, setEditing] = useState(false);
    const [cardsQuantity, setCardsQuantity] = useState("")

    const nameInput = useRef(null);

    const [finishedCardId, setFinishedCardId] = useState("");

    let [tarjetas, setTarjetas] = useState([]);

    const userProvisorio = 3
    const contar = "si"
    const noContar = "no"

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
        //setFinishedCardId()
        console.log("datos")
        console.log(data)
    };

    const deleteFinishedCardById = async (cardId) => {
        const res = await fetch(`${API}/tarjeta_instancia/finalizar/${cardId}`, {
            method: "DELETE",
        });
        const data = await res.json();
        await getTarjetasActivadas();

    };

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
                                        <Link id="signup-link" to="/tarjeta/disenio">
                                            <button type="button" id="signup-button" className="btn btn-info">Generar QR</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm btn-block"
                                            onClick={(e) => deleteFinishedCardById(tarjeta_instancia.tarjeta_instancia_id)}
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
                    <Link id="signup-link" to="/tarjeta/disenio">
                        <button type="button" id="signup-button" className="btn btn-info">Usar una nueva tarjeta</button>
                    </Link>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="row">
                <div className="col-md-12">
                    <Link id="signup-link" to="/tarjeta/disenio">
                        <button type="button" id="signup-button" className="btn btn-info">Ir a mis tarjetas activas</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}