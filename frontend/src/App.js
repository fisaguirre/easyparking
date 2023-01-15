import './App.css';
import './myStyle.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Users from "./components/parking-control/Users";
import Navbar from "./pages/Navbar";
import Tarjeta from './components/parking-control/tarjetero/Tarjeta';
import DisenioTarjeta from './components/parking-control/tarjetero/DisenioTarjeta';
import TarjetaActivada from './components/parking-control/tarjetero/TarjetaActivada';

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
            <Route path="/tarjeta/activada" className="auto" element={<TarjetaActivada />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
