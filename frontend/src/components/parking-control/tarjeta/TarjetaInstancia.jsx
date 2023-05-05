import React, { useState, useEffect, useRef } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import "./styles/Cards.css";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { propertyA } from "../../messages/Messages";
import 'react-toastify/dist/ReactToastify.css';
import "../../messages/MessageStyles.css";
import {
  AmountCardsByUser,
  AmountActivateCardsByUser,
} from "./service/TarjetaService";
import * as IoIcons from "react-icons/io5";
//import * as FaPlus from 'react-icons/fa'; // Importa el ícono que deseas mostrar
const API = process.env.REACT_APP_API_USER;

const TarjetaInstancia = () => {
  const [tarjetaInstanciaId, setTarjetaInstanciaId] = useState("");
  let token = sessionStorage.getItem("token");
  const usuario_id = sessionStorage.getItem("usuario_id");
  let navigate = useNavigate();

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
    if (data['code'] === 201) {
      setTarjetas(data['cards']);
      //console.dir(data['patentes'][0])

      if (data['finalizadas']) {
        console.log("hola")
        toast.success("Tarjetas finalizadas:\n" + data['patentes'], propertyA);
      }
    }
    //verificarTarjetaTiempoLimite();
  };


  const verificarTarjetaTiempoLimite = () => {
    const horaInicial = new Date();
    horaInicial.setHours(12);
    horaInicial.setMinutes(30);

    const horaFinal = new Date();
    horaFinal.setHours(13);
    horaFinal.setMinutes(5);

    // Convertimos las horas a minutos y restamos para obtener la diferencia
    const minutosInicial = horaInicial.getHours() * 60 + horaInicial.getMinutes();
    const minutosFinal = horaFinal.getHours() * 60 + horaFinal.getMinutes();
    const diferenciaMinutos = minutosFinal - minutosInicial;

    if (diferenciaMinutos >= 30) {
      console.log("Han pasado 30 minutos o más");
      console.log("Esto es: " + diferenciaMinutos)
    } else {
      console.log("No han pasado 30 minutos");
      console.log(" esto no es: " + diferenciaMinutos)
    }
  }
  const devolverTiempoActual = () => {
    const fechaActual = new Date();
    const hora = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();
    const tiempo_fin = hora.toString() + ':' + minutos.toString() + ':' + segundos.toString()
    return tiempo_fin;
  };
  const finishActiveCard = async (tarjeta_instancia_id) => {
    const tiempo_fin = devolverTiempoActual();
    const res = await fetch(
      `${API}/tarjeta_instancia/activar/${tarjeta_instancia_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          tiempo_fin
        }),
      }
    );
    const data = res.json();
    toast.success("Tarjeta Finalizada - ver en sección pendientes", propertyA);
    await getTarjetasActivadas();
  };
  useEffect(() => {
    getTarjetasActivadas();
  }, []);

  const [expanded, setExpanded] = useState(false);
  const [cardSelected, setCardSelected] = useState();

  //Finaliza la tarjeta seleccionada
  const eliminarTarjeta = (cardInstanceId) => {
    finishActiveCard(cardInstanceId);
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
  const redirigirCrearNuevaTarjeta = () => {
    navigate("/tarjeta/activar");
  }
  return (
    <div>

      <div className="icon-container">
        <div className="icon">
          <FaPlus onClick={redirigirCrearNuevaTarjeta} />
        </div>
      </div>
      <div className="App">
        <div className="AppGlass">
          <div className="MainDash">
            <h1>Mis tarjetas activas</h1>

            <div className="Cards">
              <motion>
                {expanded ? (
                  <ExpandedCard
                    /*
                       Card-> se envia la tarjeta para mostrar sus atributos expandidos
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
                    /*
                       tarjeta-> se envia el array de todas las tarjetas activas
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
  const styleCard = {
    background: "linear-gradient(180deg, #BCC629 0%, #15E53E 100%)",
    boxShadow: "0px 10px 20px 0px #e0c6f5",
  };
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
              style={styleCard}
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
                <IoIcons.IoExpandSharp size={45} />
              </div>
              <div className="patenteBar">
                <span className="spancito">{tarjeta_instancia.patente}</span>
              </div>
              <div className="horaBar">
                <span>
                  {tarjeta_instancia.tiempo_inicio}-{tarjeta_instancia.tiempo_fin}
                </span>
                {/*
                  <span>
                    {tarjeta_instancia.hora}:{tarjeta_instancia.minutos} - {calcularHoraFinal(
                      tarjeta_instancia.hora,
                      tarjeta_instancia.minutos
                    )}
                  </span>
              */}
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

  function devolver(par) {
    props.devolverParametro(par);
  }
  function returnCardIdForEndCard(cardId) {
    props.devolverCardInstanceId(cardId);
  }
  const styleExpandedCard = {
    background: "linear-gradient(180deg, #BCC629 0%, #15E53E 100%)",
    boxShadow: "0px 10px 20px 0px #e0c6f5",
  };
  return (
    <motion.div
      className="ExpandedCard"
      style={styleExpandedCard}
    //layoutId="expandableCard"
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
        <UilTimes
          size={80}
          onClick={() => {
            devolver("fer");
          }}
        />
      </div>
      <div className="patenteActivaExpanded">
        <span>Patente: {props.card.patente}</span>
      </div>
      <div className="fechaActivaExpanded">
        <span>Fecha: {props.card.fecha}
        </span>
      </div>
      <div className="horaInicialActivaExpanded">
        <span> Hora inicial: {props.card.tiempo_inicio}
        </span>
      </div>
      <div className="horaFinalActivaExpanded">
        <span> Hora final: {props.card.tiempo_fin}
          {/*
        {calcularHoraFinal(
          props.card.hora,
          props.card.minutos)}
        */}
        </span>
      </div>
      <button
        className="buttonFinalizarTarjeta"
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
