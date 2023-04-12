import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as CiIcons from "react-icons/ci";
import * as TfIcons from "react-icons/tfi";

import { toast } from 'react-toastify';
import { propertyA } from "../messages/Messages";
import 'react-toastify/dist/ReactToastify.css';
import "../messages/MessageStyles.css";
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
                toast.success(responseEditRolLocationJson[0]['message'], propertyA);
                //window.confirm(responseEditRolLocationJson[0]['message'])
            }
        }
        else {
            toast.error(responseEditRolParkingJson[0]['message'], propertyA);
            //window.confirm(responseEditRolParkingJson[0]['message']);
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
        await getUsers();
        toast.success("Tarjetas acreditadas", propertyA);
    };
    //La funciòn useEffect() sirve para llamar/ hacer algo luego de que el componente de React ya haya sido llamado

    /*
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
            toast.success("Tarjetas descartadas", propertyA);
        }
    };
    */
    const discardCardsToUser = async (userId) => {
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
        toast.success("Tarjetas descartadas", propertyA);
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
                            {/*<th style={{ fontSize: '20px', fontWeight: 'bold' }}>ID</th>*/}
                            <th style={{ fontSize: '20px', fontWeight: 'bold' }}>DNI</th>
                            <th style={{ fontSize: '20px', fontWeight: 'bold' }}>Usuario</th>
                            <th style={{ fontSize: '20px', fontWeight: 'bold' }}>Nombre</th>
                            <th style={{ fontSize: '20px', fontWeight: 'bold' }}>Apellido</th>
                            <th style={{ fontSize: '20px', fontWeight: 'bold' }}>Email</th>
                            <th style={{ fontSize: '20px', fontWeight: 'bold' }}>Rol</th>
                            <th style={{ fontSize: '20px', fontWeight: 'bold' }}>Tarjetas</th>
                            <th style={{ fontSize: '20px', fontWeight: 'bold' }}>Agregar/Eliminar Tarjetas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.usuario_id}>
                                {/* <td style={{ fontSize: '25px' }}>{user.usuario_id}</td>*/}
                                <td style={{ fontSize: '20px' }}>{user.dni}</td>
                                <td style={{ fontSize: '20px' }}>{user.username}</td>
                                <td style={{ fontSize: '20px' }}>{user.nombre}</td>
                                <td style={{ fontSize: '20px' }}>{user.apellido}</td>
                                <td style={{ fontSize: '20px' }}>{user.email}</td>
                                <td style={{ fontSize: '20px' }}>{user.rol}

                                    {user.usuario_id == editUserButtonById ? (
                                        <>
                                            &nbsp;&nbsp;

                                            <TfIcons.TfiSave size={25} onClick={(e) => cambiarRolUsuario(user.usuario_id, rol)} />
                                            <select onChange={(e) => setRol(e.target.value)}>
                                                <option value="sin asignar">Sin asignar</option>
                                                <option value="tarjetero">Tarjetero</option>
                                                <option value="admin">Admin</option>
                                                {/*<option value="superadmin">Super Admin</option>*/}
                                            </select>
                                        </>
                                    ) :
                                        <CiIcons.CiEdit size={30} onClick={(e) => setEditUserButtonById(user.usuario_id)} />
                                    }
                                </td>
                                <td style={{ fontSize: '20px' }}>{user.cantidad_tarjeta}</td>

                                {user.rol == "tarjetero" ? (
                                    <td>
                                        <input type="text"
                                            onChange={(e) => setCardsQuantity(e.target.value)}
                                            className="form-control"
                                            placeholder="Cantidad a modificar"
                                            style={{ fontSize: '15px', width: '11.5rem', marginLeft: '0rem' }} />
                                    </td>
                                ) : null}


                                {user.rol == "tarjetero" ? (
                                    <td>
                                        <button className="btn btn-primary btn-block"
                                            onClick={(e) => addCardsToUser(user.usuario_id)}
                                            style={{ fontSize: '15px', width: '8rem', marginLeft: '-3rem' }}
                                        >Agregar
                                        </button>
                                    </td>
                                ) : null}
                                {user.rol == "tarjetero" ? (
                                    <td>
                                        <button className="btn btn-primary btn-block"
                                            onClick={(e) => discardCardsToUser(user.usuario_id)}
                                            style={{ fontSize: '15px', width: '8rem', marginLeft: '-1rem' }}
                                        >Eliminar
                                        </button>
                                    </td>
                                ) : null}
                            </tr>
                        ))}
                    </tbody>
                    {/*
                                        <p></p>
                    <div>
                        <Link id="signup-link" to="/signup">
                            <button type="button" id="signup-button" className="btn btn-info">Registrar nuevo usuario</button>
                        </Link>
                    </div>
                                */}

                </table>
            </div>
        </div>
    );
};

export default Users;
