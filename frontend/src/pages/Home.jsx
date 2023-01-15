import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

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