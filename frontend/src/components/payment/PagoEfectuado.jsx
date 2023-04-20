import React, { useState, useEffect } from "react";
const API_PAYMENT = process.env.REACT_APP_API_PAYMENT;


export default function PagoEfectuado() {
    let [pagosEfectuados, setPagosEfectuados] = useState([]);

    const usuario_id = sessionStorage.getItem("usuario_id")
    const token = sessionStorage.getItem("token")


    const getPagos = async (usuario_id) => {
        const res = await fetch(`${API_PAYMENT}/pago/pagos/${usuario_id}`, {
            mmethod: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        });
        const data = await res.json();
        setPagosEfectuados(data['payments']);
    };

    useEffect(() => {
        getPagos(usuario_id);
    }, [usuario_id]);

    return (
        <div id="form-text" className="row">
            <h3>Tarjetas pagadas por conductores</h3>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Precio</th>
                            <th>Tiempo</th>
                            <th>Tarjetas</th>
                            <th>Patente</th>
                            <th>Usuario MP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagosEfectuados.map((pago) => (
                            <tr key={pago.pago_id}>
                                <td>{pago.fecha}</td>
                                <td>${pago.precio_total}</td>
                                <td>{pago.tiempo_total} min</td>
                                <td>{pago.cantidad_tarjetas}</td>
                                <td>{pago.patente}</td>
                                <td>{pago.username_mercado}</td>
                            </tr>
                        ))}
                    </tbody>
                    <p></p>
                </table>
            </div>
        </div>
    );
};
