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
    let token = sessionStorage.getItem("token")
    const usuario_id = sessionStorage.getItem("usuario_id")

    const [cardsQuantity, setCardsQuantity] = useState("")

    const nameInput = useRef(null);
    const [tiempoActivo, setTiempoActivo] = useState(true)
    const [activarTiempo, setActivarTiempo] = useState(true);
    let [tarjetas, setTarjetas] = useState([]);


    const getTarjetasActivadas = async () => {
        const res = await fetch(`${API}/tarjeta_instancia/activar/${usuario_id}`, {
            mmethod: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        const data = await res.json();
        setTarjetas(data);
        /*
/*
const a = new Date();
a.setHours(hora)
a.setMinutes(minutos)
a.setSeconds(50)
setInitial(+a)
console.log(a)
*/
    };

    const finishActiveCard = async (tarjeta_instancia_id) => {
        const userResponse = window.confirm("¿Seguro que quiere finalizar la tarjeta?");
        if (userResponse) {
            const res = await fetch(`${API}/tarjeta_instancia/activar/${tarjeta_instancia_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                }
            });
            const data = res.json()
        }
        await getTarjetasActivadas();

    };
    /*
        const changeValueTiempoActivo = (hora, minutos) => {
    
            const a = new Date();
            a.setHours(hora)
            a.setMinutes(minutos)
            a.setSeconds(50)
            setInitial(+a)
            console.log(a)
            //setInitial(+new Date())
        }
    */
    /*
 
     const [diff, setDiff] = useState(null)
     const [initial, setInitial] = useState(null)
 
     const tick = () => {
         setDiff(new Date(+new Date() - initial))
     };
 
     const start = () => { setInitial(+new Date()) }
 
     useEffect(() => {
         if (initial) {
             requestAnimationFrame(tick);
         }
         console.log("asd")
     }, [initial]);
 
     useEffect(() => {
         if (diff) {
             requestAnimationFrame(tick);
         }
         console.log("hola")
     }, [diff]);
 
     useEffect(() => {
         getTarjetasActivadas();
         changeValueTiempoActivo();
 
     }, []);
 */
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
                                <th>Patente</th>
                                <th>Hora</th>
                                <th>Minutos</th>
                                <th></th>
                                {/*<th>Tiempo transcurrido</th>*/}
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {tarjetas.map((tarjeta_instancia) => (
                                <tr key={tarjeta_instancia.tarjeta_instancia_id}>
                                    <td>{tarjeta_instancia.patente}</td>
                                    <td>{tarjeta_instancia.hora}</td>
                                    <td>{tarjeta_instancia.minutos}</td>
                                    <td>{ }
                                    </td>
                                    {/*
                                    <td>
                                        {tiempoActivo ? (
                                            <>
                                                <div className="App" onClick={start}>

                                                    <h4 className="timer">{timeFormat(diff)}</h4>
                                                </div>

                                            </>
                                        ) : "****"}
                                    </td>
                                        */}
                                    {/*
                                    <td>
                                        <button className="btn btn-primary btn-block"
                                            onClick={(e) => changeValueTiempoActivo(tiempoActivo, tarjeta_instancia.hora, tarjeta_instancia.minutos)}
                                        >Mostrar tiempo
                                        </button>
                                    </td>
                                        */}
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm btn-block"
                                            onClick={(e) => finishActiveCard(tarjeta_instancia.tarjeta_instancia_id)}
                                        >
                                            Finalizar tarjeta
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
                <div className="col-md-6">
                    <Link id="signup-link" to="/tarjeta/activarTarjeta">
                        <button type="button" id="signup-button" className="btn btn-info">Usar una nueva tarjeta</button>
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link id="signup-link" to="/tarjeta/tarjetaPendienteDePago">
                        <button type="button" id="signup-button" className="btn btn-info">Pendientes por pagar</button>
                    </Link>
                </div>
            </div>

        </div >
    )
}


const timeFormat = (date) => {
    if (!date) return "00:00:00";

    let mm = date.getUTCMinutes();
    let ss = date.getSeconds();
    let cm = Math.round(date.getMilliseconds() / 10);

    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;
    cm = cm < 10 ? "0" + cm : cm;

    return `${mm}:${ss}:${cm}`;
};