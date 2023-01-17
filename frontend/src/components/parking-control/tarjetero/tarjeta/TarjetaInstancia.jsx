import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AmountCardsByUser, AmountActivateCardsByUser } from "./service/TarjetaService";
import { TarjetaPendienteDePago } from "./TarjetaPendienteDePago"

const API = process.env.REACT_APP_API_USER;

export default function TarjetaInstancia() {
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

    let [tarjetas, setTarjetas] = useState([]);

    const userProvisorio = 3
    const getTarjetasActivadas = async () => {
        const res = await fetch(`${API}/tarjeta_instancia/activar/${userProvisorio}`);
        const data = await res.json();
        setTarjetas(data);
        console.log(data)
    };
    /*
        const showCard = async (tarjetaId) => {
    
            const res = await fetch(`${API}/tarjetas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tarjetaId,
                    cardsQuantity
                }),
            });
    
            setEditing(true);
            setTarjetaInstanciaId(tarjetaInstanciaId);
    
        };
    */

    const finishActiveCard = async (tarjeta_instancia_id) => {
        const userResponse = window.confirm("¿Seguro que quiere finalizar la tarjeta?");
        if (userResponse) {
            const res = await fetch(`${API}/tarjeta_instancia/activar/${tarjeta_instancia_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = res.json()
            setEditing(true);
        }

    };

    useEffect(() => {
        getTarjetasActivadas();
    }, []);

    return (
        <div>
            <div className="row">
                <h1>This is Tarjetero mode</h1>
                <div>
                    <h3>
                        <AmountCardsByUser />
                    </h3>
                </div>
                <div className="col-md-6"><h3>Mis Tarjetas Activas</h3></div>
                <div className="col-md-4">
                    <Link id="signup-link" to="/tarjeta/tarjetaPendienteDePago">
                        <button type="button" id="signup-button" className="btn btn-info">Pendientes por pagar</button>
                    </Link>
                </div>
            </div>
            <div id="form-text" className="row">
                <div>
                </div>
                <div className="col-md-6">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Minutos</th>
                                <th>Patente</th>
                                <th>Tiempo transcurrido</th>
                                <th></th>
                                <th>
                                    <Link id="signup-link" to="/tarjeta/tarjetaPendienteDePago">
                                        <button type="button" id="signup-button" className="btn btn-info">Pendientes por pagar</button>
                                    </Link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tarjetas.map((tarjeta_instancia) => (
                                <tr key={tarjeta_instancia.tarjeta_instancia_id}>
                                    <td>{tarjeta_instancia.tarjeta_instancia_id}</td>
                                    <td>{tarjeta_instancia.fecha}</td>
                                    <td>{tarjeta_instancia.hora}</td>
                                    <td>{tarjeta_instancia.minutos}</td>
                                    <td>{tarjeta_instancia.patente}</td>
                                    <td>
                                        <input type="text"
                                            onChange={(e) => setCardsQuantity(e.target.value)}
                                            value={cardsQuantity}
                                            className="form-control"
                                            placeholder="Ingrese cantidad de tarjetas" />
                                    </td>
                                    <td>
                                        <button className="btn btn-primary btn-block"
                                        //onClick={(e) => showCard(tarjeta_instancia.tarjeta_instancia_id)}
                                        >Mostrar tiempo
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm btn-block"
                                            onClick={(e) => finishActiveCard(tarjeta_instancia.tarjeta_instancia_id)}
                                        >
                                            Finalizar tarjeta
                                        </button>
                                    </td>

                                    <td>
                                        <Link id="signup-link" to="/tarjeta/activarTarjeta">
                                            <button type="button" id="signup-button" className="btn btn-info">Desplegar tarjeta</button>
                                        </Link>
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
        </div >
    )
}