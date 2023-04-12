import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { toast } from 'react-toastify';
import { propertyA } from "../components/messages/Messages";
import 'react-toastify/dist/ReactToastify.css';
import "../components/messages/MessageStyles.css";
const API_CONTROL_PARKING = process.env.REACT_APP_API_USER;
const API_LOCATION = process.env.REACT_APP_API_LOCATION;
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;

const SignUp = () => {
    //Guardo los datos que se envian por handleSubmit al darle click al boton submit

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dni, setDni] = useState("");
    const [rol, setRol] = useState('');

    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");

    const usernameInput = useRef(null);
    const lastNameInput = useRef(null);
    const nameInput = useRef(null);

    let [users, setUsers] = useState([]);
    const token = sessionStorage.getItem("token")

    //Se coloca el mètodo como async para que no se quede colgado el navegador
    const handleSubmit = async (e) => {
        e.preventDefault();


        const res = await fetch(`${API_CONTROL_PARKING}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                username,
                name,
                lastname,
                email,
                password,
                dni,
                rol
            }),
        });
        const response = await res.json();

        usernameInput.current.focus();
        if (response[1]["code"] == 201) {
            const uuid = response[2]["uuid"]
            if (uuid) {
                const res2 = await fetch(`${API_PAYMENT}/auth/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": token
                    },
                    body: JSON.stringify({
                        uuid,
                        username,
                        name,
                        lastname,
                        email,
                        password,
                        dni,
                        rol
                    }),
                });

                const response2 = await res2.json();

                const res3 = await fetch(`${API_LOCATION}/auth/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": token
                    },
                    body: JSON.stringify({
                        uuid,
                        username,
                        name,
                        lastname,
                        email,
                        password,
                        dni,
                        rol
                    }),
                });
                const response3 = await res3.json();
                toast.success(response3[0]['message'], propertyA);
                //window.confirm(response3[0]['message'])

            }
        }
        else {
            toast.error(response[0]['message'], propertyA);
            //window.confirm(response[0]['message']);
        }
    };

    //La funciòn useEffect() sirve para llamar/ hacer algo luego de que el componente de React ya haya sido llamado
    /*
        useEffect(() => {
            getUsers();
        }, []);
    */

    return (
        <div id="form-text" className="row">
            <div className="col-md-4">

            </div>
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">Usuario
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="form-control"
                            placeholder="Usuario"
                            ref={usernameInput}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-group">Nombre
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Nombre"
                            ref={nameInput}
                        />
                    </div>
                    <div className="form-group">Apellido
                        <input
                            type="text"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastname}
                            className="form-control"
                            placeholder="Apellido"
                            ref={lastNameInput}
                        />
                    </div>
                    <div className="form-group">Email
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">Contraseña
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="form-control"
                            placeholder="Contraseña"
                        />
                    </div>
                    <div className="form-group">DNI
                        <input
                            type="text"
                            onChange={(e) => setDni(e.target.value)}
                            value={dni}
                            className="form-control"
                            placeholder="DNI"
                        />
                    </div>
                    <p></p>
                    <div className="form-group">
                        <label>Rol </label>
                        <select value={rol} onChange={(e) => setRol(e.target.value)}>
                            <option value="sin asignar">Sin asignar</option>
                            <option value="tarjetero">Tarjetero</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <p>
                    </p>
                    <button className="btn btn-primary btn-block">Sign Up
                    </button>
                </form>
            </div>
            <div className="col-md-4"></div>
        </div>
    );
};

export default SignUp;
