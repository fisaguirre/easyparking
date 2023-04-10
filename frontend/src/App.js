import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import SignUp from "./page/SignUp";
import Login from "./page/Login";

import Users from "./components/parking-control/Users";
import ActivarTarjeta from "./components/parking-control/tarjetero/tarjeta/ActivarTarjeta";
import TarjetaInstancia from "./components/parking-control/tarjetero/tarjeta/TarjetaInstancia";
import TarjetaPendienteDePago from "./components/parking-control/tarjetero/tarjeta/TarjetaPendienteDePago";
import Estacionamiento from "./components/parking-location/Estacionamiento";
import PagoConfiguracion from "./components/payment/PagoConfiguracion";
import Logout from "./page/Logout";
import { MyRoutes } from "./routers/MyRoutes";
function App() {
  return (
    /*
      aca pongo el sidebar modo admin/tarjetero
      sino pongo la condicion if or not, dentro el sidebar y afuera las routes y asi no repito
      */
    <div className="MainApp">
      <Router>
        <Sidebar />
        <MyRoutes />
      </Router>
    </div>
  );
}

export default App;
