import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AmountFinishedCardsByUser } from "./service/TarjetaInstanciaService";
import PagoGenerarQR from "../../../payment/PagoGenerarQR";

const API = process.env.REACT_APP_API_USER;

export default function TarjetaPendienteDePago() {
    const [patente, setPatente] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [editing, setEditing] = useState(false);

    let [id, setId] = useState("");

    const [cardsQuantity, setCardsQuantity] = useState("")

    let [tarjetas, setTarjetas] = useState([]);

    const userProvisorio = 1

    const getTarjetasActivadas = async () => {
        const res = await fetch(`${API}/tarjeta_instancia/finalizar/pendiente/${userProvisorio}`);
        const data = await res.json();
        setTarjetas(data);

    };

    const deleteFinishedCardListById = async (patente, usuario_id) => {
        const userResponse = window.confirm("¿Seguro que quiere limpiar las tarjetas?");
        if (userResponse) {
            const res = await fetch(`${API}/tarjeta_instancia/finalizar/${patente}/${usuario_id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            setEditing(true);
            await getTarjetasActivadas();
        }
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
                                        <PagoGenerarQR
                                            patente={tarjeta_instancia.patente}
                                            cantidad_tarjetas={tarjeta_instancia.tarjetas_acumuladas}
                                            minutos={tarjeta_instancia.tarjetas_acumuladas * 30}
                                            precio_total={tarjeta_instancia.tarjetas_acumuladas * 40}
                                            userId={tarjeta_instancia.usuario_id}
                                        />
                                    </td>
                                    <td>

                                        <button
                                            className="btn btn-danger btn-sm btn-block"
                                            onClick={(e) => deleteFinishedCardListById(tarjeta_instancia.patente, tarjeta_instancia.usuario_id)}
                                        >
                                            Limpiar tarjeta/s
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
            <div>


            </div>
        </div >
    )
}
