import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Map } from "./Map";
import "../parking-control/tarjeta/styles/Cards.css";
import "./styles/estacionamiento.css";
import { toast } from 'react-toastify';
import { propertyA } from "../messages/Messages";
import 'react-toastify/dist/ReactToastify.css';
import "../messages/MessageStyles.css";
const API = process.env.REACT_APP_API_USER;
const API_LOCATION = process.env.REACT_APP_API_LOCATION;

const Counter = ({ cantidadDisponibles, increment, decrement }) => {
  return (
    <div className="containerCounter">
      <button onClick={decrement} className="counterButton buttonMinus">-</button>
      <p>{cantidadDisponibles} </p>
      <button onClick={increment} className="counterButton buttonPlus">+</button>
    </div>

  );
};

export default function Estacionamiento() {
  const [mostrarMapa, setMostrarMapa] = useState();
  const [cantidadLugares, setCantidadLugares] = useState("");
  const [cantidadDisponibles, setCantidadDisponibles] = useState(0);
  let [lugares, setLugares] = useState([]);
  const usuario_id = sessionStorage.getItem("usuario_id");
  const token = sessionStorage.getItem("token");

  const getPlaces = async () => {
    const res = await fetch(`${API_LOCATION}/estacionamiento/${usuario_id}`, {
      mmethod: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    const data = await res.json();
    setCantidadDisponibles(data["cantidad_disponible"]);
    setCantidadLugares(data["cantidad_lugares"]);
  };

  const actualizarCantidadLugares = async () => {
    const tipo_update = "actualizar_lugares";

    const res = await fetch(
      `${API_LOCATION}/estacionamiento/${tipo_update}/${usuario_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          cantidadLugares,
        }),
      }
    );
    const resp = await res.json();
    if (resp && resp[1]["code"] == 201) {
      //window.confirm(resp[0]["message"]);
      toast.success(resp[0]["message"], propertyA);
    } else {
      toast.error("No se pudieron actualizar los lugares", propertyA);
    }
    console.log(resp);
  };

  const increment = () => {
    setCantidadDisponibles(cantidadDisponibles + 1);
  };

  const decrement = () => {
    if (cantidadDisponibles === 0) {
      return;
    }
    setCantidadDisponibles(cantidadDisponibles - 1);
  };

  const actualizarLugaresDisponibles = async () => {
    const tipo_update = "actualizar_disponibles";

    const res = await fetch(
      `${API_LOCATION}/estacionamiento/${tipo_update}/${usuario_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          cantidadDisponibles,
        }),
      }
    );
    const resp = await res.json();
    if (resp && resp[1]["code"] == 201) {
      //window.confirm(resp[0]["message"]);
      toast.success(resp[0]["message"], propertyA);

    } else {
      toast.error("No se pudo actualizar los lugares", propertyA);
      //window.confirm("No se pudo actualizar los lugares");
    }
    console.log(resp);
  };

  const actualizarZonaTrabajo = async () => {
    const tipo_update = "actualizar_zona";

    const res = await fetch(
      `${API_LOCATION}/estacionamiento/${tipo_update}/${usuario_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          cantidadLugares,
        }),
      }
    );
  };
  useEffect(() => {
    getPlaces();
  }, []);

  const showMaps = async (valor) => {
    setMostrarMapa(valor);
  };

  return (
    <div>
      <div id="form-text" className="row">
        <div>{/*<Map />*/}</div>
        <p></p>
        <div className="col-md-4">
          Configurar cantidad lugares estacionamiento
          <input
            type="text"
            onChange={(e) => setCantidadLugares(e.target.value)}
            value={cantidadLugares}
            className="form-control"
            placeholder={cantidadLugares}
          />
        </div>
        <div className="col-md-4">
          <button
            type="button"
            className="buttonsSucces"
            onClick={(e) => actualizarCantidadLugares()}
          >
            Actualizar
          </button>
        </div>
        <p></p>
      </div>
      Configurar lugares disponibles

      <div className="row">
        <div>
          <Counter
            cantidadDisponibles={cantidadDisponibles}
            increment={increment}
            decrement={decrement}
          />
        </div>
      </div>
      <p></p>
      <div className="row">
        <div className="col-md2">
          <button
            type="button"
            className="buttonsSucces"
            onClick={(e) => actualizarLugaresDisponibles()}
          >
            Actualizar
          </button>
        </div>
      </div>
      <p></p>
      <p></p>
      <div className="row">
        <h2>Asignar zona de trabajo</h2>
        {/*
        <div className="col-md-2">
          <button type="button" className="btn btn-info" onClick={(e) => showMaps(true)}>
            Mostrar mapa
          </button>
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-info" onClick={(e) => showMaps(false)}>
            Ocultar mapa
          </button>
        </div>
  */}
        {/*
   <div className="containerCounter">
      <button onClick={decrement} className="counterButton buttonMinus">-</button>
      <p>{cantidadDisponibles} </p>
      <button onClick={increment} className="counterButton buttonPlus">+</button>
    </div>
*/}
        <div className="containerWorkZone">
          <button type="button" id="buttonMostrarMapa" className="btn btn-info" onClick={(e) => showMaps(true)}>
            Mostrar mapa
          </button>
          <button type="button" id="buttonOcultarMapa" className="btn btn-info" onClick={(e) => showMaps(false)}>
            Ocultar mapa
          </button>
        </div>

        {mostrarMapa ? (
          <>
            <div>
              {/*El paramaetro "false" es para indicar si es el usuario tarjetero el que esta guardando su zona de trabajo o es la secciòn del mapa que muestra todas las zonas del trabajo en el home (caso que sea true)*/}
              <Map updateWorkZone={true} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
