import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Map } from "../components/parking-location/Map";
const API_MERCADO_PAGO = process.env.REACT_APP_API_USER;
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;

export default function Home() {
    let [users, setUsers] = useState([]);
    const [variable, setVariable] = useState("asd");
    const [codigoQR, setCodigoQR] = useState();


    /*
        const getUsers = async () => {
            //const res = await fetch(`${API_MERCADO_PAGO}/merchant_orders/search?access_token=TEST-7697609830214286-012119-9b1bcadb1aa4275a4c12f087e86f7717-1292570557users`);
            const res = await fetch(`https://api.mercadopago.com/merchant_orders/search?access_token=TEST-7697609830214286-012119-9b1bcadb1aa4275a4c12f087e86f7717-1292570557`);
    
    
            const data = await res.json();
            setUsers(data);
            console.log(data)
        };
        */
    /*
        const editUser = async (variable) => {
    
            const res = await fetch(`${API_PAYMENT}/prueba`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "hola": "fer"
                }),
            });
    
        };
    */
    const createOrder = async () => {

        const res = await fetch(`https://api.mercadopago.com/instore/orders/qr/seller/collectors/1292570557/pos/SUC001POS001/qrs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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


    /*
        useEffect(() => {
            getUsers();
        }, []);
      */
    return (
        <div>
            <h1>
                Esto es el HOME
                <p></p>
                <p></p>
                Descomentar linea que muestra componente mapa cuando termine la aplicacion
                <p></p>
                <p></p>
                Esta comentada para no malgastar las request de google maps
            </h1>
            <button onClick={(e) => createOrder()}>asdadsa</button>
            {/*<Map updateWorkZone={false} />*/}
        </div>
    )
}
{/*
export default function Home() {
    return (
        <BrowserRouter>
            <UserNavbar />
            <div className="container p-4">
                <Routes>
                    <Route path="/UserHome" element={<UserHome />} />
                    <Route path="/userAbout" element={<UserAbout />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
*/}