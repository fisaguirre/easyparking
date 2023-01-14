import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="ml-auto">
            <NavLink className={
                ({ isActivate }) => (isActivate ? "activado" : null)}
                to="/">Home</NavLink>
            <NavLink className={({ isActivate }) => (isActivate ? "activado" : null)}
                to="/login">Login</NavLink>
            <NavLink className={({ isActivate }) => (isActivate ? "activado" : null)}
                to="/signup">SignUp</NavLink>
        </nav>
    )
}
