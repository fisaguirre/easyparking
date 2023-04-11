import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  InstanciarTarjeta,
  PruebaRetornoFunction,
} from "./service/TarjetaService";

const API = process.env.REACT_APP_API_USER;

export default function ActivarTarjeta() {
  let [amountCards, setAmountCards] = useState([]);
  const usuario_id_logueado = sessionStorage.getItem("usuario_id");
  let token = sessionStorage.getItem("token");

  const [numeroPatenteFirstColumn, setNumeroPatenteFirstColumn] = useState();
  const [numeroPatenteSecondColumn, setNumeroPatenteSecondColumn] = useState();
  const [nombreMes, setNombreMes] = useState();
  const [nombreDia, setNombreDia] = useState();
  const [numeroDia, setNumeroDia] = useState();
  const [numeroHora, setNumeroHora] = useState();
  const [numeroMinutos, setNumeroMinutos] = useState();
  const [activarTarjeta, setButtonActivarTarjeta] = useState();

  const [selectedRadioPatente, setSelectedRadioPatente] = useState(null);
  const [textBoxPatenteValue, setTextBoxPatenteValue] = useState(null);


  const buttonActivarTarjeta = (buttonValue) => {
    setButtonActivarTarjeta(buttonValue);
  };

  const getAmountCards = async () => {
    const res = await fetch(`${API}/tarjetas/${usuario_id_logueado}`, {
      mmethod: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    const data = await res.json();

    setAmountCards(data);
  };
  const elegirRadioPatenteButton = (event) => {
    setSelectedRadioPatente(event.target.value);
    setTextBoxPatenteValue(null);
  };

  const separarPatentePorGuion = (event) => {
    if (selectedRadioPatente == "option1") {
      // Eliminar los guiones de la cadena de texto ingresada por el usuario
      const inputValue = event.target.value.replace(/-/g, "");
      // Dividir la cadena en partes de cuatro dígitos
      const parts = inputValue.match(/.{1,3}/g);
      // Unir las partes con guiones nuevamente
      const newValue = parts ? parts.join("-") : "";
      // Actualizar el estado del componente
      setTextBoxPatenteValue(newValue.toUpperCase());
    }
    if (selectedRadioPatente == "option2") {
      const inputValue = event.target.value;
      if (inputValue.length === 2 || inputValue.length === 6) {
        setTextBoxPatenteValue(`${inputValue}-`.toUpperCase());
      } else {
        setTextBoxPatenteValue(inputValue.toUpperCase());
      }
    }
  };

  const generarFechaActual = () => {
    const date = new Date();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const tiempoObject = {};
    tiempoObject["year"] = date.getFullYear();
    tiempoObject["month"] = months[date.getMonth()];
    tiempoObject["dayOfWeek"] = days[date.getDay()];
    tiempoObject["dayOfMonth"] = date.getDate();
    tiempoObject["hour"] = date.getHours();
    tiempoObject["minute"] = date.getMinutes() + 1;
    return tiempoObject;
  }
  //Activar una nueva tarjeta
  const createCard = async (
    patente,
    usuario_id_logueado,
    amountCards
  ) => {
    if (
      patente == null
    ) {
      const rechazarTarjeta = window.confirm(
        "Debe seleccionar todos los campos para activar una tarjeta"
      );
    } else if (amountCards.cantidad_tarjeta <= 0) {
      const rechazarTarjeta = window.confirm(
        "No posee tarjetas disponibles en su cuenta"
      );
    } else {
      const tiempoObject = generarFechaActual();
      const usuario_id = usuario_id_logueado;
      const mes = tiempoObject["month"];
      const dia_semana = tiempoObject["dayOfWeek"];
      const dia_fecha = tiempoObject["dayOfMonth"];
      const hora = tiempoObject["hour"];
      const minutos = tiempoObject["minute"];
      const res = await fetch(`${API}/tarjeta_instancia/activar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          mes,
          dia_semana,
          dia_fecha,
          hora,
          minutos,
          patente,
          usuario_id,
        }),
      });
      await getAmountCards();
      const tarjetasDisponibles = amountCards.cantidad_tarjeta - 1;
      const tarjetaCreada = window.confirm(
        "Se activo la tarjeta, quedan disponibles en su cuenta: " +
        " " +
        tarjetasDisponibles
      );
    }
  };

  useEffect(() => {
    getAmountCards();
  }, []);

  return (
    <div>
      <br></br>
      <div className="row">
        <h5>Tarjetas disponibles: {amountCards.cantidad_tarjeta}</h5>
      </div>
      <br></br>
      <div className="row">
        <p style={{ fontWeight: 'bold', fontSize: '35px', marginLeft: '0.3rem' }}>Elija una patente: </p>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ fontSize: '25px' }}>
            <input
              type="radio"
              value="option1"
              checked={selectedRadioPatente === "option1"}
              onChange={elegirRadioPatenteButton}
              style={{ width: '20px', height: '20px', fontSize: '18px' }}
            />
            1994
          </label>
          {selectedRadioPatente === "option1" ? (
            <div>
              <label>
                <input type="text" value={textBoxPatenteValue} onChange={separarPatentePorGuion} maxLength={7}
                  placeholder="XXX-XXX" style={{ fontSize: '30px', width: '12rem', marginLeft: '2rem' }} />
              </label>
            </div>
          ) : null}
        </div>

        <br></br>
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <label style={{ fontSize: '25px' }}>
            <input
              type="radio"
              value="option2"
              checked={selectedRadioPatente === "option2"}
              onChange={elegirRadioPatenteButton}
              style={{ width: '20px', height: '20px', fontSize: '18px' }}

            />
            2015
          </label>

          {selectedRadioPatente === "option2" ? (
            <div>
              <label>
                {/* <label htmlFor="customTextBox">Ingrese el valor:</label>*/}
                <input type="text" id="customTextBox" value={textBoxPatenteValue} onChange={separarPatentePorGuion} maxLength={9} placeholder="XX-XXX-XX" style={{ fontSize: '30px', width: '12rem', marginLeft: '2rem' }} />
              </label>
            </div>
          ) : null}
        </div>
      </div>
      <br></br>
      <p style={{ fontWeight: 'bold', fontSize: '20px', marginLeft: '0.5rem' }}>
        Mes-dia-hora-minutos se generaràn automáticamente por la aplicación.
      </p>
      <div>
        <button
          type="button"
          id="signup-button"
          className="btn btn-info"
          onClick={(e) =>
            createCard(
              textBoxPatenteValue,
              usuario_id_logueado,
              amountCards
            )
          }
        >
          Crear tarjeta
        </button>
      </div>
      <div>
        <p></p>
        <Link id="signup-link" to="/tarjeta/instancia">
          <button
            type="button"
            id="signup-button"
            className="btn btn-primary btn-block"
          >
            Mis tarjetas activas
          </button>
        </Link>
      </div>

    </div>
  );
}
