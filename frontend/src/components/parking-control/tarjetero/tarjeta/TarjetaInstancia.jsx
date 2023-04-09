import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./MainDash.css";
import Cards from "./Cards/Cards";
import Card from "./Card/Card";
import { cardsData } from "./Data/Data";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import Chart from "react-apexcharts";
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
  const [tiempo, setTiempo] = useState("12:00"); // establecer la hora inicial como estado
  const [horaInicial, setHoraInicial] = useState();
  const [horaFinal, setHoraFinal] = useState();

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

  const calcularHoraFinal = (horaInicial, minutosInicial) => {
    let hora = horaInicial.toString() + ":" + minutosInicial.toString();
    const [horaActual, minutosActual] = hora.split(":"); // dividir la hora y los minutos actuales en un array
    const fechaHoraActual = new Date(); // crear un nuevo objeto Date con la hora y fecha actuales
    fechaHoraActual.setHours(horaActual); // establecer la hora actual
    fechaHoraActual.setMinutes(minutosActual); // establecer los minutos actuales
    fechaHoraActual.setMinutes(fechaHoraActual.getMinutes() + 30); // sumar 30 minutos al objeto de fecha
    const nuevaHora = `${fechaHoraActual
      .getHours()
      .toString()
      .padStart(2, "0")}:${fechaHoraActual
      .getMinutes()
      .toString()
      .padStart(2, "0")}`; // convertir la nueva hora y minutos en una cadena con formato de hora
    const horaFinal = nuevaHora;
    return horaFinal;
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

  /*
  return (
    <div className="App">
      <div className="AppGlass">
        <div className="MainDash">
          {tarjetas.map((tarjeta_instancia, id) => (
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
   
  );
  */
  /*
  return (
    <div className="App">
      <div className="AppGlass">
        <div className="MainDash">
          <div className="Cards">
            {tarjetas.map((tarjeta_instancia, id) => {
              return (
                <div className="parentContainer" key={id}>
                  <Card
                    mes={tarjeta_instancia.mes}
                    dia_semana={tarjeta_instancia.dia_semana}
                    dia_fecha={tarjeta_instancia.dia_fecha}
                    hora={tarjeta_instancia.hora}
                    minutos={tarjeta_instancia.minutos}
                    patente={tarjeta_instancia.patente}
                    tarjeta_id={tarjeta_instancia.tarjeta_id}
                    tarjeta_instancia_id={
                      tarjeta_instancia.tarjeta_instancia_id
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
*/

  return (
    <div className="App">
      <div className="AppGlass">
        <div className="MainDash">
          <div className="Cards">
            {tarjetas.map((tarjeta_instancia) => {
              return (
                <div
                  className="parentContainer"
                  key={tarjeta_instancia.tarjeta_instancia_id}
                >
                  <motion.div
                    className="CompactCard"
                    style={{
                      background:
                        "linear-gradient(180deg, #BCC629 0%, #15E53E 100%)",
                      boxShadow: "0px 10px 20px 0px #e0c6f5",
                    }}
                    //layoutId="expandableCard"
                  >
                    <div className="patenteBar">
                      <span>{tarjeta_instancia.patente}</span>
                    </div>
                    <div className="horaBar">
                      {tarjeta_instancia.minutos === 0 ? (
                        <span>
                          {tarjeta_instancia.hora}:{tarjeta_instancia.minutos}0
                          -
                          {calcularHoraFinal(
                            tarjeta_instancia.hora,
                            tarjeta_instancia.minutos
                          )}
                        </span>
                      ) : (
                        <span>
                          {tarjeta_instancia.hora}:{tarjeta_instancia.minutos} -
                          {calcularHoraFinal(
                            tarjeta_instancia.hora,
                            tarjeta_instancia.minutos
                          )}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
