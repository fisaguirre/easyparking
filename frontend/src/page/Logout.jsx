import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [usuarioRol, setUsuarioRol] = useState();
  const [token, setToken] = useState();
  const [usuaroId, setUsuarioId] = useState();
  let navigate = useNavigate();

  /*
  const borrar = async () => {
    sessionStorage.clear();
    navigate("/");
    navigate(0);
  };
  useEffect(() => {
    getUserLogueado();
  }, []);
*/
  const borrar = async () => {
    sessionStorage.clear();
    navigate("/");
    navigate(0);
  };
  useEffect(() => {
    borrar();
  });

  return <div></div>;
}
