import React from "react";
import UserNavbar from "../components/parking-control/UserNavbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UserHome from "../components/parking-control/UserHome";
import UserAbout from "../components/parking-control/UserAbout";

export default function Home() {
    return (
        <div>Esto es el HOME</div>
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