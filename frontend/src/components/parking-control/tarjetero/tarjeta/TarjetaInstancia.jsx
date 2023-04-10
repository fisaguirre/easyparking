import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./MainDash.css";
import Cards from "./Cards/Cards";
import Card from "./Card/Card";
import { cardsData } from "./Data/Data";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  AmountCardsByUser,
  AmountActivateCardsByUser,
} from "./service/TarjetaService";
import { TarjetaPendienteDePago } from "./TarjetaPendienteDePago";
import * as IoIcons from "react-icons/io5";

const API = process.env.REACT_APP_API_USER;

const TarjetaInstancia = () => {
  const [tarjetaInstanciaId, setTarjetaInstanciaId] = useState("");
  let token = sessionStorage.getItem("token");
  const usuario_id = sessionStorage.getItem("usuario_id");

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

  const [expanded, setExpanded] = useState(false);
  const [cardSelected, setCardSelected] = useState();

  //Finaliza la tarjeta seleccionada
  const eliminarTarjeta = (cardInstanceId) => {
    //aca voy a meter para finalizar tarjeta
    //generar ccodigo qr o limpiar tarjetas dependiendo lo que envie por probando
    setExpanded(false);
  };

  const cerrarTarjetaExpandida = () => {
    setExpanded(false);
  };
  //setea la tarjeta seleccionada y expande la tarjeta
  const expandedCardAndSetCard = (expandedCard) => {
    setCardSelected(expandedCard);
    setExpanded(true);
  };
  return (
    <div className="App">
      <div className="AppGlass">
        <div className="MainDash">
          <div className="Cards">
            <motion>
              {expanded ? (
                <ExpandedCard
                  /*Card-> se envia la tarjeta para mostrar sus atributos expandidos
                devolverParametro-> para cerrar tarjeta expandida
                devolverCardInstanceId-> devuelve el id de la card para finalizarla
                */
                  card={cardSelected}
                  devolverParametro={(parametro) =>
                    cerrarTarjetaExpandida(parametro)
                  }
                  devolverCardInstanceId={(cardInstanceId) =>
                    eliminarTarjeta(cardInstanceId)
                  }
                />
              ) : (
                <CompactCard
                  /*tarjeta-> se envia el array de todas las tarjetas activas
                devolverTarjeta-> se devuelve la tarjeta seleccionada para setearla y enviarla a la expandida
                */

                  tarjeta={tarjetas}
                  devolverTarjeta={(expandedCard) =>
                    expandedCardAndSetCard(expandedCard)
                  }
                />
              )}
            </motion>
          </div>
        </div>
      </div>
    </div>
  );
};

function CompactCard(props) {
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

  function devolverTarjeta(card) {
    props.devolverTarjeta(card);
  }
  return (
    <div>
      {props.tarjeta.map((tarjeta_instancia) => {
        return (
          <div
            className="parentContainer"
            key={tarjeta_instancia.tarjeta_instancia_id}
          >
            <motion.div
              className="CompactCard"
              style={{
                background: "linear-gradient(180deg, #BCC629 0%, #15E53E 100%)",
                boxShadow: "0px 10px 20px 0px #e0c6f5",
              }}
              //layoutId="expandableCard"
              onClick={() => {
                devolverTarjeta(tarjeta_instancia);
              }}
            >
              <div
                style={{
                  alignSelf: "flex-end",
                  cursor: "pointer",
                  color: "white",
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
              >
                <IoIcons.IoExpandSharp size={50} />
              </div>
              <div className="patenteBar">
                <span>{tarjeta_instancia.patente}</span>
              </div>
              <div className="horaBar">
                {tarjeta_instancia.minutos === 0 ? (
                  <span>
                    {tarjeta_instancia.hora}:{tarjeta_instancia.minutos}0 -
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
  );
}

// Expanded Card
function ExpandedCard(props) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
    },
  };
  function devolver(par) {
    props.devolverParametro(par);
  }
  function returnCardIdForEndCard(cardId) {
    props.devolverCardInstanceId(cardId);
  }

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: "linear-gradient(180deg, #BCC629 0%, #15E53E 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      }}
      layoutId="expandableCard"
    >
      {/*
          <div
        style={{
          alignSelf: "flex-end",
          cursor: "pointer",
          color: "white",
        }}
      >
        <UilTimes
          size={60}
          onClick={() => {
            devolver("fer");
          }}
        />
      </div>
        */}
      <div
        style={{
          alignSelf: "flex-end",
          cursor: "pointer",
          color: "white",
          position: "absolute",
          top: "0",
          right: "0",
        }}
      >
        <UilTimes
          size={80}
          onClick={() => {
            devolver("fer");
          }}
        />
      </div>
      <span></span>
      <div className="chartContainer">
        <Chart options={data.options} type="area" />
      </div>
      <span>{props.card.dia_fecha}</span>
      <button
        onClick={() => {
          returnCardIdForEndCard(props.card.tarjeta_instancia_id);
        }}
      >
        Finalizar tarjeta
      </button>
    </motion.div>
  );
}

export default TarjetaInstancia;
