import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_USER;

export const AmountCardsByUser = () => {

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


export const PruebaRetornoFunction = (props) => {
    let token = sessionStorage.getItem("token")

    const createCard = async (patenteA, patenteB, mes, dia_semana, dia_fecha, hora, minutos) => {
        const res = await fetch(`${API}/tarjeta_instancia/activar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                patenteA,
                patenteB,
                mes,
                dia_semana,
                dia_fecha,
                hora,
                minutos
            }),
        });
    };

    return (
        <div>
            <div>
                <p></p>
                <button type="button" id="signup-button" className="btn btn-info" onClick={(e) => createCard(props.patenteA, props.patenteB, props.mes, props.nombreDia, props.numeroDia, props.hora, props.minutos)}
                >Activar tarjeta</button>
            </div>
            {props.patenteA}
            {props.patenteB}
            {props.mes}
            {props.nombreDia}
            {props.numeroDia}
            {props.hora}
            {props.minutos}
        </div>
    );
};


export const InstanciarTarjeta = (props) => {

    let token = sessionStorage.getItem("token")
    const usuario_id = sessionStorage.getItem("usuario_id")

    const createCard = async (patenteA, patenteB, mes, dia_semana, dia_fecha, hora, minutos) => {
        if (patenteA == null || patenteB == null || mes == null || dia_semana == null || dia_fecha == null || hora == null || minutos == null) {
            const rechazarTarjeta = window.confirm("Debe seleccionar todos los campos para activar una tarjeta");
        }
        else {

            const patente = '' + patenteA + patenteB
            const res = await fetch(`${API}/tarjeta_instancia/activar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                },
                body: JSON.stringify({
                    mes,
                    dia_semana,
                    dia_fecha,
                    hora,
                    minutos,
                    patente,
                    usuario_id
                }),
            });
            const tarjetaCreada = window.confirm("Se activo la tarjeta");

        }
    };

    return (
        <div>
            <p></p>
            <button type="button" id="signup-button" className="btn btn-info" onClick={(e) => createCard(props.patenteA, props.patenteB, props.mes, props.nombreDia, props.numeroDia, props.hora, props.minutos)}
            >Activar tarjeta</button>
        </div>
    );
};
