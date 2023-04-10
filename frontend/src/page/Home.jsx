import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Map } from "../components/parking-location/Map";
import { Link } from "react-router-dom";
import "../components/parking-control/tarjetero/tarjeta/MainDash.css";
const API_CONTROL_PARKING = process.env.REACT_APP_API_USER;

export default function Home() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [username, setUserName] = useState();

  //const [usuarioRol, setUsuarioRol] = useState()
  //const [token, setToken] = useState();
  //const [usuaroId, setUsuarioId] = useState();

  const getUserLogueado = async () => {
    const tokenGenerado = sessionStorage.getItem("token");
    //const rolUsuario = sessionStorage.getItem("rol")
    //const usuario_id = sessionStorage.getItem("usuario_id")
    if (tokenGenerado) {
      //setToken(tokenGenerado)
      setUsuarioLogueado(true);
      setUserName(sessionStorage.getItem("username"));
      //setUsuarioRol(rolUsuario)
      //setUsuarioId(usuario_id)
    }
  };

  useEffect(() => {
    getUserLogueado();
  }, []);

  const borrar = async () => {
    sessionStorage.clear();
  };

  return (
    <div>
      {/*
      {usuarioLogueado === false ? (
        <>
          <Link id="signup-link" to="/login">
            <button
              type="button"
              id="signup-button"
              className="btn btn-primary btn-block"
            >
              Login
            </button>
          </Link>
        </>
      ) : null}
      */}
      {/*<Map />*/}
      {/*El paramaetro "false" es para indicar si es el usuario tarjetero el que esta guardando su zona de trabajo
            o es la secciòn del mapa que muestra todas las zonas del trabajo en el home (caso que sea true)*/}

      <Map updateWorkZone={false} />
    </div>
  );
}
