import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Map } from "../components/parking-location/Map";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_CONTROL_PARKING = process.env.REACT_APP_API_USER;

export default function Home() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [username, setUserName] = useState();

  //const [usuarioRol, setUsuarioRol] = useState()
  const [token, setToken] = useState();
  //const [usuaroId, setUsuarioId] = useState();
  let navigate = useNavigate();

  const getUserLogueado = async () => {
    const tokenGenerado = sessionStorage.getItem("token");
    //const rolUsuario = sessionStorage.getItem("rol")
    //const usuario_id = sessionStorage.getItem("usuario_id")
    if (tokenGenerado) {
      setToken(tokenGenerado)
      setUsuarioLogueado(true);
      setUserName(sessionStorage.getItem("username"));
      //setUsuarioRol(rolUsuario)
      //setUsuarioId(usuario_id)

    }
  };
  /*
    //Funciòn que verifica si el token ha expirado o no
    const verificarSesionExpirada = async () => {
  
      if (!token) {
        console.log("no hay token")
        return true; // Si no hay un token almacenado, entonces se considera como expirado
      }
  
      const tokenData = JSON.parse(atob(token.split('.')[1])); // Decodifica el token para obtener la fecha de expiración
      const expirationDate = new Date(tokenData.exp * 1000); // Crea una instancia de Date a partir de la fecha de expiración del token
      const currentDate = new Date(); // Crea una instancia de Date con la fecha actual
      console.log(currentDate);
      console.log(expirationDate)
      console.log(currentDate > expirationDate);
      return currentDate > expirationDate; // Compara la fecha actual con la fecha de expiración del token
    }
  */
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
      {/*
      <Map updateWorkZone={false} />
          */}
    </div>
  );
}
