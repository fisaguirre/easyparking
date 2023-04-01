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
    const [storeExists, setStoreExists] = useState(false);
    const [boxExists, setBoxExists] = useState(false);
    const [mostrarTextBoxStore, setMostratButtonStore] = useState(false);
    const [mostrarTextBoxPos, setMostratButtonCaja] = useState(false);

    const [mostrarCreateButtonAccessToken, setMostrarCreateButtonAccessToken] = useState(true);
    const [mostrarCreateButtonStore, setMostrarCreateButtonStore] = useState(true);
    const [mostrarCreateButtonBox, setMostrarCreateButtonBox] = useState(true);



    const usuario_id = sessionStorage.getItem("usuario_id")
    const token = sessionStorage.getItem("token")


    const getCuentaMercado = async (usuario_id) => {
        const res = await fetch(`${API_PAYMENT}/pago/mercado/${usuario_id}`, {
            mmethod: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        const data = await res.json();
        //Verificar si el usuario tiene asociada una sucursal y una caja de su cuenta de Mercado Pago
        if (data[1]["code"] == 201) {
            if (data[2]["registro"]["store_id"] != 0) {
                setStoreExists(true)
            }

            if (data[2]["registro"]["pos_id"] != 0) {
                setBoxExists(true)
            }
        }
    };

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

    const verifyAccessTokenExists = async (usuario_id) => {
        if (accessTokenExists) {
            setMostrarCreateButtonAccessToken(false)

        } else {
            setMostrarCreateButtonAccessToken(false)
        }

    };

    const verifyStoreExists = async (usuario_id) => {
        if (storeExists) {
            window.confirm("Ya posee una sucursal en su cuenta")

        } else {
            setMostrarCreateButtonStore(false)
        }

    };

    const verifyBoxExists = async (usuario_id) => {
        if (boxExists) {
            window.confirm("Ya posee una caja en su cuenta")
        } else {
            setMostrarCreateButtonBox(false)
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
        console.log(mercado)
        const number_store_id = Number(store_id)
        console.log(number_store_id)

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
        getCuentaMercado(usuario_id);
    }, []);


    return (
        <div>
            <div>
                {setAccessTokenExists ? (
                    <>Access-token: asignado
                    </>

                ) : <>Access-token: no asignado
                </>
                }
            </div>
            <div>
                {storeExists ? (
                    <>Sucursal: asignado
                    </>

                ) : <>Sucursal: no asignado
                </>
                }
            </div>
            <div>
                {boxExists ? (
                    <>Caja: asignado
                    </>

                ) : <>Caja: no asignado
                </>
                }
            </div>

            {mostrarCreateButtonAccessToken ? (
                <>
                    <p></p>
                    <p></p>
                    <button onClick={(e) => verifyAccessTokenExists()}>Guardar nuevo access token</button>
                </>
            ) : <><input type="password" onChange={(e) => setAccessToken(e.target.value)}
                value={access_token}
                className="form-control"
                placeholder="Ingrese su access token de mercado pago" />
                <p></p>
                <button onClick={(e) => saveAccessToken(access_token, usuario_id)}>Guardar access token</button>
                <p></p>
            </>
            }

            {mostrarCreateButtonStore ? (
                <>
                    <p></p>
                    <p></p>
                    <button onClick={(e) => verifyStoreExists()}>Crear nueva sucursal</button>
                </>
            ) : <><input type="text" onChange={(e) => setStoreName(e.target.value)}
                value={storeName}
                className="form-control"
                placeholder="Ingrese el nombre de la sucursal para mercado pago" />
                <p></p>
                <p></p>
                <button onClick={(e) => createStore(storeName, posName, usuario_id)}>Guardar Sucursal</button>
            </>
            }

            {mostrarCreateButtonBox ? (
                <>
                    <p></p>
                    <p></p>
                    <button onClick={(e) => verifyBoxExists()}>Crear nueva caja</button>
                </>
            ) : <>
                <input type="text" onChange={(e) => setPosName(e.target.value)}
                    value={posName}
                    className="form-control"
                    placeholder="Ingrese el nombre de la caja para mercado pago" />
                <p></p>
                <p></p>
                <button onClick={(e) => createPos(store_id, external_store_id, posName, usuario_id)}>Guardar Caja</button>
            </>
            }

            {/*
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
        */}
        </div >

    );
};
