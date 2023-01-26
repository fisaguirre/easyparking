import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";

export default function Navbar() {
    const [usuarioLogueado, setUsuarioLogueado] = useState(false)
    const [usuarioRol, setUsuarioRol] = useState()
    const [token, setToken] = useState();
    const [usuaroId, setUsuarioId] = useState();

    const getUserLogueado = async () => {
        const tokenGenerado = sessionStorage.getItem("token")
        const rolUsuario = sessionStorage.getItem("rol")
        const usuario_id = sessionStorage.getItem("usuario_id")
        if (tokenGenerado) {
            setToken(tokenGenerado)
            setUsuarioLogueado(true)
            setUsuarioRol(rolUsuario)
            setUsuarioId(usuario_id)
            console.log("NavBar token: ", tokenGenerado)
            console.log("NavBar rol: ", rolUsuario)
            console.log("NavBar usuario_id: ", usuario_id)
        } else {
            console.log("no hay token navbar")
        }
    }


    useEffect(() => {
        getUserLogueado();
    }, []);
    /*
    useEffect(() => {
        getUserLogueado();
    }, [usuarioLogueado]);
*/


    return (
        <nav className="ml-auto">
            {/*------------------------User Logout------------------------*/}
            {usuarioLogueado == false ? (
                <>
                    {/*
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/auth/login">Login</NavLink>
            */}
                </>

            ) : null}


            {/*------------------------Navbar Tarjetero------------------------*/}
            {usuarioLogueado == true && usuarioRol == "tarjetero" ? (
                <>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/">Home</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/tarjeta">Tarjeta</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/estacionamiento">Estacionamiento</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/pago/">PagoConfiguracion</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/auth/logout">Logout</NavLink>
                </>

            ) : null}

            {/*------------------------Navbar Admin------------------------*/}
            {usuarioLogueado == true && usuarioRol == "administrador" ? (
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

            {/*------------------------Navbar Super Admin------------------------*/}
            {usuarioLogueado == true && usuarioRol == "superadministrador" ? (
                <>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/">Home</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/auth/signup">SignUp</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/users">Users</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/tarjeta">Tarjeta</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/estacionamiento">Estacionamiento</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/pago/">PagoConfiguracion</NavLink>
                    <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/auth/logout">Logout</NavLink>
                </>

            ) : null}
        </nav>
    )
}