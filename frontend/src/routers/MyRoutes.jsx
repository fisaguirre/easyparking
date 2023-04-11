import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../page/Home";
import SignUp from "../page/SignUp";
import Login from "../page/Login";

import Users from "../components/parking-control/Users";
import ActivarTarjeta from "../components/parking-control/tarjeta/ActivarTarjeta";
import TarjetaInstancia from "../components/parking-control/tarjeta/TarjetaInstancia";
import TarjetaPendienteDePago from "../components/parking-control/tarjeta/TarjetaPendienteDePago";
import Estacionamiento from "../components/parking-location/Estacionamiento";
import PagoConfiguracion from "../components/payment/PagoConfiguracion";
import Logout from "../page/Logout";
export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" forceRefresh={true} element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
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
      {/*
        <Route
          path="/pago/pagosefectuados"
          className="auto"
          element={<PagoEfectuado />}
        />
  */}
    </Routes>
  );
}
