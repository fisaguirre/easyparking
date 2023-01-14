import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API_USER;

{/*export const Users = () => {*/ }
{/*export default function Users() {*/ }
const Users = () => {
    //Guardo los datos que se envian por handleSubmit al darle click al boton submit

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");

    const usernameInput = useRef(null);

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
                email,
                password,
            }),
        });
        await res.json();

        setUsername("");
        setEmail("");
        setPassword("");
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
                    <button className="btn btn-primary btn-block">Create

                    </button>
                </form>
            </div>

        </div>
    );
};

export default Users;
