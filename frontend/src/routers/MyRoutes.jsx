import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../page/Home";
import SignUp from "../page/SignUp";
import Login from "../page/Login";
import Sidebar from "../components/Sidebar";
export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
