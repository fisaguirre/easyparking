import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { Navigate } from "react-router-dom";
import './styles.css';
const API_CONTROL_PARKING = process.env.REACT_APP_API_USER;

const LoginCopy = () => {
  //Guardo los datos que se envian por handleSubmit al darle click al boton submit
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  //Se coloca el mètodo como async para que no se quede colgado el navegador
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_CONTROL_PARKING}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await res.json();
    if (response["token"]) {
      sessionStorage.setItem("token", response["token"]);
      const res2 = await fetch(`${API_CONTROL_PARKING}/users/${email}`);
      const userRolId = await res2.json();
      if (userRolId) {
        sessionStorage.setItem("rol", userRolId["rol"]);
        sessionStorage.setItem("usuario_id", userRolId["usuario_id"]);
        sessionStorage.setItem("username", userRolId["username"]);
        console.log("hola");
        console.log(sessionStorage.getItem("username"));
        if (sessionStorage.getItem("usuario_id")) {
          navigate("/");
          navigate(0);
        }
      }
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
