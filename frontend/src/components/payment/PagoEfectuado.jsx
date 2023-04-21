import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./styles/pagoEfectuado.css";
import { useState, useEffect } from "react";
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
        <div className="Table">
            <h3>Tarjetas abonadas por conductores</h3>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
            >
                <Table className="tableBody" sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell align="left">Precio</TableCell>
                            <TableCell align="left">Tiempo</TableCell>
                            <TableCell align="left">Tarjetas</TableCell>
                            <TableCell align="left">Patente</TableCell>
                            <TableCell align="left">Usuario MP</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>


                    {/*<TableBody style={{ color: "white" }}>*/}
                    <TableBody >
                        {pagosEfectuados.map((pago) => (
                            <TableRow
                                key={pago.pago_id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="left" component="th" scope="row">
                                    {pago.fecha}
                                </TableCell>
                                <TableCell align="left">${pago.precio_total}</TableCell>
                                <TableCell align="left">{pago.tiempo_total} min</TableCell>
                                <TableCell align="left">{pago.cantidad_tarjetas}</TableCell>
                                <TableCell align="left">{pago.patente}</TableCell>
                                <TableCell align="left">{pago.username_mercado}</TableCell>
                                {/*<TableCell align="left" className="Details">Details</TableCell>*/}
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
