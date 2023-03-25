import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AmountCardsByUser, PruebaRetornoFunction } from "./service/TarjetaService";
import { AmountActivateCardsByUser } from "./service/TarjetaInstanciaService";

const API = process.env.REACT_APP_API_USER;

const Tarjeta = () => {
    /*
    let [amountCards, setAmountCards] = useState([]);

    const userProvisorio = 1
    const getAmountCards = async () => {
        const res = await fetch(`${API}/tarjetas/${userProvisorio}`);
        const data = await res.json();
        setAmountCards(data);
    };


    useEffect(() => {
        getAmountCards();
    }, []);

*/

    let [amountCards, setAmountCards] = useState([]);
    const usuario_id_logueado = sessionStorage.getItem("usuario_id")
    let token = sessionStorage.getItem("token")

    const getAmountCards = async () => {
        const res = await fetch(`${API}/tarjetas/${usuario_id_logueado}`, {
            mmethod: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        const data = await res.json();
        setAmountCards(data);
    };


    //La funciòn useEffect() sirve para llamar/ hacer algo luego de que el componente de React ya haya sido llamado
    useEffect(() => {
        getAmountCards();
    }, []);

    return (
        <div >
            <h1>This is Tarjetero mode</h1>
            <p></p>
            <div className="row">

                <div className="row">
                    <div className="col-md-8">
                        <h2>Tarjetas disponibles en su cuentassss: {amountCards.cantidad_tarjeta}</h2>
                    </div>
                    <p></p>

                </div>
                <p></p>
                <div className="col-md-3">
                    <Link id="signup-link" to="/tarjeta/activarTarjeta">
                        <button type="button" id="signup-button" className="btn btn-primary btn-block">Usar nueva tarjeta</button>
                    </Link>
                </div>
                <div className="col-md-3">
                </div>
                <div className="col-md-4">
                    <Link id="signup-link" to="/tarjeta_instancia/">
                        <button type="button" id="signup-button" className="btn btn-primary btn-block">Mis tarjetas activas</button>
                    </Link>
                </div>
                <AmountActivateCardsByUser />
            </div>
        </div >
    );
};

export default Tarjeta;
