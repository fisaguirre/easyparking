import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_USER;

const Tarjeta = () => {

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


    //La funciòn useEffect() sirve para llamar/ hacer algo luego de que el componente de React ya haya sido llamado

    useEffect(() => {
        getUsers();
    }, []);


    return (
        <div >
            <h1>This is admin mode</h1>
            <p></p>
            <div>
                <Link id="signup-link" to="/tarjeta/disenio">
                    <button type="button" id="signup-button" className="btn btn-primary btn-block">Usar 1 tarjeta</button>
                </Link>
            </div>
            <div></div>
            <p></p>
            <div>
                <Link id="signup-link" to="/tarjeta/activada">
                    <button type="button" id="signup-button" className="btn btn-primary btn-block">Ir a tarjetas en uso</button>
                </Link>
            </div>
            <p></p>


        </div >
    );
};

export default Tarjeta;
