import React from "react";
import { NavLink } from "react-router-dom";

export default function UserNavbar() {
    return (
        <nav className="ml-auto">
            <NavLink class="nav-text" className={
                ({ isActivate }) => (isActivate ? "activado" : null)}
                to="/UserHome">UserHome</NavLink>
            <NavLink class="nav-text" className={({ isActivate }) => (isActivate ? "activado" : null)}
                to="/userAbout">UserAbout</NavLink>
        </nav>
    )
}