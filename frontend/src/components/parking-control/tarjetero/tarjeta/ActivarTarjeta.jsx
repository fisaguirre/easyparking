import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InstanciarTarjeta, PruebaRetornoFunction } from "./service/TarjetaService";
export default function ActivarTarjeta() {

    const [numeroPatenteFirstColumn, setNumeroPatenteFirstColumn] = useState();
    const [numeroPatenteSecondColumn, setNumeroPatenteSecondColumn] = useState();
    const [nombreMes, setNombreMes] = useState();
    const [nombreDia, setNombreDia] = useState();
    const [numeroDia, setNumeroDia] = useState();
    const [numeroHora, setNumeroHora] = useState();
    const [numeroMinutos, setNumeroMinutos] = useState();
    const [activarTarjeta, setButtonActivarTarjeta] = useState();

    const saveNumeroPatenteFirstColumn = (buttonValue) => {
        // 👇 "message" stores input field value
        setNumeroPatenteFirstColumn(buttonValue);
    };

    const saveNumeroPatenteSecondColumn = (buttonValue) => {
        // 👇 "message" stores input field value
        setNumeroPatenteSecondColumn(buttonValue);
    };

    const saveNombreMes = (buttonValue) => {
        // 👇 "message" stores input field value
        setNombreMes(buttonValue);
    };
    const saveNombreDia = (buttonValue) => {
        // 👇 "message" stores input field value
        setNombreDia(buttonValue);
    };
    const saveNumeroDia = (buttonValue) => {
        // 👇 "message" stores input field value
        setNumeroDia(buttonValue);
    };
    const saveNumeroHora = (buttonValue) => {
        // 👇 "message" stores input field value
        setNumeroHora(buttonValue);
    };
    const saveNumeroMinutos = (buttonValue) => {
        // 👇 "message" stores input field value
        setNumeroMinutos(buttonValue);
    };

    const buttonActivarTarjeta = (buttonValue) => {
        // 👇 "message" stores input field value
        setButtonActivarTarjeta(buttonValue);
    };

    return (
        <div>
            <div className="row">
                <h1>Patente A: {numeroPatenteFirstColumn}</h1>
                <h1>Patente B: {numeroPatenteSecondColumn}</h1>
                <h1>Nombre mes: {nombreMes}</h1>
                <h1>Nombre dia: {nombreDia}</h1>
                <h1>Dia fecha: {numeroDia}</h1>
                <h1>Numero hora: {numeroHora}</h1>
                <h1>Numero minutos: {numeroMinutos}</h1>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2"><h3>mendoza ciudad</h3>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-1">
                </div>
                <div className="col-md-2"><h4>Programa de estacionamiento medido<br></br>2023</h4>
                </div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-6">
                    <h5>Pago y uso obligatorio al momento de estacionar</h5>
                </div>
                <p></p>

            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2"><h4>Patente</h4>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-2"><h4>Mes</h4>
                </div>
                <div className="col-md-2">
                </div>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(0)}>0</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(0)}>0</button>
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNombreMes("Enero")}>Enero</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNombreMes("Febrero")}>Febrero</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNombreMes("Marzo")}>Marzo</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-2"></div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(1)}>1</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(1)}>1</button>
                </div>
                <div className="col-md-1">
                </div>
                <div className="col-md-4">Valido hasta el 31/10/2023<br></br>Dia
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-2"></div>
            </div>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(2)}>2</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(2)}>2</button>
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNombreDia("Lunes")}>Lunes</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNombreDia("Martes")}>Martes</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNombreDia("Miercoles")}>Miercoles</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-2"></div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(3)}>3</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(3)}>3</button>
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNombreDia("Jueves")}>Jueves</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNombreDia("Viernes")}>Viernes</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNombreDia("Sabado")}>Sabado</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-2"></div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(4)}>4</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(4)}>4</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(1)}>1</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(2)}>2</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(3)}>3</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(4)}>4</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(5)}>5</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(6)}>6</button>
                </div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(5)}>5</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(5)}>5</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(7)}>7</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(8)}>8</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(9)}>9</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(10)}>10</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(11)}>11</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(12)}>12</button>
                </div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(6)}>6</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(6)}>6</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(13)}>13</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(14)}>14</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(15)}>15</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(16)}>16</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(17)}>17</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(18)}>18</button>
                </div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(7)}>7</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(7)}>7</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(19)}>19</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(20)}>20</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(21)}>21</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(22)}>22</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(23)}>23</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(24)}>24</button>
                </div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(8)}>8</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(8)}>8</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(25)}>25</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(26)}>26</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(27)}>27</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(28)}>28</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(29)}>29</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroDia(30)}>30</button>
                </div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(9)}>9</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(9)}>9</button>
                </div>
                <div className="col-md-1">
                    <button type="button" onClick={() => saveNumeroDia(31)}>31</button>&nbsp;&nbsp;
                </div>
            </div>

            <p></p>
            <p></p>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2"><h4>Hora</h4>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-2"><h4>Minutos</h4>
                </div>
                <div className="col-md-2">
                </div>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroHora(8)}>8</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroHora(9)}>9</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroHora(10)}>10</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroHora(11)}>11</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-4">
                    <button type="button" onClick={() => saveNumeroMinutos(0)}>00</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroMinutos(5)}>05</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroMinutos(10)}>10</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroMinutos(15)}>15</button>&nbsp;&nbsp;
                </div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroHora(12)}>12</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroHora(13)}>13</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroHora(14)}>14</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroHora(15)}>15</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-4">
                    <button type="button" onClick={() => saveNumeroMinutos(20)}>20</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroMinutos(25)}>25</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroMinutos(30)}>30</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroMinutos(35)}>35</button>&nbsp;&nbsp;
                </div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroHora(16)}>16</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroHora(17)}>17</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroHora(18)}>18</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroHora(19)}>19</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-4">
                    <button type="button" onClick={() => saveNumeroMinutos(40)}>40</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroMinutos(45)}>45</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroMinutos(50)}>50</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroMinutos(55)}>55</button>&nbsp;&nbsp;
                </div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <button type="button" onClick={() => saveNumeroHora(20)}>20</button>&nbsp;&nbsp;
                </div>
                <div className="col-md-4">
                </div>
            </div>
            <p></p>
            <div>
                <InstanciarTarjeta
                    patenteA={numeroPatenteFirstColumn}
                    patenteB={numeroPatenteSecondColumn}
                    mes={nombreMes}
                    nombreDia={nombreDia}
                    numeroDia={numeroDia}
                    hora={numeroHora}
                    minutos={numeroMinutos}
                    activarTarjeta={activarTarjeta}
                />
            </div>
            <div>
                <p></p>
                <Link id="signup-link" to="/tarjeta_instancia/">
                    <button type="button" id="signup-button" className="btn btn-primary btn-block">Mis tarjetas activas</button>
                </Link>
            </div>
            <div>
                <p></p>
                <p></p>
                <Link id="signup-link" to="/tarjeta">
                    <button type="button" id="signup-button" className="btn btn-primary btn-block">Volver</button>
                </Link>
            </div>
        </div >
    )
}