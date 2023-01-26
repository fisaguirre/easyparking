import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const API_CONTROL_PARKING = process.env.REACT_APP_API_USER;
const API_LOCATION = process.env.REACT_APP_API_LOCATION;
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;

const LoginCopy = () => {
    //Guardo los datos que se envian por handleSubmit al darle click al boton submit
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [rolUsuarioLogueado, setRolUsuarioLogueado] = useState();
    const [idUsuarioLogueado, setIdUsuarioLogueado] = useState();

    //Se coloca el mètodo como async para que no se quede colgado el navegador
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API_CONTROL_PARKING}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        });
        const response = await res.json();
        if (response['token']) {
            sessionStorage.setItem("token", response['token'])
            const res2 = await fetch(`${API_CONTROL_PARKING}/users/${email}`);
            const userRolId = await res2.json();
            if (userRolId) {
                sessionStorage.setItem("rol", userRolId['rol'])
                sessionStorage.setItem("usuario_id", userRolId['usuario_id'])
                if (sessionStorage.getItem("usuario_id")) {
                    navigate('/');
                    navigate(0);

                }


            }
        }
    }

    return (
        <div id="form-text" className="row">
            <div className="col-md-4">
            </div>
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">


                    <div className="form-group">Email
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            placeholder="User's Email"
                        />
                    </div>
                    <div className="form-group">Contraseña
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="form-control"
                            placeholder="User's Password"
                        />
                    </div>

                    <button className="btn btn-primary btn-block">Login
                    </button>
                </form>
            </div>
            <div className="col-md-4"></div>
        </div>
    );
};

export default LoginCopy;
