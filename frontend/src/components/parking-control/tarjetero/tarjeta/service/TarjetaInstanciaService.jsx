import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_USER;

export const AmountActivateCardsByUser = () => {
    let [amountCards, setAmountCards] = useState([]);
    let usuario_id_logueado = sessionStorage.getItem("usuario_id")
    let token = sessionStorage.getItem("token")

    const getAmountCards = async () => {
        const res = await fetch(`${API}/tarjeta_instancia/activar/${usuario_id_logueado}`, {
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
            <p></p>
            <div className="row">
                <div className="col-md-8">
                    <h2>Tarjetas activas: {amountCards.cantidad_tarjeta}</h2>
                </div>
                <p></p>

            </div>
        </div >
    );
};

export const AmountFinishedCardsByUser = () => {

    let [amountFinishedCards, setAmountFinishedCards] = useState([]);
    let usuario_id_logueado = sessionStorage.getItem("usuario_id")
    let token = sessionStorage.getItem("token")

    const contar = 'si'
    const getAmountFinishedCards = async () => {
        const res = await fetch(`${API}/tarjeta_instancia/finalizar/${contar}/${usuario_id_logueado}`, {
            mmethod: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
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
                <div className="col-md-12">
                    <h2>Pendientes por pagar: {amountFinishedCards.cantidad_tarjetas_finalizadas}</h2>
                </div>
                <p></p>

            </div>
        </div >
    );
};



export const DeleteFinishedCardByUser = () => {

    let [amountFinishedCards, setAmountFinishedCards] = useState([]);
    let usuario_id_logueado = sessionStorage.getItem("usuario_id")
    let token = sessionStorage.getItem("token")
    const contar = 'si'

    const getAmountFinishedCards = async () => {
        const res = await fetch(`${API}/tarjeta_instancia/finalizar/${contar}/${usuario_id_logueado}`, {
            mmethod: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
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
                    <h2>Tarjetas pendientes por pagar: {amountFinishedCards.cantidad_tarjetas_finalizadas}</h2>
                </div>
                <p></p>

            </div>
        </div >
    );
};