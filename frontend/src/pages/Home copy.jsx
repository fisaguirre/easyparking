import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Map } from "../components/parking-location/Map";

export default function Home() {
    const [modal, setModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);

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
        }
    }
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    useEffect(() => {
        getUserLogueado();
    }, []);

    const borrar = async () => {
        sessionStorage.clear()
    }

    return (
        <div>
            <button onClick={borrar} className="btn btn-primary btn-block">Clear session storage
            </button>
            <h1>
                Esto es el HOME
                <p></p>
                <p></p>
                Descomentar linea que muestra componente mapa cuando termine la aplicacion
                <p></p>
                <p></p>
                Esta comentada para no malgastar las request de google maps
            </h1>
            <div>
                {/*<Map />*/}
            </div>
            {/*<Map updateWorkZone={false} />*/}
        </div >
    )
}

{/*
export default function Home() {
    return (
        <BrowserRouter>
            <UserNavbar />
            <div className="container p-4">
                <Routes>
                    <Route path="/UserHome" element={<UserHome />} />
                    <Route path="/userAbout" element={<UserAbout />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
*/}