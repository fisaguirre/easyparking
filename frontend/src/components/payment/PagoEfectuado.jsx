import React, { useState, useEffect, useRef } from "react";
const API_MERCADO_PAGO = process.env.REACT_APP_API_USER;
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;


export default function PagoEfectuado() {
    let [pagosEfectuados, setPagosEfectuados] = useState();

    const usuario_id = sessionStorage.getItem("usuario_id")
    const token = sessionStorage.getItem("token")


    const getPagos = async (usuario_id) => {
        const res = await fetch(`${API_PAYMENT}/pago/${usuario_id}`, {
            mmethod: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        const data = await res.json();
        setPagosEfectuados(data);
    };

    useEffect(() => {
        getPagos(usuario_id);
    }, []);

    return (

        <div id="form-text" className="row">
            <h1>This is admin mode</h1>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cantidad pago</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagosEfectuados.map((user) => (
                            <tr key={user.usuario_id}>
                                <td>{user.usuario_id}</td>
                                <td>{user.username}</td>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                            </tr>
                        ))}
                    </tbody>
                    <p></p>
                </table>
            </div>
        </div>
    );
};
