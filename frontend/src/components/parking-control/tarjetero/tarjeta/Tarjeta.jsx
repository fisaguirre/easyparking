import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AmountCardsByUser, Prueba2, PruebaRetornoFunction } from "./service/TarjetaService";

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
    const otraF = <PruebaRetornoFunction.toString />
    console.log(otraF)
    return (
        <div >
            <h1><PruebaRetornoFunction /></h1>
            <h1>This is Tarjetero mode</h1>
            <p></p>
            <div className="row">
                <div className="col-md-8">
                    <AmountCardsByUser />
                </div>
                <p></p>
                <div className="col-md-3">
                    <Link id="signup-link" to="/tarjeta/disenio">
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
                <Prueba2 />
            </div>
        </div >
    );
};

export default Tarjeta;
