import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Map } from "../components/parking-location/Map";

export default function Home() {

    return (
        <div>

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