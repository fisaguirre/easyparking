import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InstanciarTarjeta, PruebaRetornoFunction } from "./service/TarjetaService";
import './style.css';
import { Button } from "./Button";
import { Button2 } from "./Button";

export default function ActivarTarjeta() {
    const [color, setColor] = useState("red");
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedButton2, setSelectedButton2] = useState(null);
    const [selectedButton3, setSelectedButton3] = useState(null);
    const [selectedButton4, setSelectedButton4] = useState(null);

    const [selectedButtonFirstPatent, setSelectedButtonFirstPatent] = useState(null);
    const [selectedButtonSecondtPatent, setSelectedButtonSecondtPatent] = useState(null);
    const [selectedButtonMonth, setSelectedButtonMonth] = useState(null);
    const [selectedButtonNameDay, setSelectedButtonNameDay] = useState(null);
    const [selectedButtonNumberDay, setSelectedButtonNumberDay] = useState(null);
    const [selectedButtonHour, setSelectedButtonHour] = useState(null);
    const [selectedButtonMinutes, setSelectedButtonMinutes] = useState(null);

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

    const handleClick = () => {
        setColor("blue");
    };

    const handleButtonClick = (button) => {
        setSelectedButton(button);
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
                    <Button
                        text="0"
                        backgroundColor={selectedButtonFirstPatent === "0a" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonFirstPatent("0a"); saveNumeroPatenteFirstColumn(0) }}
                    />
                    {/*
                    <button className="btn btn-info" type="button" onClick={() => saveNumeroDia(3)}>3</button>&nbsp;&nbsp;
                    <button className="gray-button" type="button" onClick={() => saveNumeroDia(4)}>4</button>
    */}
                    &nbsp;&nbsp;
                    <Button
                        text="0"
                        backgroundColor={selectedButtonSecondtPatent === "0b" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonSecondtPatent("0b"); saveNumeroPatenteSecondColumn(0) }}
                    />
                    {/*
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(0)}>0</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(0)}>0</button>
    */}
                </div>
                <div className="col-md-2">
                    <Button
                        text="Enero"
                        backgroundColor={selectedButtonMonth === "Enero" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMonth("Enero"); saveNombreMes("Enero") }}
                    />
                    {/*
                    <button type="button" onClick={() => saveNombreMes("Enero")}>Enero</button>&nbsp;&nbsp;
*/}
                </div>
                <div className="col-md-2">
                    <Button
                        text="Febrero"
                        backgroundColor={selectedButtonMonth === "Febrero" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMonth("Febrero"); saveNombreMes("Febrero") }}
                    />
                    {/*
                    <button type="button" onClick={() => saveNombreMes("Febrero")}>Febrero</button>&nbsp;&nbsp;
*/}
                </div>
                <div className="col-md-2">
                    <Button
                        text="Marzo"
                        backgroundColor={selectedButtonMonth === "Marzo" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMonth("Marzo"); saveNombreMes("Marzo") }}
                    />
                    {/*
                    <button type="button" onClick={() => saveNombreMes("Marzo")}>Marzo</button>&nbsp;&nbsp;
*/}
                </div>
                <div className="col-md-2"></div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <Button
                        text="1"
                        backgroundColor={selectedButtonFirstPatent === "1a" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonFirstPatent("1a"); saveNumeroPatenteFirstColumn(1) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="1"
                        backgroundColor={selectedButtonSecondtPatent === "1b" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonSecondtPatent("1b"); saveNumeroPatenteSecondColumn(1) }}
                    />
                    {/*
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(1)}>1</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(1)}>1</button>
    */}
                </div>
                <div className="col-md-2">
                </div>
                <div className="col-md-2"><br></br><h4>Dia</h4>
                </div>
                {/*<div className="col-md-4">Valido hasta el 31/10/2023<br></br>Dia
                </div>
    */}
                <div className="col-md-2">
                </div>
                <div className="col-md-2"></div>
            </div>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <Button
                        text="2"
                        backgroundColor={selectedButtonFirstPatent === "2a" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonFirstPatent("2a"); saveNumeroPatenteFirstColumn(2) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="2"
                        backgroundColor={selectedButtonSecondtPatent === "2b" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonSecondtPatent("2b"); saveNumeroPatenteSecondColumn(2) }}
                    />
                    {/*
                    <button type="button" onClick={() => saveNumeroPatenteFirstColumn(2)}>2</button>&nbsp;&nbsp;
                    <button type="button" onClick={() => saveNumeroPatenteSecondColumn(2)}>2</button>
*/}
                </div>
                <div className="col-md-2">
                    <Button
                        text="Lunes"
                        backgroundColor={selectedButtonNameDay === "Lunes" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNameDay("Lunes"); saveNombreDia("Lunes") }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <Button
                        text="Martes"
                        backgroundColor={selectedButtonNameDay === "Martes" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNameDay("Martes"); saveNombreDia("Martes") }}
                    />
                    &nbsp;&nbsp;
                </div>

                <div className="col-md-2">
                    <Button
                        text="Miercoles"
                        backgroundColor={selectedButtonNameDay === "Miercoles" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNameDay("Miercoles"); saveNombreDia("Miercoles") }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2"></div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <Button
                        text="3"
                        backgroundColor={selectedButtonFirstPatent === "3a" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonFirstPatent("3a"); saveNumeroPatenteFirstColumn(3) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="3"
                        backgroundColor={selectedButtonSecondtPatent === "3b" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonSecondtPatent("3b"); saveNumeroPatenteSecondColumn(3) }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <Button
                        text="Jueves"
                        backgroundColor={selectedButtonNameDay === "Jueves" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNameDay("Jueves"); saveNombreDia("Jueves") }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <Button
                        text="Viernes"
                        backgroundColor={selectedButtonNameDay === "Viernes" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNameDay("Viernes"); saveNombreDia("Viernes") }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <Button
                        text="Sabado"
                        backgroundColor={selectedButtonNameDay === "Sabado" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNameDay("Sabado"); saveNombreDia("Sabado") }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2"></div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <Button
                        text="4"
                        backgroundColor={selectedButtonFirstPatent === "4a" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonFirstPatent("4a"); saveNumeroPatenteFirstColumn(4) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="4"
                        backgroundColor={selectedButtonSecondtPatent === "4b" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonSecondtPatent("4b"); saveNumeroPatenteSecondColumn(4) }}
                    />
                    &nbsp;&nbsp;

                </div>
                <div className="col-md-1">
                    <Button
                        text="1"
                        backgroundColor={selectedButtonNumberDay === "1" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("1"); saveNumeroDia(1) }}
                    />
                    &nbsp;
                    <Button
                        text="2"
                        backgroundColor={selectedButtonNumberDay === "2" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("2"); saveNumeroDia(2) }}
                    />
                    &nbsp;&nbsp;
                </div>
                {/*div className="col-md-1"></div>*/}
                <div className="col-md-1">
                    <Button
                        text="3"
                        backgroundColor={selectedButtonNumberDay === "3" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("3"); saveNumeroDia(3) }}
                    />
                    &nbsp;
                    <Button
                        text="4"
                        backgroundColor={selectedButtonNumberDay === "4" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("4"); saveNumeroDia(4) }}
                    />
                    &nbsp;&nbsp;
                </div>
                {/*<div className="col-md-1"></div>*/}
                <div className="col-md-1">
                    <Button
                        text="5"
                        backgroundColor={selectedButtonNumberDay === "5" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("5"); saveNumeroDia(5) }}
                    />
                    &nbsp;
                    <Button
                        text="6"
                        backgroundColor={selectedButtonNumberDay === "6" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("6"); saveNumeroDia(6) }}
                    />
                    &nbsp;&nbsp;
                </div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <Button
                        text="5"
                        backgroundColor={selectedButtonFirstPatent === "5a" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonFirstPatent("5a"); saveNumeroPatenteFirstColumn(5) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="5"
                        backgroundColor={selectedButtonSecondtPatent === "5b" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonSecondtPatent("5b"); saveNumeroPatenteSecondColumn(5) }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <Button
                        text="7"
                        backgroundColor={selectedButtonNumberDay === "7" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("7"); saveNumeroDia(7) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="8"
                        backgroundColor={selectedButtonNumberDay === "8" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("8"); saveNumeroDia(8) }}
                    />
                    &nbsp;&nbsp;

                </div>
                <div className="col-md-2">
                    <Button
                        text="9"
                        backgroundColor={selectedButtonNumberDay === "9" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("9"); saveNumeroDia(9) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="10"
                        backgroundColor={selectedButtonNumberDay === "10" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("10"); saveNumeroDia(10) }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-1">
                    <Button
                        text="11"
                        backgroundColor={selectedButtonNumberDay === "11" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("11"); saveNumeroDia(11) }}
                    />
                    &nbsp;
                    <Button
                        text="12"
                        backgroundColor={selectedButtonNumberDay === "12" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("12"); saveNumeroDia(12) }}
                    />
                    &nbsp;&nbsp;
                </div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <Button
                        text="6"
                        backgroundColor={selectedButtonFirstPatent === "6a" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonFirstPatent("6a"); saveNumeroPatenteFirstColumn(6) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="6"
                        backgroundColor={selectedButtonSecondtPatent === "6b" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonSecondtPatent("6b"); saveNumeroPatenteSecondColumn(6) }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <Button
                        text="13"
                        backgroundColor={selectedButtonNumberDay === "13" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("13"); saveNumeroDia(13) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="14"
                        backgroundColor={selectedButtonNumberDay === "14" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("14"); saveNumeroDia(14) }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <Button
                        text="15"
                        backgroundColor={selectedButtonNumberDay === "15" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("15"); saveNumeroDia(15) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="16"
                        backgroundColor={selectedButtonNumberDay === "16" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("16"); saveNumeroDia(16) }}
                    />
                    &nbsp;&nbsp;

                </div>
                <div className="col-md-2">
                    <Button
                        text="15"
                        backgroundColor={selectedButtonNumberDay === "17" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("17"); saveNumeroDia(17) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="18"
                        backgroundColor={selectedButtonNumberDay === "18" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("18"); saveNumeroDia(18) }}
                    />
                    &nbsp;&nbsp;
                </div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <Button
                        text="7"
                        backgroundColor={selectedButtonFirstPatent === "7a" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonFirstPatent("7a"); saveNumeroPatenteFirstColumn(7) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="7"
                        backgroundColor={selectedButtonSecondtPatent === "7b" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonSecondtPatent("7b"); saveNumeroPatenteSecondColumn(7) }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <Button
                        text="19"
                        backgroundColor={selectedButtonNumberDay === "19" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("19"); saveNumeroDia(19) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="20"
                        backgroundColor={selectedButtonNumberDay === "20" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("20"); saveNumeroDia(20) }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <Button
                        text="21"
                        backgroundColor={selectedButtonNumberDay === "21" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("21"); saveNumeroDia(21) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="22"
                        backgroundColor={selectedButtonNumberDay === "22" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("22"); saveNumeroDia(22) }}
                    />
                </div>
                <div className="col-md-2">
                    <Button
                        text="23"
                        backgroundColor={selectedButtonNumberDay === "23" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("23"); saveNumeroDia(23) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="24"
                        backgroundColor={selectedButtonNumberDay === "24" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("24"); saveNumeroDia(24) }}
                    />
                </div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <Button
                        text="8"
                        backgroundColor={selectedButtonFirstPatent === "8a" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonFirstPatent("8a"); saveNumeroPatenteFirstColumn(8) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="8"
                        backgroundColor={selectedButtonSecondtPatent === "8b" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonSecondtPatent("8b"); saveNumeroPatenteSecondColumn(8) }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <Button
                        text="25"
                        backgroundColor={selectedButtonNumberDay === "25" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("25"); saveNumeroDia(25) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="26"
                        backgroundColor={selectedButtonNumberDay === "26" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("26"); saveNumeroDia(26) }}
                    />
                </div>
                <div className="col-md-2">
                    <Button
                        text="27"
                        backgroundColor={selectedButtonNumberDay === "27" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("27"); saveNumeroDia(27) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="28"
                        backgroundColor={selectedButtonNumberDay === "28" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("28"); saveNumeroDia(28) }}
                    />
                </div>
                <div className="col-md-2">
                    <Button
                        text="29"
                        backgroundColor={selectedButtonNumberDay === "29" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("29"); saveNumeroDia(29) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="30"
                        backgroundColor={selectedButtonNumberDay === "30" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("30"); saveNumeroDia(30) }}
                    />
                </div>
            </div>
            <p></p>

            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <Button
                        text="9"
                        backgroundColor={selectedButtonFirstPatent === "9a" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonFirstPatent("9a"); saveNumeroPatenteFirstColumn(9) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="9"
                        backgroundColor={selectedButtonSecondtPatent === "9b" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonSecondtPatent("9b"); saveNumeroPatenteSecondColumn(9) }}
                    />
                    &nbsp;&nbsp;
                </div>
                <div className="col-md-2">
                    <Button
                        text="31"
                        backgroundColor={selectedButtonNumberDay === "31" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonNumberDay("31"); saveNumeroDia(31) }}
                    />
                    &nbsp;&nbsp;
                </div>
            </div>

            <p></p>
            <p></p>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-1"></div>
                <div className="col-md-2"><h4>Hora</h4>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-1"></div>

                <div className="col-md-2"><h4>Minutos</h4>
                </div>
                <div className="col-md-2">
                </div>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                    <Button
                        text="8"
                        backgroundColor={selectedButtonHour === "8" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("8"); saveNumeroHora(8) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="9"
                        backgroundColor={selectedButtonHour === "9" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("9"); saveNumeroHora(9) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="10"
                        backgroundColor={selectedButtonHour === "10" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("10"); saveNumeroHora(10) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="11"
                        backgroundColor={selectedButtonHour === "11" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("11"); saveNumeroHora(11) }}
                    />
                </div>
                <div className="col-md-4">
                    <Button
                        text="00"
                        backgroundColor={selectedButtonMinutes === "0" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("0"); saveNumeroMinutos(0) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="05"
                        backgroundColor={selectedButtonMinutes === "5" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("5"); saveNumeroMinutos(5) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="10"
                        backgroundColor={selectedButtonMinutes === "10" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("10"); saveNumeroMinutos(10) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="15"
                        backgroundColor={selectedButtonMinutes === "15" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("15"); saveNumeroMinutos(15) }}
                    />

                </div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                    <Button
                        text="12"
                        backgroundColor={selectedButtonHour === "12" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("12"); saveNumeroHora(12) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="13"
                        backgroundColor={selectedButtonHour === "13" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("13"); saveNumeroHora(13) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="14"
                        backgroundColor={selectedButtonHour === "14" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("14"); saveNumeroHora(14) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="15"
                        backgroundColor={selectedButtonHour === "15" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("15"); saveNumeroHora(15) }}
                    />

                </div>
                <div className="col-md-4">
                    <Button
                        text="20"
                        backgroundColor={selectedButtonMinutes === "20" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("20"); saveNumeroMinutos(20) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="25"
                        backgroundColor={selectedButtonMinutes === "25" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("25"); saveNumeroMinutos(25) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="30"
                        backgroundColor={selectedButtonMinutes === "30" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("30"); saveNumeroMinutos(30) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="35"
                        backgroundColor={selectedButtonMinutes === "35" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("35"); saveNumeroMinutos(35) }}
                    />
                </div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                    <Button
                        text="16"
                        backgroundColor={selectedButtonHour === "16" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("16"); saveNumeroHora(16) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="17"
                        backgroundColor={selectedButtonHour === "17" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("17"); saveNumeroHora(17) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="18"
                        backgroundColor={selectedButtonHour === "18" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("18"); saveNumeroHora(18) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="19"
                        backgroundColor={selectedButtonHour === "19" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("19"); saveNumeroHora(19) }}
                    />
                </div>
                <div className="col-md-4">
                    <Button
                        text="40"
                        backgroundColor={selectedButtonMinutes === "40" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("40"); saveNumeroMinutos(40) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="45"
                        backgroundColor={selectedButtonMinutes === "45" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("45"); saveNumeroMinutos(45) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="50"
                        backgroundColor={selectedButtonMinutes === "50" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("50"); saveNumeroMinutos(50) }}
                    />
                    &nbsp;&nbsp;
                    <Button
                        text="55"
                        backgroundColor={selectedButtonMinutes === "5" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonMinutes("55"); saveNumeroMinutos(55) }}
                    />
                </div>
            </div>
            <p></p>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-2">
                    <Button
                        text="20"
                        backgroundColor={selectedButtonHour === "20" ? "gray" : "#f0f0f0"}
                        onClick={() => { setSelectedButtonHour("20"); saveNumeroHora(20) }}
                    />
                    &nbsp;&nbsp;
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