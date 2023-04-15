import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { Navigate } from "react-router-dom";
import './styles.css';

import { toast } from 'react-toastify';
import { propertyA } from "../components/messages/Messages";
import 'react-toastify/dist/ReactToastify.css';
import "../components/messages/MessageStyles.css";
const API_CONTROL_PARKING = process.env.REACT_APP_API_USER;

const LoginCopy = () => {
  //Guardo los datos que se envian por handleSubmit al darle click al boton submit
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailUsername, setEmailUsername] = useState();
  let navigate = useNavigate();


  // Patrón para verificar si es un correo electrónico
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Patrón para verificar si es un nombre de usuario
  const usernamePattern = /^[a-zA-Z0-9]+$/;

  //Se coloca el mètodo como async para que no se quede colgado el navegador
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      toast.info("Debe ingresar una contraseña", propertyA);
      return false;
    }
    if (emailPattern.test(emailUsername) || usernamePattern.test(emailUsername)) {
      const res = await fetch(`${API_CONTROL_PARKING}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailUsername,
          password,
        }),
      });
      const response = await res.json();
      const email = response['email']
      if (response["token"]) {
        sessionStorage.setItem("token", response["token"]);
        const res2 = await fetch(`${API_CONTROL_PARKING}/users/${email}`);
        const userRolId = await res2.json();
        console.log("sisiasdadsa: ", res2)

        console.log("sisi: ", userRolId)
        if (userRolId) {
          navigate("/");
          sessionStorage.setItem("rol", userRolId["rol"]);
          sessionStorage.setItem("usuario_id", userRolId["usuario_id"]);
          sessionStorage.setItem("username", userRolId["username"]);
          if (sessionStorage.getItem("usuario_id")) {
            navigate(0);
          }
        }
      } else {
        toast.error(response["message"], propertyA);
      }
    } else {
      toast.info("Debe ingresar un nombre de usuario o correo válido", propertyA);
      return false;

    }


  };
  /*
    return (
      <div id="form-text" className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card card-body">
            <div className="form-group">
              Email
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                placeholder="User's Email"
              />
            </div>
            <div className="form-group">
              Contraseña
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                placeholder="User's Password"
              />
            </div>
  
            <button className="btn btn-primary btn-block">Login</button>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    );
  };
  */

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>Inicio de sesión</h2>
        {/*
        <div>
          Email
          
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="login-signUp-form__input"
            placeholder="Ingrese el email"
          />
        </div>
  */}
        <div>
          Usuario-email
          <input
            type="text"
            onChange={(e) => setEmailUsername(e.target.value)}
            value={emailUsername}
            className="login-signUp-form__input"
            placeholder="Ingrese el usuario o email."
          />
        </div>
        <div>
          Contraseña
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="login-signUp-form__input"
            placeholder="Ingrese la contraseña"
          />
        </div>
        <div>
          <button type="submit" className="login-signUp-form__button">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginCopy;
