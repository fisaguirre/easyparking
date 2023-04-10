import React, { useState, useEffect, useRef, useCallback } from "react";
import "./PopUp.css";
import PagoQRPopUp from "./PagoQRPopUp";
const API_MERCADO_PAGO = process.env.REACT_APP_API_MERCADO_PAGO;
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;
const API_USER_CONTROL = process.env.REACT_APP_API_USER;

export default function PagoGenerarQR({
  patente,
  cantidad_tarjetas,
  minutos,
  precio_total,
  userId,
}) {
  const [codigoQR, setCodigoQR] = useState([]);
  const [codigoQRExists, setCodigoQRExists] = useState(false);
  const [modal, setModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [qrFinalizado, setQRFinalizado] = useState(false);
  const [storeAndPosUserExists, setStoreAndPosUserExists] = useState();
  let usuario_id = sessionStorage.getItem("usuario_id");
  const token = sessionStorage.getItem("token");

  const verifyStoreAndPosUserExists = async () => {
    const getMercado = await fetch(
      `${API_PAYMENT}/pago/mercado/sucpos/${usuario_id}`,
      {
        mmethod: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );
    const mercado = await getMercado.json();

    if (mercado == "existe") {
      setStoreAndPosUserExists(true);
    } else {
      setStoreAndPosUserExists(false);
    }
  };

  const createOrder = async () => {
    if (storeAndPosUserExists) {
      const getMercado = await fetch(
        `${API_PAYMENT}/pago/mercado/${usuario_id}`,
        {
          mmethod: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );
      const mercado = await getMercado.json();

      const res = await fetch(
        `${API_MERCADO_PAGO}/instore/orders/qr/seller/collectors/${mercado[2]["registro"]["mercado_usuario_id"]}/pos/${mercado[2]["registro"]["external_pos_id"]}/qrs?access_token=${mercado[2]["registro"]["access_token"]}`,
        {
          method: "POST",
          body: JSON.stringify({
            external_reference: "Pago Estacionamiento",
            title: "Pago Estacionamiento",
            description: "Estacionamiento Medido Ciudad de Mendoza",
            total_amount: precio_total,
            items: [
              {
                title: "Tarjeta Estacionamiento",
                category: "estacionamiento",
                description: "Tiempo total",
                unit_price: 40,
                quantity: cantidad_tarjetas,
                unit_measure: "unit",
                total_amount: precio_total,
              },
            ],
          }),
        }
      );
      const data = await res.json();
      setCodigoQR(data["qr_data"]);
      if (data["qr_data"].length === 0) {
        setCodigoQRExists(false);
      } else {
        setCodigoQRExists(true);
        setOpenModal(true);
      }
    } else {
      const userResponse = window.confirm(
        "Necesita asociar su cuenta de mercado pago para utilizar esta funcion"
      );
    }
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const buttonStyle = {
    padding: "20px 15px",
    backgroundColor: "blueviolet",
    color: "white",
    fontWeight: "bold",
    fontSize: "30px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    position: "absolute",
    bottom: 0,
    marginBottom: "15vh",
    left: "50%",
    transform: "translateX(-50%)",
  };

  useEffect(() => {
    verifyStoreAndPosUserExists();
  }, []);

  return (
    <div>
      <button
        id="signup-button"
        className="btn btn-info"
        onClick={(e) => createOrder()}
        style={buttonStyle}
      >
        Generar QR
      </button>
      <PagoQRPopUp
        open={openModal}
        codigo_qr={codigoQR}
        //onFinalizar={() => finalizarQREliminarTarjetas({ patente }, { userId })}
        onFinalizar={() => {
          setOpenModal(false);
        }}
        onClose={() => setOpenModal(false)}
        patente={patente}
        cantidad_tarjetas={cantidad_tarjetas}
        minutos={minutos}
        precio_total={precio_total}
        userId={userId}
      />
      {/*
            {storeAndPosUserExists ? (
                <>
                    <button id="signup-button" className="btn btn-info" onClick={(e) => createOrder()}>Generar QR</button>

                    <PagoQRPopUp
                        open={openModal}
                        codigo_qr={codigoQR}
                        //onFinalizar={() => finalizarQREliminarTarjetas({ patente }, { userId })}
                        onFinalizar={() => { setOpenModal(false); }}
                        onClose={() => setOpenModal(false)}
                        patente={patente}
                        cantidad_tarjetas={cantidad_tarjetas}
                        minutos={minutos}
                        precio_total={precio_total}
                        userId={userId}
                    />

                </>
            ) : null}
            */}
    </div>
  );
}
