import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io5";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SidebarDataTarjetero,
  SidebarDataAdmin,
  SidebarDataLogin,
} from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
/*
 background: linear-gradient(
    106.37deg,
    #ffe1bc 29.63%,
    #ffcfd1 51.55%,
    #f3c6f1 90.85%
     );
    */
const Nav = styled.div`
  //background: #15171c;
  //background: #ef088a;
  //background: #f7b7a3;
  //background: #fcb5e6;
  //background: #d4b9da;
  //background: #c8a8e1;
  background: linear-gradient(
    106.37deg,
    #ffe1bc 29.63%,
    #ffcfd1 51.55%,
    #f3c6f1 90.85%
  );
  height: 80px;
  display: flex;
  justify-content: flex-start;
  //justify-content: space-between;

  align-items: center;

  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  transition: transform 0.3s ease-in-out;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  //justify-content: flex-start;
  align-items: center;
`;

const NavIconLogin = styled(Link)`
  //margin-left: 2rem;
  margin-right: 1.2rem;
  margin-left: auto;
  font-size: 2rem;
  height: 80px;
  display: flex;
  //justify-content: flex-start;
  align-items: center;
`;

const NavIconApp = styled(Link)`
  //margin-left: auto;
  margin-left: 2rem;
  margin-right: 2rem;
  font-size: 1.8rem;
  height: 50px;
  display: flex;
  //justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  //background: #15171c;
  //background: #d02987;
  background-color: rgba(0, 0, 0, 0.7);
  //background-color: 0F0000;
  //background-color: #f7b7a3;
  //background-color: #fcb5e6;
  //background-color: #c8a8e1;
  //background-color: #d4b9da;

  width: 250px;
  //height: 80vh;
  height: ${({ usuarioLogueado }) =>
    usuarioLogueado === true ? "100vh" : "40vh"};
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  //Utilizamos la prop sidebar y usuarioLogueado.
  //Si user log es false, deslizamos el sidebar desde el extremo derecho
  //Si el user ha iniciado sesiòn deslizamos el sidebar desde el extremo izquierdo
  ${(props) =>
    props.sidebar === true && props.usuarioLogueado === false
      ? "right: 0;"
      : props.sidebar === false && props.usuarioLogueado === false
      ? "right: -100%;"
      : props.sidebar === true && props.usuarioLogueado === true
      ? "left: 0;"
      : props.sidebar === false && props.usuarioLogueado === true
      ? "left: -100%;"
      : null}
  z-index: 10;
  transition: all 0.3s ease-in-out;
  //transition: 350ms;
`;

//left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
//right: ${({ sidebar }) => (sidebar ? "0" : "-100%")};

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [extremo, setExtremo] = useState("right");

  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [usuarioRol, setUsuarioRol] = useState();
  const [username, setUsername] = useState();

  const [token, setToken] = useState();
  const [usuaroId, setUsuarioId] = useState();

  const getUserLogueado = async () => {
    const tokenGenerado = sessionStorage.getItem("token");
    const rolUsuario = sessionStorage.getItem("rol");
    const usuario_id = sessionStorage.getItem("usuario_id");
    const username = sessionStorage.getItem("username");
    if (tokenGenerado) {
      setToken(tokenGenerado);
      setUsuarioLogueado(true);
      setUsuarioRol(rolUsuario);
      setUsuarioId(usuario_id);
      setUsername(username);
      setExtremo("left");
    }
  };
  const hiUser = {
    color: "white",
    fontSize: "20px",
    marginLeft: "4vh",
    fontWeight: "bold",
  };
  const appName = {
    color: "white",
    fontSize: "25px",
    marginLeft: "4vh",
    fontWeight: "bold",
  };
  const appNavName = {
    color: "black",
    fontSize: "25px",
    fontWeight: "bold",
    //marginLeft: "3rem",
    marginRight: "2rem",
    //fontSize: "1.8rem",
    fontSize: "1.8rem",
    marginTop: "0.7rem",
    height: "25px",
    display: "flex",
    alignItems: "center",
    fontFamily: "'Helvetica Neue', 'sans-serif'",
    letterSpacing: "2px",
    color: "#2b2b2b",
    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
    textTransform: "uppercase",
    margin: "1rem 0",
  };

  //Para arrastrar el navbar
  const navbarRef = useRef(null);

  const handleScroll = () => {
    const navbar = navbarRef.current;
    if (navbar) {
      navbar.style.transform = `translateY(${window.scrollY}px)`;
    }
  };
  const tirar = () => {
    console.log("se queire cerrar");
  };
  useEffect(() => {
    getUserLogueado();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav ref={navbarRef}>
          {usuarioLogueado ? (
            <>
              <NavIcon to="#">
                <FaIcons.FaBars onClick={showSidebar} />
              </NavIcon>
              <p style={{ ...appNavName, marginLeft: "2.3rem" }}>EasyParking</p>

              {/*<p style={appNavName}>EasyParking</p>*/}
            </>
          ) : (
            <>
              {" "}
              {/*<p style={appNavName}>EasyParking</p>*/}
              <p style={{ ...appNavName, marginLeft: "2.5rem" }}>EasyParking</p>
              <NavIconLogin to="#">
                <IoIcons.IoPersonCircle onClick={showSidebar} />
              </NavIconLogin>
            </>
          )}
          {/*       <NavIconApp to="#">Easy-Parking</NavIconApp>
           */}
          {/*<p style={appNavName}>EasyParking</p>*/}
        </Nav>

        <SidebarNav sidebar={sidebar} usuarioLogueado={usuarioLogueado}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <p style={appName}>EasyParking</p>
            {usuarioLogueado === true && usuarioRol == "tarjetero" ? (
              <>
                <p style={hiUser}>Hola {username}.</p>
                {SidebarDataTarjetero.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </>
            ) : null}
            {usuarioLogueado === true && usuarioRol == "admin" ? (
              <>
                <p style={hiUser}>Hola {username}.</p>
                {SidebarDataAdmin.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </>
            ) : null}
            {usuarioLogueado === false ? (
              <>
                {SidebarDataLogin.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </>
            ) : null}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
