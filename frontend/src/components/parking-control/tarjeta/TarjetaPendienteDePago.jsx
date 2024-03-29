import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AmountFinishedCardsByUser } from "./service/TarjetaInstanciaService";
import PagoGenerarQR from "../../payment/PagoGenerarQR";
import * as IoIcons from "react-icons/io5";
import "./styles/Cards.css";

import { toast } from 'react-toastify';
import { propertyA } from "../../messages/Messages";
import 'react-toastify/dist/ReactToastify.css';
import "../../messages/MessageStyles.css";
import { useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import {
  AmountCardsByUser,
  AmountActivateCardsByUser,
} from "./service/TarjetaService";

import "react-circular-progressbar/dist/styles.css";
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;
const API = process.env.REACT_APP_API_USER;

const TarjetaPendienteDePago = () => {
  const [cardsQuantity, setCardsQuantity] = useState("");
  let [tarjetas, setTarjetas] = useState([]);
  const usuario_id_logueado = sessionStorage.getItem("usuario_id");
  let token = sessionStorage.getItem("token");
  let navigate = useNavigate();

  const getTarjetasActivadas = async () => {
    const res = await fetch(
      `${API}/tarjeta_instancia/finalizar/pendiente/${usuario_id_logueado}`,
      {
        mmethod: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );
    const data = await res.json();
    setTarjetas(data);
  };
  /*
    const deleteFinishedCardListById = async (patente, usuario_id) => {
      const userResponse = window.confirm(
        "¿Seguro que quiere limpiar las tarjetas?"
      );
      if (userResponse) {
        const res = await fetch(
          `${API}/tarjeta_instancia/finalizar/${patente}/${usuario_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          }
        );
        const data = await res.json();
        toast.success("Tarjetas eliminadas", propertyA);
  
        await getTarjetasActivadas();
      }
    };
  */
  const savePagosCard = async (fecha, patente, tarjetas_acumuladas, minutos_totales, usuario_id) => {
    const cantidad_tarjetas = tarjetas_acumuladas
    const tiempo_total = minutos_totales
    const precio_total = tarjetas_acumuladas * 60
    const res = await fetch(`${API_PAYMENT}/pago/pagos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        fecha,
        precio_total,
        tiempo_total,
        cantidad_tarjetas,
        patente,
        usuario_id,
      }),
    });
    const response = await res.json();
    if (response['code'] == 201) {
      return true
    } else {
      return false
    }

    //toast.success('Tarjeta creada! Quedan:' + " " + tarjetasDisponibles + " tarjetas en su cuenta", propertyA);
  };
  const deleteFinishedCardListById = async (patente, usuario_id) => {
    const res = await fetch(
      `${API}/tarjeta_instancia/finalizar/${patente}/${usuario_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );
    const data = await res.json();
    toast.success("Tarjetas almacenadas", propertyA);
    await getTarjetasActivadas();
  };
  const redirigirCrearNuevaTarjeta = () => {
    navigate("/tarjeta/activar");
  }
  useEffect(() => {
    getTarjetasActivadas();
  }, []);

  const [expanded, setExpanded] = useState(false);
  const [cardSelected, setCardSelected] = useState();

  const cerrarTarjetaExpandida = () => {
    setExpanded(false);
  };
  const lanzarQR = (card) => {
    deleteFinishedCardListById(card);
    setExpanded(false);
  };

  const limpiarTarjetas = (fecha, patente, tarjetas_acumuladas, minutos_totales, usuario_id) => {
    if (savePagosCard(fecha, patente, tarjetas_acumuladas, minutos_totales, usuario_id)) {
      deleteFinishedCardListById(patente, usuario_id);
    }
    setExpanded(false);
  };
  //setea la tarjeta seleccionada y expande la tarjeta
  const expandedCardAndSetCard = (expandedCard) => {
    setCardSelected(expandedCard);
    setExpanded(true);
  };
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
            <h1>A pagar</h1>
            <br></br>
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
                    devolverDatosTarjetaParaQR={(card) => lanzarQR(card)}
                    returnPatenteAndUserIdForEndCard={(fecha, patente, tarjetas_acumuladas, minutos_totales, usuario_id) =>
                      limpiarTarjetas(fecha, patente, tarjetas_acumuladas, minutos_totales, usuario_id)
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
    </div>
  );
};

function CompactCard(props) {
  function devolverTarjeta(card) {
    props.devolverTarjeta(card);
  }
  const styleCard = {
    backGround: "linear-gradient(180deg, #953B21 0%, #FF0000 100%)",
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
              /*
              style={{
                backGround: "linear-gradient(180deg, #BCC629 0%, #15E53E 100%)",
                boxShadow: "0px 10px 20px 0px #e0c6f5",
              }}
              */
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
                <span className="patenteBarPendiente">{tarjeta_instancia.patente}</span>
              </div>
              {/*
              <div className="tarjetasBar">
                <span>{tarjeta_instancia.tarjetas_acumuladas} tarjetas</span>
              </div>
              */}
              <div className="tiempoBar">
                <span>
                  {tarjeta_instancia.minutos_totales} minutos
                </span>
              </div>
              <div className="precioBar">
                <span>${tarjeta_instancia.tarjetas_acumuladas * 60}</span>
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
  function devolver(par) {
    props.devolverParametro(par);
  }
  function devolverDatosTarjetaParaQR(card) {
    props.devolverDatosTarjetaParaQR(card);
  }

  function returnPatenteAndUserIdForEndCard(fecha, patente, tarjetas_acumuladas, minutos_totales, usuario_id) {
    props.returnPatenteAndUserIdForEndCard(fecha, patente, tarjetas_acumuladas, minutos_totales, usuario_id);
  }
  const styleExtendedCard = {
    background: "linear-gradient(180deg, #BCC629 0%, #15E53E 100%)",
    boxShadow: "0px 10px 20px 0px #e0c6f5",
  };
  return (
    <motion.div
      className="ExpandedCard"
      //style={styleExtendedCard}
      /*
      style={{
        background: "linear-gradient(180deg, #BCC629 0%, #15E53E 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      }}
      */
      layoutId="expandableCard"
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
      {/*
      <div className="patentePendienteExpanded">

        <span>Patente: {props.card.patente}</span>
      </div>
      <div className="tiempoPendienteExpanded">

        <span>Tiempo: {props.card.tarjetas_acumuladas * 30} minutos</span>
      </div>
      <div className="precioPendienteExpanded">

        <span>Precio: ${props.card.tarjetas_acumuladas * 60}</span>
      </div>

      <div className="cantidadTarjetasPendienteExpanded">
        <span>Tarjetas: {props.card.tarjetas_acumuladas}</span>
      </div>
        */}
      <div>
        <span className="spanPendienteExpanded">Patente: {props.card.patente}</span>
        <span className="spanPendienteExpanded">Tarjetas: {props.card.tarjetas_acumuladas}</span>
        <span className="spanPendienteExpanded">Tiempo: {props.card.minutos_totales} minutos</span>
        <span className="spanPendienteExpanded">Precio: ${props.card.tarjetas_acumuladas * 60}</span>
      </div>


      <PagoGenerarQR
        patente={props.card.patente}
        cantidad_tarjetas={props.card.tarjetas_acumuladas}
        minutos={props.card.minutos_totales}
        precio_total={props.card.tarjetas_acumuladas * 60}
        userId={props.card.usuario_id}
      />

      {/*
      <button
        className="buttonGenerarQR"
        onClick={() => {
          devolverDatosTarjetaParaQR(props.card);
        }}
      >
        Generar QR
      </button>
      */}

      <button
        className="buttonLimpiarTarjetas"
        onClick={() => {
          returnPatenteAndUserIdForEndCard(
            props.card.fecha,
            props.card.patente,
            props.card.tarjetas_acumuladas,
            props.card.minutos_totales,
            props.card.usuario_id
          );
        }}
      >
        Almacenar tarjetas
      </button>
    </motion.div>
  );
}
export default TarjetaPendienteDePago;
