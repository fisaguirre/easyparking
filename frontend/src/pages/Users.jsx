import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API;

{/*export const Users = () => {*/ }
{/*export default function Users() {*/ }
const Users = () => {
    {/*Guardo los datos que se envian por handleSubmit al darle click al boton submit*/ }
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");

    const nameInput = useRef(null);

    let [users, setUsers] = useState([]);

    {/* Se coloca el mètodo como async para que no se quede colgado el navegador*/ }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editing) {
            {/*Le asigno un nombre a la respuesta*/ }
            const res = await fetch(`${API}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            await res.json();
        } else {
            const res = await fetch(`${API}/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            const data = await res.json();
            console.log(data);
            setEditing(false);
            setId("");
        }
        await getUsers();

        setName("");
        setEmail("");
        setPassword("");
        nameInput.current.focus();
    };

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
    };

    const deleteUser = async (id) => {
        const userResponse = window.confirm("Are you sure you want to delete it?");
        if (userResponse) {
            const res = await fetch(`${API}/users/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            console.log(data);
            await getUsers();
        }
    };

    const editUser = async (id) => {
        const res = await fetch(`${API}/users/${id}`);
        const data = await res.json();

        setEditing(true);
        setId(id);

        // Reset
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
        nameInput.current.focus();
    };
    {/*La funciòn useEffect() sirve para llamar/ hacer algo luego de que el componente de React ya haya sido llamado*/ }
    {/**/ }
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div id="form-text" className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Name"
                            ref={nameInput}
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
                    <button className="btn btn-primary btn-block">
                        {editing ? "Update" : "Create"}
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*users.map recorre la lsita de "users" que asigne mas arriba*/}
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={(e) => editUser(user._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={(e) => deleteUser(user._id)}
                                    >
                                        Delete
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
