import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function Navbar() {

    return (
        <nav className="ml-auto">
            <NavLink class="nav-text" className={
                ({ isActivate }) => (isActivate ? "activado" : null)}
                to="/">Home</NavLink>
            <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                to="/login">Login</NavLink>
            <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                to="/signup">SignUp</NavLink>
        </nav>
    )
}

{/*
export const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/login">Login</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">SignUp</Link>
                </li>
            </ul>
        </div>
    </nav>
)
*/}