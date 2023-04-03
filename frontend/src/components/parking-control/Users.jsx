import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const API = process.env.REACT_APP_API_USER;
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT
const API_LOCATION = process.env.REACT_APP_API_LOCATION

const Users = () => {
    //Guardo los datos que se envian por handleSubmit al darle click al boton submit
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let token = sessionStorage.getItem("token")

    const [userId, setUserId] = useState("");
    const [cardsQuantity, setCardsQuantity] = useState("")
    const [rol, setRol] = useState();
    const [cambiarRol, setCambiarRol] = useState(false)
    const [numeroTD, setNumeroTD] = useState()
    const [prueba1, setPrueba1] = useState(true)

    let [editUserButtonById, setEditUserButtonById] = useState(null)

    const nameInput = useRef(null);

    let [users, setUsers] = useState([]);

    //Funcion que cambia el rol del usuario en las 3 bases de datos
    const cambiarRolUsuario = async (usuario_id, rol) => {
        setEditUserButtonById(null)
        const tipo = 'cambiar_rol'

        const responseEditRolParking = await fetch(`${API}/users/${tipo}/${usuario_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                rol
            }),
        });
        const responseEditRolParkingJson = await responseEditRolParking.json();


        if (responseEditRolParkingJson[1]["code"] == 201) {
            const responseEditRolPayment = await fetch(`${API_PAYMENT}/users/${tipo}/${usuario_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                },
                body: JSON.stringify({
                    rol
                }),
            });
            const responseEditRolPaymentJson = await responseEditRolPayment.json();

            const responseEditRolLocation = await fetch(`${API_LOCATION}/users/${tipo}/${usuario_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token
                },
                body: JSON.stringify({
                    rol
                }),
            });
            const responseEditRolLocationJson = await responseEditRolLocation.json();

            if (responseEditRolLocationJson[1]['code'] == 201) {
                await getUsers();
                window.confirm(responseEditRolLocationJson[0]['message'])
            }
        }
        else {
            window.confirm(responseEditRolParkingJson[0]['message']);
        }
    }


    const getUsers = async () => {
        //const res = await fetch(`${API}/users`);
        const res = await fetch(`${API}/users/tarjeta`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        const data = await res.json();
        setUsers(data);
    };

    const addCardsToUser = async (userId) => {

        const res = await fetch(`${API}/tarjeta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
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
                    "x-access-token": token
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
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DNI</th>
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
                                <td>{user.dni}</td>
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

                                {/*
                                <td>
                                    {user.rol}
                                    {cambiarRol ? (
                                        <>
                                            <select value={user.rol} onChange={(e) => setRol(e.target.value)}>
                                                <option value="sin asignar">Sin asignar</option>
                                                <option value="tarjetero">Tarjetero</option>
                                                <option value="administrador">Administrador</option>
                                                <option value="superadmin">Super Admin</option>
                                            </select>

                                            <button>guardar</button>
                                        </>
                                    ) : <button
                                        onClick={(e) => setCambiarRol(true)}
                                    >editar
                                    </button>
                                    }
                                </td>
                        */}

                                <td>
                                    {user.rol}

                                    {user.usuario_id == editUserButtonById ? (
                                        <>
                                            <select onChange={(e) => setRol(e.target.value)}>
                                                <option value="sin asignar">Sin asignar</option>
                                                <option value="tarjetero">Tarjetero</option>
                                                <option value="administrador">Administrador</option>
                                                <option value="superadmin">Super Admin</option>
                                            </select>

                                            <button
                                                onClick={(e) => cambiarRolUsuario(user.usuario_id, rol)}
                                            >s
                                            </button>
                                        </>
                                    ) : <button
                                        onClick={(e) => setEditUserButtonById(user.usuario_id)}
                                    >e
                                    </button>
                                    }

                                </td>


                                <td>{user.cantidad_tarjeta}</td>

                                {user.rol == "tarjetero" ? (
                                    <td>
                                        <input type="text"
                                            onChange={(e) => setCardsQuantity(e.target.value)}
                                            className="form-control"
                                            placeholder="Ingrese cantidad de tarjetas" />
                                    </td>
                                ) : null}
                                {user.rol == "tarjetero" ? (
                                    <td>
                                        <button className="btn btn-primary btn-block"
                                            onClick={(e) => addCardsToUser(user.usuario_id)}
                                        >Acreditar
                                        </button>
                                    </td>
                                ) : null}
                                {user.rol == "tarjetero" ? (
                                    <td>
                                        <button className="btn btn-primary btn-block"
                                            onClick={(e) => discardCardsToUser(user.usuario_id)}
                                        >Desacreditar
                                        </button>
                                    </td>
                                ) : null}
                            </tr>
                        ))}
                    </tbody>
                    <p></p>
                    <div>
                        <Link id="signup-link" to="/signup">
                            <button type="button" id="signup-button" className="btn btn-info">Registrar nuevo usuario</button>
                        </Link>
                    </div>

                </table>
            </div>
        </div>
    );
};

export default Users;
