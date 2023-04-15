import React from "react";
import { Route, Routes, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "../page/Home";
import SignUp from "../page/SignUp";
import Login from "../page/Login";
import { useNavigate, Navigate } from 'react-router-dom';

import Users from "../components/parking-control/Users";
import ActivarTarjeta from "../components/parking-control/tarjeta/ActivarTarjeta";
import TarjetaInstancia from "../components/parking-control/tarjeta/TarjetaInstancia";
import TarjetaPendienteDePago from "../components/parking-control/tarjeta/TarjetaPendienteDePago";
import Estacionamiento from "../components/parking-location/Estacionamiento";
import PagoConfiguracion from "../components/payment/PagoConfiguracion";
import Logout from "../page/Logout";
import BackToHome from "../page/BackToHome";
export function MyRoutes() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [usuarioRol, setUsuarioRol] = useState();
  const getUserLogueado = async () => {
    const tokenGenerado = sessionStorage.getItem("token");
    const rolUsuario = sessionStorage.getItem("rol");
    if (tokenGenerado) {
      setUsuarioLogueado(true);
      setUsuarioRol(rolUsuario);
    }
  };

  useEffect(() => {
    getUserLogueado();
  }, []);
  return (
    <Routes>
      <Route path="/" forceRefresh={true} element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/*Condicionales que verifican si hay un user logueado y el tipo de rol. En el caso que cumplan cada una de las condiciones se les permitirà acceder a deteerminada secciòn a traves de la url, caso contrario se les redirige al home*/}

      {
        usuarioLogueado === true && usuarioRol === "admin" ? (
          <>
            <Route
              path="/signup"
              element={<SignUp />}
            />
            <Route path="/users" element={<Users />} />
            <Route path="/logout" element={<Logout />} />
          </>
        ) :
          <>
            <Route
              path="/*"
              element={<Navigate to="/" replace />}
            />

          </>
      }

      {
        usuarioLogueado === true && usuarioRol === "tarjetero" ? (
          <>
            <Route
              path="/estacionamiento/zonadetrabajo"
              className="auto"
              element={<Estacionamiento />}
            />
            <Route
              path="/tarjeta/activar"
              element={<ActivarTarjeta />}
            />
            <Route
              path="/tarjeta/instancia"
              className="auto"
              element={<TarjetaInstancia />}
            />
            <Route
              path="/tarjeta/pendienteDePago"
              className="auto"
              element={<TarjetaPendienteDePago />}
            />
            <Route
              path="/pago/configuracion"
              className="auto"
              element={<PagoConfiguracion />}
            />

            <Route path="/logout" element={<Logout />} />
          </>
        ) :
          <>
            <Route
              path="/*"
              element={<Navigate to="/" replace />}
            />

          </>
      }
      <Route path="*" element={<BackToHome />} />

    </Routes>
  )
  {/*
    <Routes>

      <Route path="/" forceRefresh={true} element={<Home />} />
      <Route path="/login" element={<Login />} />


      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<BackToHome />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/users" className="auto" element={<Users />} />

      <Route
        path="/estacionamiento/zonadetrabajo"
        className="auto"
        element={<Estacionamiento />}
      />
      <Route
        path="/tarjeta/activar"
        className="auto"
        element={<ActivarTarjeta />}
      />
      <Route
        path="/tarjeta/instancia"
        className="auto"
        element={<TarjetaInstancia />}
      />
      <Route
        path="/tarjeta/pendienteDePago"
        className="auto"
        element={<TarjetaPendienteDePago />}
      />
      <Route
        path="/pago/configuracion"
        className="auto"
        element={<PagoConfiguracion />}
      />
     
        <Route
          path="/pago/pagosefectuados"
          className="auto"
          element={<PagoEfectuado />}
        />
    </Routes>
  */}
}
