import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useState } from "react";

export default function Navbar() {
    const [usuario, setUsuario] = useState(false)
    const [usuarioLogueado, setUsuarioLogueado] = useState(false)
    const [usuarioTipo, setUsuarioTipo] = useState("superadministrador")
    //const [usuarioTipo, setUsuarioTipo] = useState("administrador")
    //const [usuarioTipo, setUsuarioTipo] = useState("superadministrador")

    return (
        <nav className="ml-auto">
            {usuarioLogueado == false ? (
                <>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/auth/login">Login</NavLink>
                </>

            ) : null}


            {/*NavBar Tarjetero*/}
            {usuarioLogueado == true && usuarioTipo == "tarjetero" ? (
                <>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/">Home</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/tarjeta">Tarjeta</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/estacionamiento">Estacionamiento</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/auth/logout">Logout</NavLink>
                </>

            ) : null}

            {/*NavBar Admin*/}
            {usuarioLogueado == true && usuarioTipo == "administrador" ? (
                <>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/">Home</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/auth/signup">SignUp</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/users">Users</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/auth/logout">Logout</NavLink>
                </>

            ) : null}

            {/*NavBar Super Admin*/}
            {usuarioLogueado == true && usuarioTipo == "superadministrador" ? (
                <>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/">Home</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/auth/login">Login</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/auth/signup">SignUp</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/users">Users</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/tarjeta">Tarjeta</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/estacionamiento">Estacionamiento</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/auth/logout">Logout</NavLink>
                </>

            ) : null}
        </nav>
    )
}



{/*

export default function Navbar() {
    const [usuario, setUsuario] = useState(false)
    const [usuarioTipo, setUsuarioTipo] = useState("tarjetero")

    return (
        <nav className="ml-auto">
            {usuario ? (
                <NavLink class="nav-text" className={
                    ({ isActivate }) => (isActivate ? "activado" : null)}
                    to="/">Home</NavLink>
            ) : null}

            <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                to="/auth/login">Login</NavLink>
            <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                to="/auth/signup">SignUp</NavLink>
            <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                to="/users">Users</NavLink>
            <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                to="/tarjeta">Tarjeta</NavLink>
            <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                to="/tarjetero/UserAbout">UserAbout</NavLink>
            <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                to="/estacionamiento">Estacionamiento</NavLink>
        </nav>
    )
}
*/}
