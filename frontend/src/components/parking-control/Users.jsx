import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const API = process.env.REACT_APP_API_USER;

const Users = () => {
    //Guardo los datos que se envian por handleSubmit al darle click al boton submit
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userId, setUserId] = useState("");
    const [cardsQuantity, setCardsQuantity] = useState("")
    const [rol, setRol] = useState();
    const [cambiarRol, setCambiarRol] = useState(false)
    const [numeroTD, setNumeroTD] = useState()

    const nameInput = useRef(null);

    let [users, setUsers] = useState([]);

    const cambiarRolUsuario = (cambiarRol) => {
        if (cambiarRol) {
            setCambiarRol(false)
        } else {
            setCambiarRol(true)
        }
    }

    const getUsers = async () => {
        //const res = await fetch(`${API}/users`);
        const res = await fetch(`${API}/users/tarjeta`);
        const data = await res.json();
        setUsers(data);
    };

    const addCardsToUser = async (userId) => {

        const res = await fetch(`${API}/tarjeta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                cardsQuantity
            }),
        });
        const data = await res.json();
        console.log(data)
        await getUsers();

    };
    //La funciòn useEffect() sirve para llamar/ hacer algo luego de que el componente de React ya haya sido llamado

    const discardCardsToUser = async (userId) => {
        const userResponse = window.confirm("¿Seguro que quiere descartar las tarjetas?");
        if (userResponse) {
            const res = await fetch(`${API}/tarjeta/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cardsQuantity
                }),
            });
            const data = await res.json()
            await getUsers();
            console.log(data)
        }

    };
    useEffect(() => {
        getUsers();
    }, []);

    return (

        <div id="form-text" className="row">
            <h1>This is admin mode</h1>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Cards</th>
                            <th>Acreditar/Desacreditar Tarjetas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.usuario_id}>
                                <td>{user.usuario_id}</td>
                                <td>{user.username}</td>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.email}</td>

                                {/*
                                <td>
                                    {cambiarRol ? (
                                        <>
                                            <select value={user.rol} onChange={(e) => setRol(e.target.value)}>
                                                <option value="sin asignar">Sin asignar</option>
                                                <option value="tarjetero">Tarjetero</option>
                                                <option value="administrador">Administrador</option>
                                                <option value="superadmin">Super Admin</option>
                                            </select>
                                        </>
                                    ) :
                                        <>
                                            {user.rol}
                                            &nbsp;<button type="button" onClick={(e) => cambiarRolUsuario(false)}>E</button>
                                        </>
                                    }

                                </td>
                                */}
                                <td>{user.rol}</td>
                                <td>{user.cantidad_tarjeta}</td>
                                <td>
                                    <input type="text"
                                        onChange={(e) => setCardsQuantity(e.target.value)}
                                        className="form-control"
                                        placeholder="Ingrese cantidad de tarjetas" />
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-block"
                                        onClick={(e) => addCardsToUser(user.usuario_id)}
                                    >Acreditar
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-block"
                                        onClick={(e) => discardCardsToUser(user.usuario_id)}
                                    >Desacreditar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <p></p>
                    <div>
                        <Link id="signup-link" to="/auth/signup">
                            <button type="button" id="signup-button" className="btn btn-info">Registrar nuevo usuario</button>
                        </Link>
                    </div>

                </table>
            </div>
        </div>
    );
};

export default Users;
