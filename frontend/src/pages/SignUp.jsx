import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const API = process.env.REACT_APP_API_USER;

const SignUp = () => {
    //Guardo los datos que se envian por handleSubmit al darle click al boton submit

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState('');

    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");

    const usernameInput = useRef(null);
    const lastNameInput = useRef(null);
    const nameInput = useRef(null);

    let [users, setUsers] = useState([]);

    //Se coloca el mètodo como async para que no se quede colgado el navegador
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                name,
                lastname,
                email,
                password,
                rol
            }),
        });
        await res.json();

        setUsername("");
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRol("");
        usernameInput.current.focus();
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
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="form-control"
                            placeholder="Username"
                            ref={usernameInput}
                            autoFocus
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="name"
                            ref={nameInput}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastname}
                            className="form-control"
                            placeholder="lastname"
                            ref={lastNameInput}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            placeholder="User's Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="form-control"
                            placeholder="User's Password"
                        />
                    </div>
                    <p></p>
                    <div className="form-group">
                        <label>Rol </label>
                        <select value={rol} onChange={(e) => setRol(e.target.value)}>
                            <option value="">--Choose a rol--</option>
                            <option value="sin asignar">Sin asignar</option>
                            <option value="tarjetero">Tarjetero</option>
                            <option value="administrador">Administrador</option>
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
