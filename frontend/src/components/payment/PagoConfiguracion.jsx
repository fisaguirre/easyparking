import React, { useState, useEffect, useRef } from "react";
const API_MERCADO_PAGO = process.env.REACT_APP_API_USER;
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;


export default function PagoConfiguracion() {
    const [codigoQR, setCodigoQR] = useState();
    const [respuesta, setRespuesta] = useState();
    const [access_token, setAccessToken] = useState();
    const [mostrarTextBoxToken, setMostraTextBoxToken] = useState(false);
    const [usuario_id, setUsuarioId] = useState(1);
    const [storeName, setStoreName] = useState();
    const [posName, setPosName] = useState();
    const [store_id, setStoreId] = useState();
    const [external_store_id, setExternalStoreId] = useState();


    const saveAccessToken = async (access_token, usuario_id) => {
        const res = await fetch(`${API_PAYMENT}/pago/mercado`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                access_token,
                usuario_id
            })
        });
        const data = await res.json();
        console.log(data)

    };

    const createStore = async (storeName, posName, usuario_id) => {
        //Obtengo access token
        //creo Store
        //guardo datos Store
        const getMercado = await fetch(`${API_PAYMENT}/pago/mercado/token/${usuario_id}`)
        const mercado = await getMercado.json();
        setAccessToken(mercado['access_token']);

        const res = await fetch(`https://api.mercadopago.com/users/${mercado['mercado_usuario_id']}/stores?access_token=${mercado['access_token']}`, {
            method: "POST",
            body: JSON.stringify({
                "name": storeName,
                "external_id": "SUC009",
                "location": {
                    "street_number": "902",
                    "street_name": "Av. Bartolome Mitre",
                    "city_name": "Mendoza",
                    "state_name": "Mendoza",
                    "latitude": -32.8915427561287,
                    "longitude": -68.84501132344153
                }
            }),
        });
        const store_response = await res.json();
        const store_id = store_response['id']
        const external_store_id = store_response['external_id']
        const tipo_creacion = "save_store"

        setStoreId(store_id)
        setExternalStoreId(external_store_id)

        const res2 = await fetch(`${API_PAYMENT}/pago/mercado/${usuario_id}/${tipo_creacion}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "store_id": store_id,
                "external_store_id": external_store_id
            }),
        });
        const data = await res2.json();
        console.log(data)


    };

    const createPos = async (store_id, external_store_id, posName, usuario_id) => {
        const getMercado = await fetch(`${API_PAYMENT}/pago/mercado/token/${usuario_id}`)
        const mercado = await getMercado.json();
        const number_store_id = Number(store_id)

        const res3 = await fetch(`https://api.mercadopago.com/pos?access_token=${mercado['access_token']}`, {
            method: "POST",
            body: JSON.stringify({
                "name": posName,
                "fixed_amount": true,
                "store_id": number_store_id,
                "external_store_id": external_store_id,
                "external_id": "SUC009POS009",
                "category": 621102
            }),
        });
        const pos_response = await res3.json();
        const pos_id = pos_response['id']
        const external_pos_id = pos_response['external_id']
        const tipo_creacion_2 = "save_pos"

        const res4 = await fetch(`${API_PAYMENT}/pago/mercado/${usuario_id}/${tipo_creacion_2}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "pos_id": pos_id,
                "external_pos_id": external_pos_id
            }),
        });
        const response_save_pos = await res4.json();
        console.log(response_save_pos)

    };

    /*
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
                value={access_token}
                className="form-control"
                placeholder="Ingrese su access token de mercado pago" />
            <p></p>
            <button onClick={(e) => saveAccessToken(access_token, usuario_id)}>Guardar access token</button>
            <p></p>

            <input type="text" onChange={(e) => setStoreName(e.target.value)}
                value={storeName}
                className="form-control"
                placeholder="Ingrese el nombre de la sucursal para mercado pago" />

            <button onClick={(e) => createStore(storeName, posName, usuario_id)}>Crear nueva sucursal</button>
            <p></p>
            <p></p>
            <input type="text" onChange={(e) => setPosName(e.target.value)}
                value={posName}
                className="form-control"
                placeholder="Ingrese el nombre de la caja para mercado pago" />
            <p></p>
            <p></p>
            <button onClick={(e) => createPos(store_id, external_store_id, posName, usuario_id)}>Crear nueva caja</button>
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
