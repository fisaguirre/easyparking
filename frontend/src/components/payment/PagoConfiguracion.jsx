import React, { useState, useEffect, useRef } from "react";
const API_MERCADO_PAGO = process.env.REACT_APP_API_USER;
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;


export default function PagoConfiguracion() {
    const [codigoQR, setCodigoQR] = useState();
    const [respuesta, setRespuesta] = useState();
    const [access_token, setAccessToken] = useState();
    const [mostrarTextBoxToken, setMostraTextBoxToken] = useState(false);
    const [storeName, setStoreName] = useState();
    const [posName, setPosName] = useState();
    const [store_id, setStoreId] = useState();
    const [external_store_id, setExternalStoreId] = useState();
    const [accessTokenExists, setAccessTokenExists] = useState(false);
    const [mostrarTextBoxStore, setMostratButtonStore] = useState(false);
    const [mostrarTextBoxPos, setMostratButtonCaja] = useState(false);

    const usuario_id = sessionStorage.getItem("usuario_id")
    const token = sessionStorage.getItem("token")


    const getAccessTokenExists = async (usuario_id) => {
        const res = await fetch(`${API_PAYMENT}/pago/mercado/token/exists/${usuario_id}`, {
            mmethod: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        const data = await res.json();
        if (data == 'existe') {
            setAccessTokenExists(true);
            setMostratButtonStore(true);
        }
    };

    const saveAccessToken = async (access_token, usuario_id) => {
        const res = await fetch(`${API_PAYMENT}/pago/mercado`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
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
        const getMercado = await fetch(`${API_PAYMENT}/pago/mercado/token/${usuario_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        const mercado = await getMercado.json();

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
                "x-access-token": token
            },
            body: JSON.stringify({
                "store_id": store_id,
                "external_store_id": external_store_id
            }),
        });
        const data = await res2.json();
        console.log(data);

        setMostratButtonCaja(true);


    };

    const createPos = async (store_id, external_store_id, posName, usuario_id) => {
        const getMercado = await fetch(`${API_PAYMENT}/pago/mercado/token/${usuario_id}`, {
            mmethod: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
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
                "x-access-token": token
            },
            body: JSON.stringify({
                "pos_id": pos_id,
                "external_pos_id": external_pos_id
            }),
        });
        const response_save_pos = await res4.json();
        console.log(response_save_pos)

    };

    useEffect(() => {
        getAccessTokenExists(usuario_id);
    }, []);


    return (
        <div>
            <input type="password" onChange={(e) => setAccessToken(e.target.value)}
                value={access_token}
                className="form-control"
                placeholder="Ingrese su access token de mercado pago" />
            <p></p>
            <button onClick={(e) => saveAccessToken(access_token, usuario_id)}>Guardar access token</button>
            <p></p>

            {mostrarTextBoxStore ? (
                <><input type="text" onChange={(e) => setStoreName(e.target.value)}
                    value={storeName}
                    className="form-control"
                    placeholder="Ingrese el nombre de la sucursal para mercado pago" />
                    <p></p>
                    <p></p>
                    <button onClick={(e) => createStore(storeName, posName, usuario_id)}>Crear nueva sucursal</button>
                </>
            ) : null
            }
            <p></p>
            <p></p>

            <p></p>
            {mostrarTextBoxPos ? (
                <><input type="text" onChange={(e) => setPosName(e.target.value)}
                    value={posName}
                    className="form-control"
                    placeholder="Ingrese el nombre de la caja para mercado pago" />
                    <p></p>
                    <p></p>
                    <button onClick={(e) => createPos(store_id, external_store_id, posName, usuario_id)}>Crear nueva caja</button>
                </>
            ) : null
            }
        </div >

    );
};
