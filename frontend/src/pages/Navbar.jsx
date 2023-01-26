import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const [usuarioLogueado, setUsuarioLogueado] = useState(false)
    const [usuarioRol, setUsuarioRol] = useState()
    const [token, setToken] = useState();
    const [usuaroId, setUsuarioId] = useState();
    let navigate = useNavigate();

    const getUserLogueado = async () => {
        const tokenGenerado = sessionStorage.getItem("token")
        const rolUsuario = sessionStorage.getItem("rol")
        const usuario_id = sessionStorage.getItem("usuario_id")
        if (tokenGenerado) {
            setToken(tokenGenerado)
            setUsuarioLogueado(true)
            setUsuarioRol(rolUsuario)
            setUsuarioId(usuario_id)
        } else {
        }
    }


    const borrar = async () => {
        sessionStorage.clear();
        navigate('/');
        navigate(0);
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
                    <NavLink onClick={borrar} class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/">Logout</NavLink>
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
                    <NavLink onClick={borrar} class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/">Logout</NavLink>
                </>

            ) : null}

            {/*------------------------Navbar Super Admin------------------------*/}
            {usuarioLogueado == true && usuarioRol == "superadmin" ? (
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
                    <NavLink onClick={borrar} class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                        to="/">Logout</NavLink>
                </>

            ) : null}
        </nav>
    )
}