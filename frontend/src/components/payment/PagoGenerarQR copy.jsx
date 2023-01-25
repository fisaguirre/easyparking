import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import "./PopUp.css";
import PagoQRPopUp from "./PagoQRPopUp";
import { PruebaDePago } from "../parking-control/tarjetero/tarjeta/service/TarjetaService";
const API_MERCADO_PAGO = process.env.REACT_APP_API_USER;
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;
const API_USER_CONTROL = process.env.REACT_APP_API_USER;

export default function PagoGenerarQR({ patente, cantidad_tarjetas, minutos, precio_total, userId, callback }) {
    const [usuario_id, setUsuarioId] = useState(1);
    const [codigoQR, setCodigoQR] = useState([]);
    const [codigoQRExists, setCodigoQRExists] = useState(false);
    const [modal, setModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [qrFinalizado, setQRFinalizado] = useState(false);
    const [storeAndPosUserExists, setStoreAndPosUserExists] = useState();
    const data = 1234;

    const verifyStoreAndPosUserExists = async () => {
        const getMercado = await fetch(`${API_PAYMENT}/pago/mercado/sucpos/${usuario_id}`)
        const mercado = await getMercado.json();

        if (mercado == "existe") {
            setStoreAndPosUserExists(true);
        } else {
            setStoreAndPosUserExists(false);
        }

    };


    const createOrder = async () => {
        const getMercado = await fetch(`${API_PAYMENT}/pago/mercado/${usuario_id}`)
        const mercado = await getMercado.json();

        const res = await fetch(`https://api.mercadopago.com/instore/orders/qr/seller/collectors/${mercado['mercado_usuario_id']}/pos/${mercado['external_pos_id']}/qrs?access_token=${mercado['access_token']}`, {
            method: "POST",
            body: JSON.stringify({
                "external_reference": "Pago Estacionamiento",
                "title": "Pago Estacionamiento",
                "description": "Estacionamiento Medido Ciudad de Mendoza",
                "total_amount": 160,
                "items": [
                    {
                        "title": "Tarjeta Estacionamiento",
                        "category": "estacionamiento",
                        "description": "Tiempo total",
                        "unit_price": 40,
                        "quantity": 4,
                        "unit_measure": "unit",
                        "total_amount": 160
                    }
                ]


            }),
        });
        const data = await res.json();
        setCodigoQR(data['qr_data']);
        console.log(data['qr_data'])
        console.log(codigoQR)
        if (data['qr_data'].length === 0) {
            setCodigoQRExists(false)
        } else {
            setCodigoQRExists(true)
            setOpenModal(true)
        }
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    const finalizarQREliminarTarjetas = async (patente, userId) => {

        /*
        console.log("hola")
        setOpenModal(false);
        console.log("si")
        setQRFinalizado(true)
        const usuario_id = userId['userId']
        console.log(patente['patente'])
        console.log(userId['userId'])

        const res = await fetch(`${API_USER_CONTROL}/tarjeta_instancia/finalizar/${patente['patente']}/${usuario_id}`, {
            method: "DELETE"
        });
        const data = await res.json();
        console.log(data)
        setQRFinalizado(false)
        await verifyStoreAndPosUserExists();
        */

    };
    useEffect(() => {
        verifyStoreAndPosUserExists();
    }, []);

    return (
        <div>
            {storeAndPosUserExists ? (
                <>
                    <button id="signup-button" className="btn btn-info" onClick={(e) => createOrder()}>Generar QR</button>
                    <PagoQRPopUp
                        open={openModal}
                        codigo_qr={codigoQR}
                        //onFinalizar={() => finalizarQREliminarTarjetas({ patente }, { userId })}
                        onFinalizar={() => { setOpenModal(false); callback(data); }}
                        onClose={() => setOpenModal(false)}
                        patente={patente}
                        cantidad_tarjetas={cantidad_tarjetas}
                        minutos={minutos}
                        precio_total={precio_total}
                        userId={userId}
                    />
                </>
            ) : null}




            {/*
            {codigoQRExists ? (
                <>
                    <p></p>
                    <Link id="signup-link" to="/pago/qrcode" state={{ from: "occupation" }}>
                        <button type="button" id="signup-button" className="btn btn-primary btn-block">asd</button>
                    </Link>

                    <div>
                        asd
                        <h1>{codigoQR}</h1>
                        <QR codigo={codigoQR} />
                    </div>
                </>
            ) : null}
            */}





        </div >

    );
};
