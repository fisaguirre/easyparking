import './App.css';
import './myStyle.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Users from "./components/parking-control/Users";
import Navbar from "./pages/Navbar";
import Tarjeta from './components/parking-control/tarjetero/tarjeta/Tarjeta';
import DisenioTarjeta from './components/parking-control/tarjetero/tarjeta/DisenioTarjeta';
import TarjetaInstancia from './components/parking-control/tarjetero/tarjeta/TarjetaInstancia';
import TarjetaPendienteDePago from './components/parking-control/tarjetero/tarjeta/TarjetaPendienteDePago';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <div className="container p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/users" className="auto" element={<Users />} />
            <Route path="/tarjeta" className="auto" element={<Tarjeta />} />
            <Route path="/tarjeta/disenio" className="auto" element={<DisenioTarjeta />} />
            <Route path="/tarjeta_instancia/" className="auto" element={<TarjetaInstancia />} />
            <Route path="/tarjeta/tarjetaPendienteDePago" className="auto" element={<TarjetaPendienteDePago />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
