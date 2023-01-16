import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const API = process.env.REACT_APP_API_USER;

const Users = () => {
    //Guardo los datos que se envian por handleSubmit al darle click al boton submit
    const yo = "asd"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [editing, setEditing] = useState(false);
    const [userId, setUserId] = useState("");
    const [cardsQuantity, setCardsQuantity] = useState("")

    const nameInput = useRef(null);

    let [users, setUsers] = useState([]);

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
        console.log(data)
    };

    const editUser = async (userId) => {

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

        setEditing(true);
        setUserId(userId);

    };
    //La funciòn useEffect() sirve para llamar/ hacer algo luego de que el componente de React ya haya sido llamado



    const discardCards = async (userId) => {
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
            const data = res.json()

            setEditing(true);
            setUserId(userId);
            console.log("data")
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
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.rol}</td>
                                <td></td>
                                <td>
                                    <input type="text"
                                        onChange={(e) => setCardsQuantity(e.target.value)}
                                        value={cardsQuantity}
                                        className="form-control"
                                        placeholder="Ingrese cantidad de tarjetas" />
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-block"
                                        onClick={(e) => editUser(user.usuario_id)}
                                    >Acreditar
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-block"
                                        onClick={(e) => discardCards(user.usuario_id)}
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
