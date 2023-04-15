import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Map } from "../components/parking-location/Map";
import { Link, useNavigate } from "react-router-dom";

export default function BackToHome() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [username, setUserName] = useState();
  const navigate = useNavigate();

  //const [usuarioRol, setUsuarioRol] = useState()
  const [token, setToken] = useState();
  //const [usuaroId, setUsuarioId] = useState();

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
  const backToHome = () => {
    if (usuarioLogueado === false) {
      navigate("/");
    }
  }


  useEffect(() => {
    getUserLogueado();
    backToHome();
  }, []);



  return (
    <div>


    </div>
  );
}
