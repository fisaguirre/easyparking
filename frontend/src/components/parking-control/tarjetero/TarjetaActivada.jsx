import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const API = process.env.REACT_APP_API_USER;

export default function TarjetaActivada() {
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

    const userProvisorio = 1
    const getTarjetasActivadas = async () => {
        const res = await fetch(`${API}/tarjetas/${userProvisorio}`);
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
    useEffect(() => {
        getTarjetasActivadas();
    }, []);

    return (
        <div>
            <h1>Aca van todas las tarjetas que se encuentran activas, agendadas con datos del vehiculo, fecha, etc</h1>

            <div id="form-text" className="row">
                <h1>This is Tarjetero mode</h1>
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
                                        <Link id="signup-link" to="/tarjeta/disenio">
                                            <button type="button" id="signup-button" className="btn btn-info">Desplegar tarjeta</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}