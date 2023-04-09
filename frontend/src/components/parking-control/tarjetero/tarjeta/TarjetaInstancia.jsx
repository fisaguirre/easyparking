import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./MainDash.css";
import Cards from "./Cards/Cards";
import {
  AmountCardsByUser,
  AmountActivateCardsByUser,
} from "./service/TarjetaService";
import { TarjetaPendienteDePago } from "./TarjetaPendienteDePago";

const API = process.env.REACT_APP_API_USER;

export default function TarjetaInstancia() {
  const [tarjetaInstanciaId, setTarjetaInstanciaId] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [minutos, setMinutos] = useState("");
  const [patente, setPatente] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [tarjetaId, setTarjetaId] = useState("");
  let token = sessionStorage.getItem("token");
  const usuario_id = sessionStorage.getItem("usuario_id");

  const [cardsQuantity, setCardsQuantity] = useState("");

  const nameInput = useRef(null);
  const [tiempoActivo, setTiempoActivo] = useState(true);
  const [activarTiempo, setActivarTiempo] = useState(true);
  let [tarjetas, setTarjetas] = useState([]);

  const getTarjetasActivadas = async () => {
    const res = await fetch(`${API}/tarjeta_instancia/activar/${usuario_id}`, {
      mmethod: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    const data = await res.json();
    setTarjetas(data);
  };
  /*
  const finishActiveCard = async (tarjeta_instancia_id) => {
    const userResponse = window.confirm(
      "¿Seguro que quiere finalizar la tarjeta?"
    );
    if (userResponse) {
      const res = await fetch(
        `${API}/tarjeta_instancia/activar/${tarjeta_instancia_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      const data = res.json();
    }
    await getTarjetasActivadas();
  };
  */

  useEffect(() => {
    getTarjetasActivadas();
  }, []);
  return (
    <div className="App">
      <div className="AppGlass">
        <div className="MainDash">
          {tarjetas.map((tarjeta_instancia) => (
            <div key={tarjeta_instancia.tarjeta_instancia_id}>
              <Cards
                mes={tarjeta_instancia.mes}
                dia_semana={tarjeta_instancia.dia_semana}
                dia_fecha={tarjeta_instancia.dia_fecha}
                hora={tarjeta_instancia.hora}
                minutos={tarjeta_instancia.minutos}
                patente={tarjeta_instancia.patente}
                tarjeta_id={tarjeta_instancia.tarjeta_id}
                tarjeta_instancia_id={tarjeta_instancia.tarjeta_instancia_id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    /*
      <div className="row">
        <h3>Mis Tarjetas Activas</h3>
      </div>

      <div className="row">
        <Link id="signup-link" to="/tarjeta/activarTarjeta">
          <button type="button" id="signup-button" className="btn btn-info">
            Usar una nueva tarjeta
          </button>
        </Link>
      </div>
      <p></p>
      <div className="row">
        <Link id="signup-link" to="/tarjeta/tarjetaPendienteDePago">
          <button type="button" id="signup-button" className="btn btn-info">
            Pendientes por pagar
          </button>
        </Link>
      </div>
                  */
  );
}
