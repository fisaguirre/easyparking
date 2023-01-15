import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API_USER;

{/*export const Users = () => {*/ }
{/*export default function Users() {*/ }
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

    useEffect(() => {
        getUsers();
    }, []);


    return (
        <div id="form-text" className="row">
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
                            <th>Acreditar Tarjetas</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
