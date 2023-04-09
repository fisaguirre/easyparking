/*
import "./myStyle.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./page/Home";
import SignUp from "./page/SignUp";
import Login from "./page/Login";

import Users from "./components/parking-control/Users";
import Navbar from "./page/Navbar";
import Tarjeta from "./components/parking-control/tarjetero/tarjeta/Tarjeta";
import ActivarTarjeta from "./components/parking-control/tarjetero/tarjeta/ActivarTarjeta";
import TarjetaInstancia from "./components/parking-control/tarjetero/tarjeta/TarjetaInstancia";
import TarjetaPendienteDePago from "./components/parking-control/tarjetero/tarjeta/TarjetaPendienteDePago";
import Estacionamiento from "./components/parking-location/Estacionamiento";
import PagoConfiguracion from "./components/payment/PagoConfiguracion";
import PagoEfectuado from "./components/payment/PagoEfectuado";

function App() {
  const [userLogueado, setUserLogueado] = useState(true);

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
            <Route
              path="/tarjeta/activarTarjeta"
              className="auto"
              element={<ActivarTarjeta />}
            />
            <Route
              path="/tarjeta_instancia/"
              className="auto"
              element={<TarjetaInstancia />}
            />
            <Route
              path="/tarjeta/tarjetaPendienteDePago"
              className="auto"
              element={<TarjetaPendienteDePago />}
            />
            <Route
              path="/estacionamiento/"
              className="auto"
              element={<Estacionamiento />}
            />
            <Route
              path="/pago/"
              className="auto"
              element={<PagoConfiguracion />}
            />
            <Route
              path="/pago/pagosefectuados"
              className="auto"
              element={<PagoEfectuado />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
*/

/*
import "./index.css";
import { BrowserRouter, Route, Navigate } from "react-router-dom";
import { useState, React, createContext } from "react";
import { MyRoutes } from "./routers/MyRoutes";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import { Light, Dark } from "./styles/Themes";
import { ThemeProvider } from "styled-components";

//export const ThemeContext = React.createContext(null);
export const ThemeContext = createContext(null);

function App() {
  const [userLogueado, setUserLogueado] = useState(true);
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;
  const Cambiartheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };
  const [sidebarOpen, setSideBarOpen] = useState(false);

  return (
    <>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <BrowserRouter>
            <Container>
              <main
                className={sideBarOpen ? "sidebarState active" : "sidebarState"}
              >
                <Sidebar />
                <MyRoutes />
              </main>
            </Container>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
const Container = styled.div`
  .sidebarState {
    display: grid;
    grid-template-columns: 90px auto;
    back-ground: ${({ theme }) => theme.bgtotal};
    &.active {
      grid-template-columns: 300px auto;
    }
  }
`;

export default App;
*/

import "./App.css";
import Sidebar from "./components/Sidebar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./page/Home";
import SignUp from "./page/SignUp";
import Login from "./page/Login";

import Users from "./components/parking-control/Users";
import Tarjeta from "./components/parking-control/tarjetero/tarjeta/Tarjeta";
import ActivarTarjeta from "./components/parking-control/tarjetero/tarjeta/ActivarTarjeta";
import TarjetaInstancia from "./components/parking-control/tarjetero/tarjeta/TarjetaInstancia";
import TarjetaPendienteDePago from "./components/parking-control/tarjetero/tarjeta/TarjetaPendienteDePago";
import Estacionamiento from "./components/parking-location/Estacionamiento";
import PagoConfiguracion from "./components/payment/PagoConfiguracion";
import PagoEfectuado from "./components/payment/PagoEfectuado";
import Logout from "./page/Logout";
import MainDash from "./components/parking-control/tarjetero/tarjeta/Main/MainDash";
function App() {
  return (
    /*
      aca pongo el sidebar modo admin/tarjetero
      sino pongo la condicion if or not, dentro el sidebar y afuera las routes y asi no repito
      */
    /*
    <div className="App">
      <div className="AppGlass">
      */
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" forceRefresh={true} element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/main" element={<MainDash />} />
        <Route path="/users" className="auto" element={<Users />} />
        <Route
          path="/estacionamiento/zonadetrabajo"
          className="auto"
          element={<Estacionamiento />}
        />
        <Route path="/tarjeta" className="auto" element={<Tarjeta />} />
        <Route
          path="/tarjeta/activarTarjeta"
          className="auto"
          element={<ActivarTarjeta />}
        />
        <Route
          path="/tarjeta_instancia/"
          className="auto"
          element={<TarjetaInstancia />}
        />
        <Route
          path="/tarjeta/tarjetaPendienteDePago"
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
    </Router>
  );
}

export default App;
