import React from "react";
import UserNavbar from "../components/user-parking-control/UserNavbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UserHome from "../components/user-parking-control/UserHome";
import UserAbout from "../components/user-parking-control/UserAbout";

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