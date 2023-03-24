import './App.css';
import './myStyle.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from 'react';
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Users from "./components/parking-control/Users";
import Navbar from "./pages/Navbar";
import Tarjeta from './components/parking-control/tarjetero/tarjeta/Tarjeta';
import ActivarTarjeta from './components/parking-control/tarjetero/tarjeta/ActivarTarjeta';
import TarjetaInstancia from './components/parking-control/tarjetero/tarjeta/TarjetaInstancia';
import TarjetaPendienteDePago from './components/parking-control/tarjetero/tarjeta/TarjetaPendienteDePago';
import Estacionamiento from './components/parking-location/Estacionamiento';
import PagoConfiguracion from './components/payment/PagoConfiguracion';
import PagoEfectuado from './components/payment/PagoEfectuado';

function App() {
  const [userLogueado, setUserLogueado] = useState(true)

  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <div className="container p-4">
          <Routes>
            <Route path="/a" element={<Navbar />} />
            <Route path="/" forceRefresh={true} element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/users" className="auto" element={<Users />} />
            <Route path="/tarjeta" className="auto" element={<Tarjeta />} />
            <Route path="/tarjeta/activarTarjeta" className="auto" element={<ActivarTarjeta />} />
            <Route path="/tarjeta_instancia/" className="auto" element={<TarjetaInstancia />} />
            <Route path="/tarjeta/tarjetaPendienteDePago" className="auto" element={<TarjetaPendienteDePago />} />
            <Route path="/estacionamiento/" className="auto" element={<Estacionamiento />} />
            <Route path="/pago/" className="auto" element={<PagoConfiguracion />} />
            <Route path="/pago/pagosefectuados" className="auto" element={<PagoEfectuado />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
