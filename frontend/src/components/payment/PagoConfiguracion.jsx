import React, { useState, useEffect, useRef } from "react";
const API_MERCADO_PAGO = process.env.REACT_APP_API_USER;
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;


export default function PagoConfiguracion() {
    const [codigoQR, setCodigoQR] = useState();
    const [respuesta, setRespuesta] = useState();
    const [accesToken, setAccessToken] = useState();
    const [mostrarTextBoxToken, setMostraTextBoxToken] = useState(false);
    const [usuario_id, setUsuarioId] = useState(1)

    const saveAccessToken = async (access_token, usuario_id) => {

        const res = await fetch(`${API_PAYMENT}/pago/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                access_token,
                usuario_id
            }),
        });
        const data = await res.json();
        console.log(data)

    };
    /*
    const createSucursal = async () => {

        const res = await fetch(`https://api.mercadopago.com/users/1292570557/stores?access_token=TEST-7697609830214286-012119-9b1bcadb1aa4275a4c12f087e86f7717-1292570557`, {
            //const res = await fetch(`https://api.mercadopago.com`, {
            method: "POST",
            headers: {
            },
            body: JSON.stringify({
                "name": "Sucursal Instore 2",
                "business_hours": {
                    "monday": [
                        {
                            "open": "08:00",
                            "close": "12:00"
                        }
                    ],
                    "tuesday": [
                        {
                            "open": "09:00",
                            "close": "18:00"
                        }
                    ]
                },
                "external_id": "SUC003",
                "location": {
                    "street_number": "3039",
                    "street_name": "Caseros",
                    "city_name": "Belgrano",
                    "state_name": "Capital Federal",
                    "latitude": -32.8897322,
                    "longitude": -68.8443275,
                    "reference": "3er Piso"
                }



            }),
        });
        const data = await res.json();
        setCodigoQR(data);
        console.log(data)

    };


    const createCaja = async () => {

        const res = await fetch(`https://api.mercadopago.com/pos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": "<calculated when request is sent>",
                "Host": "<calculated when request is sent>"
            },
            body: JSON.stringify({
                "name": "Caja 1 EP Tarjetero 1",
                "fixed_amount": true,
                "store_id": 51615272,
                "external_store_id": "SUC001",
                "external_id": "SUC001POS001",
                "category": 621102
            }),
        });
        const data = await res.json();
        setCodigoQR(data);
        console.log(data)

    };
    const createOrder = async () => {

        const res = await fetch(`https://api.mercadopago.com/instore/orders/qr/seller/collectors/1292570557/pos/SUC001POS001/qrs?access_token=TEST-7697609830214286-012119-9b1bcadb1aa4275a4c12f087e86f7717-1292570557`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": "<calculated when request is sent>",
                "Host": "api.mercadopago.com",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
            },
            body: JSON.stringify({
                "external_reference": "Ferdinamico",
                "title": "Pago Estacionamiento",
                "description": "Estacionamiento Medido Ciudad de Mendoza",
                "total_amount": 160,
                "items": [
                    {
                        "title": "Tarjeta Estacionamiento",
                        "category": "estacionamiento",
                        "description": "This is the Point Mini",
                        "unit_price": 40,
                        "quantity": 4,
                        "unit_measure": "unit",
                        "total_amount": 160
                    }
                ]


            }),
        });
        const data = await res.json();
        setCodigoQR(data);
        console.log(data)

    };



    useEffect(() => {
        getUsers();
    }, []);

*/


    return (
        <div>
            Buttuns
            <input type="password" onChange={(e) => setAccessToken(e.target.value)}
                value={accesToken}
                className="form-control"
                placeholder="Ingrese su access token de mercado pago" />
            <p></p>
            <button onClick={(e) => saveAccessToken(accesToken, usuario_id)}>Guardar access token</button>
            <p></p>

            {/*
            <p></p>
            <button onClick={(e) => probarMercadoPago()}>Crear sucursal</button>
            <p></p>
            <p></p>
            <button onClick={(e) => probarMercadoPago()}>Crear caja</button>
            <p></p>

            Funciones que no ve el tarjetero
            <p></p>
            <button onClick={(e) => probarMercadoPago()}>Guardar access token</button>
            <p></p>
            <p></p>
            <button onClick={(e) => createSucursal()}>crear sucursal</button>
            <p></p>
            <p></p>
            <button onClick={(e) => createCaja()}>crear caja</button>

            <button onClick={(e) => createOrder()}>crear orden</button>
    */}
        </div >

    );
};
