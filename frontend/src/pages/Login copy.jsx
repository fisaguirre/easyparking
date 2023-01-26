import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
const API_CONTROL_PARKING = process.env.REACT_APP_API_USER;

{/*export = exporta el componente para llarmalo en otro script*/ }
{/*function = const - puedo usar cualquiera de los 2 para el componente*/ }
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const login = () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "nombre": "asd"
            }),
        }
        fetch(`${API_CONTROL_PARKING}/auth/login`, options).then(resp => {
            console.log(resp)
            if (resp.status === 200) {
                console.log("asda")
                return resp.json();
            } else {
                alert("Algun error");
            }
        }).then().catch(error => {
            console.error("Hubo un problema: ", error)
        })

    }
    /*
 
    const login = () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
        }
        fetch(`${API_CONTROL_PARKING}/auth/login`, options).then(resp => {
            console.log(resp)
            if (resp.status === 200) {
                console.log("asda")
                return resp.json();
            } else {
                alert("Algun error");
            }
        }).then().catch(error => {
            console.error("Hubo un problema: ", error)
        })
 
    }
    */

    return (
        <div id="form-text" className="row">
            <div className="col-md-4">
            </div>
            <div className="col-md-4">
                <form className="card card-body">
                    <div className="form-group">Email
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            placeholder="User's Email"
                            required
                        />
                    </div>
                    <div className="form-group">NOmbre
                        <input
                            type="password"
                            onChange={(e) => setNombre(e.target.value)}
                            value={nombre}
                            className="form-control"
                            placeholder="User's Password"
                            required
                        />
                    </div>
                    <div className="form-group">Contraseña
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="form-control"
                            placeholder="User's Password"
                            required
                        />
                    </div>
                    <button className="btn btn-primary btn-block" onClick={(e) => login()}>Iniciar sesion
                    </button>
                </form>
            </div>
            <div className="col-md-4"></div>
        </div>
    );
};