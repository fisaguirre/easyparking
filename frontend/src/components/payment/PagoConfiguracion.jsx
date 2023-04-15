import React, { useState, useEffect, useRef } from "react";

import { toast } from 'react-toastify';
import { propertyA } from "../messages/Messages";
import 'react-toastify/dist/ReactToastify.css';
import "./styles/pago.css";
import "../messages/MessageStyles.css";
const API_MERCADO_PAGO = process.env.REACT_APP_API_MERCADO_PAGO;
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;
const API_LOCATION = process.env.REACT_APP_API_LOCATION;

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

    const [mostrarButtonCreateAccessToken, setMostrarButtonCreateAccessToken] = useState(true);
    const [mostrarButtonCreateStore, setMostrarButtonCreateStore] = useState(true);
    const [mostrarButtonCreateBox, setMostrarButtonCreateBox] = useState(true);


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
        if (data == "existe") {
            setAccessTokenExists(true);
            setMostrarButtonCreateStore(true);
        }
    };

    const verifyAccessTokenExists = async (usuario_id) => {
        if (accessTokenExists) {
            setMostrarButtonCreateAccessToken(false)

        } else {
            setMostrarButtonCreateAccessToken(false)
        }

    };


    const verifyStoreExists = async (usuario_id) => {
        if (storeExists) {
            toast.info("Ya posee una sucursal en su cuenta", propertyA);
        } else {
            setMostrarButtonCreateStore(false)
        }

    };

    const verifyBoxExists = async (usuario_id) => {
        if (boxExists) {
            toast.info("Ya posee una caja en su cuenta", propertyA);
        } else {
            setMostrarButtonCreateBox(false)
        }
    };

    const saveAccessToken = async (access_token, usuario_id) => {
        if (access_token === undefined) {
            toast.info("Debe ingresar un token en el campo de texto", propertyA);
        }
        if (access_token.length < 70) {
            toast.error("Debe ingresar un token vàlido", propertyA);
        }
        else {
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
            toast.success("Se ha guardado el token ingresado", propertyA);
        }
    };


    const createStore = async (storeName, posName, usuario_id) => {
        if (storeName === undefined) {
            toast.info("Debe ingresar un nombre para la sucursal", propertyA);
        }
        if (storeName.length < 5) {
            toast.info("Debe ingresar un nombre mas largo para la sucursal", propertyA);
        } else {
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

            const getLocation = await fetch(`${API_LOCATION}/estacionamiento/zonaTrabajo/${usuario_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                }
            });
            const workZone = await getLocation.json();
            const latitud = Number(workZone['latitud'])
            const longitud = Number(workZone['longitud'])
            const calle = workZone['calle']

            try {
                const res = await fetch(`${API_MERCADO_PAGO}/users/${mercado['mercado_usuario_id']}/stores?access_token=${mercado['access_token']}`, {
                    method: "POST",
                    body: JSON.stringify({
                        "name": storeName,
                        "external_id": "SUC009",
                        "location": {
                            "street_name": calle,
                            "city_name": "Mendoza",
                            "state_name": "Mendoza",
                            "latitude": latitud,
                            "longitude": longitud
                        }
                    }),
                });
                const store_response = await res.json();
                /*
                if (store_response['message'].includes('is already assigned')) {
                    throw new Error("Ya tiene una sucursal asignada a su cuenta")
                }
                */
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
                if (store_response['name'] == storeName) {
                    setMostrarButtonCreateStore(true);
                    setStoreExists(true)
                    toast.success("Se ha guardado la sucursal ingresada", propertyA);
                } else {
                    throw new Error("No se pudo crear la sucursal ingreasda")
                }
            } catch (e) {
                //console.log(e)
                console.log(e.message);
                //console.log(e.description);
                //console.log(e.stack);
                toast.error(e.message, propertyA);
            }
        }
    };
    /*
        const deleteStore = async () => {
            const getMercado = await fetch(`${API_PAYMENT}/pago/mercado/${usuario_id}`, {
                mmethod: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                }
            });
            const mercado = await getMercado.json();
            console.log(mercado)
            try {
                const res = await fetch(`${API_MERCADO_PAGO}/users/1292570557/stores/54513399?access_token=${mercado[2]["registro"]['access_token']}`, {
                    method: "DELETE"
                });
                const store_response = await res.json();
                console.log(store_response)
              
    
            } catch (e) {
                //console.log(e)
                console.log(e.message);
                //console.log(e.description);
                //console.log(e.stack);
                toast.error(e.message, propertyA);
            }
        }
        */
    const createPos = async (store_id, external_store_id, posName, usuario_id) => {
        if (posName === undefined) {
            toast.info("Debe ingresar un nombre para la caja", propertyA);
        }
        if (posName.length < 5) {
            toast.info("Debe ingresar un nombre mas largo para la caja", propertyA);
        } else {
            const getMercado = await fetch(`${API_PAYMENT}/pago/mercado/token/${usuario_id}`, {
                mmethod: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                }
            });
            const mercado = await getMercado.json();
            const number_store_id = Number(store_id)

            try {
                const res3 = await fetch(`${API_MERCADO_PAGO}/pos?access_token=${mercado['access_token']}`, {
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

                if (pos_response['name'] == posName) {
                    setMostrarButtonCreateBox(true);
                    setBoxExists(true)
                    toast.success("Se ha guardado la caja ingresada", propertyA);
                } else {
                    throw new Error("No se pudo crear la caja ingreasda")
                }
            } catch (e) {
                console.log(e.message);
                toast.error(e.message, propertyA);
            }
        }
    };

    useEffect(() => {
        getAccessTokenExists(usuario_id);
        getCuentaMercado(usuario_id);
    }, []);


    return (
        <div>
            <div>
                <h4>Configuración para cobrar a través de Mercado Pago</h4>
                {accessTokenExists ? (
                    <><p className="infoCuenta">Access-token: asignado</p>
                    </>

                ) : <><p className="infoCuenta">Access-token: no asignado</p>
                </>
                }

                {mostrarButtonCreateAccessToken ? (
                    <>
                        <p></p>
                        <p></p>
                        <button className="buttonAgregarCuenta" onClick={(e) => verifyAccessTokenExists()}>Guardar nuevo access token</button>
                    </>
                ) : <><input type="password" onChange={(e) => setAccessToken(e.target.value)}
                    value={access_token}
                    className="form-control"
                    placeholder="Ingrese su access token de mercado pago" />
                    <p></p>
                    <button className="buttonAgregarCuenta" onClick={(e) => saveAccessToken(access_token, usuario_id)}>Guardar access token</button>
                </>
                }
            </div>
            <div>
                {storeExists ? (
                    <><p className="infoCuenta">Sucursal: asignado</p>
                    </>

                ) : <><p className="infoCuenta">Sucursal: no asignado</p>
                </>
                }
                {mostrarButtonCreateStore ? (
                    <>

                        <button className="buttonAgregarCuenta" onClick={(e) => verifyStoreExists()}>Crear nueva sucursal</button>
                    </>
                ) : <>
                    <input type="text" onChange={(e) => setStoreName(e.target.value)}
                        value={storeName}
                        className="form-control"
                        placeholder="Ingrese el nombre de la sucursal para mercado pago" />
                    <p></p>
                    <button className="buttonAgregarCuenta" onClick={(e) => createStore(storeName, posName, usuario_id)}>Guardar Sucursal</button>
                </>
                }
            </div>

            <div>
                {boxExists ? (
                    <>
                        <p className="infoCuenta">Caja: asignado</p>
                    </>

                ) : <><p className="infoCuenta">Caja: no asignado</p>
                </>
                }
                {mostrarButtonCreateBox ? (
                    <>
                        <button className="buttonAgregarCuenta" onClick={(e) => verifyBoxExists()}>Crear nueva caja</button>
                    </>
                ) : <>
                    <input type="text" onChange={(e) => setPosName(e.target.value)}
                        value={posName}
                        className="form-control"
                        placeholder="Ingrese el nombre de la caja para mercado pago" />
                    <p></p>
                    <button className="buttonAgregarCuenta" onClick={(e) => createPos(store_id, external_store_id, posName, usuario_id)}>Guardar Caja</button>
                </>
                }
            </div>
        </div >

    );
};
