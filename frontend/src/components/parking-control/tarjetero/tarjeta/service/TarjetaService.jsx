import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_USER;

export const AmountCardsByUser = () => {

    let [amountCards, setAmountCards] = useState([]);


    const userProvisorio = 3
    const getAmountCards = async () => {
        const res = await fetch(`${API}/tarjetas/${userProvisorio}`);
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


export const AmountActivateCardsByUser = () => {
    let [amountCards, setAmountCards] = useState([]);

    const userProvisorio = 1
    const getAmountCards = async () => {
        const res = await fetch(`${API}/tarjetas_instancia/cantidad/${userProvisorio}`);
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



export const PruebaRetornoFunction = () => {

    const fer = "fernando"
    return (fer
    );
};