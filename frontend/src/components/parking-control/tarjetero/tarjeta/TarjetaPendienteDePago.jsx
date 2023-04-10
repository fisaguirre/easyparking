import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AmountFinishedCardsByUser } from "./service/TarjetaInstanciaService";
import PagoGenerarQR from "../../../payment/PagoGenerarQR";
import * as IoIcons from "react-icons/io5";
import "./MainDash.css";

import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import {
  AmountCardsByUser,
  AmountActivateCardsByUser,
} from "./service/TarjetaService";

import "react-circular-progressbar/dist/styles.css";

const API = process.env.REACT_APP_API_USER;

const TarjetaPendienteDePago = () => {
  const [cardsQuantity, setCardsQuantity] = useState("");
  let [tarjetas, setTarjetas] = useState([]);
  const usuario_id_logueado = sessionStorage.getItem("usuario_id");
  let token = sessionStorage.getItem("token");

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
      await getTarjetasActivadas();
    }
  };

  useEffect(() => {
    getTarjetasActivadas();
  }, []);

  /*
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
*/

  const [expanded, setExpanded] = useState(false);
  const [cardSelected, setCardSelected] = useState();

  const cerrarTarjetaExpandida = () => {
    setExpanded(false);
  };
  const lanzarQR = (card) => {
    deleteFinishedCardListById(card);
    setExpanded(false);
  };

  const limpiarTarjetas = (patente, usuario_id) => {
    deleteFinishedCardListById(patente, usuario_id);
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
                  returnPatenteAndUserIdForEndCard={(patente, usuario_id) =>
                    limpiarTarjetas(patente, usuario_id)
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
                <span>{tarjeta_instancia.patente}</span>
              </div>
              <div className="tarjetasBar">
                <span>{tarjeta_instancia.tarjetas_acumuladas} tarjetas</span>
              </div>
              <div className="tiempoBar">
                <span>
                  {tarjeta_instancia.tarjetas_acumuladas * 30} minutos
                </span>
              </div>
              <div className="precioBar">
                <span>${tarjeta_instancia.tarjetas_acumuladas * 40}</span>
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

  function returnPatenteAndUserIdForEndCard(patente, usuario_id) {
    props.returnPatenteAndUserIdForEndCard(patente, usuario_id);
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
      <div className="patentePendienteExpanded">
        Patente:
        <span>{props.card.patente}</span>
      </div>
      <div className="tiempoPendienteExpanded">
        Tiempo:
        <span>{props.card.tarjetas_acumuladas * 30}</span>
      </div>
      <div className="precioPendienteExpanded">
        Precio:
        <span>{props.card.tarjetas_acumuladas * 40}</span>
      </div>
      <div className="cantidadTarjetasPendienteExpanded">
        Tarjetas:
        <span>{props.card.tarjetas_acumuladas}</span>
      </div>
      <PagoGenerarQR
        patente={props.card.patente}
        cantidad_tarjetas={props.card.tarjetas_acumuladas}
        minutos={props.card.tarjetas_acumuladas * 30}
        precio_total={props.card.tarjetas_acumuladas * 40}
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
            props.card.patente,
            props.card.usuario_id
          );
        }}
      >
        Limpiar tarjetas
      </button>
    </motion.div>
  );
}
export default TarjetaPendienteDePago;
