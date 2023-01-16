import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_USER;

export const AmountActivateCardsByUser = () => {
    let [amountCards, setAmountCards] = useState([]);

    const userProvisorio = 3
    const getAmountCards = async () => {
        const res = await fetch(`${API}/tarjeta_instancia/activar/${userProvisorio}`);
        const data = await res.json();
        setAmountCards(data);
    };


    //La funciòn useEffect() sirve para llamar/ hacer algo luego de que el componente de React ya haya sido llamado
    useEffect(() => {
        getAmountCards();
    }, []);

    return (
        <div >
            <p></p>
            <div className="row">
                <div className="col-md-8">
                    <h2>Tarjetas disponibles en su cuenta: {amountCards.cantidad_tarjeta}</h2>
                </div>
                <p></p>

            </div>
        </div >
    );
};

export const AmountFinishedCardsByUser = () => {
    let [amountFinishedCards, setAmountFinishedCards] = useState([]);

    const userProvisorio = 3
    const contar = "si"

    const getAmountFinishedCards = async () => {
        const res = await fetch(`${API}/tarjeta_instancia/finalizar/${contar}/${userProvisorio}`);
        const data = await res.json();
        setAmountFinishedCards(data);
    };


    //La funciòn useEffect() sirve para llamar/ hacer algo luego de que el componente de React ya haya sido llamado
    useEffect(() => {
        getAmountFinishedCards();
    }, []);

    return (
        <div >
            <p></p>
            <div className="row">
                <div className="col-md-8">
                    <h2>Tarjetas pendientes por pagar: {amountFinishedCards.cantidad_tarjeta}</h2>
                </div>
                <p></p>

            </div>
        </div >
    );
};

