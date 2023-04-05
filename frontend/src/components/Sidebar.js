import React, { useState } from "react";
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

const Nav = styled.div`
  //background: #15171c;
  background: blue;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  //justify-content: flex-start;
  align-items: center;
`;

const NavIconApp = styled(Link)`
  margin-left: auto;
  margin-right: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  //justify-content: flex-start;
  align-items: center;
`;
const SidebarNav = styled.nav`
  //background: #15171c;
  background: blue;
  width: 250px;
  //height: 80vh;
  height: ${({ usuarioLogueado }) =>
    usuarioLogueado === true ? "100vh" : "30vh"};
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [usuarioRol, setUsuarioRol] = useState();

  const [token, setToken] = useState();
  const [usuaroId, setUsuarioId] = useState();
  let navigate = useNavigate();

  const getUserLogueado = async () => {
    const tokenGenerado = sessionStorage.getItem("token");
    const rolUsuario = sessionStorage.getItem("rol");
    const usuario_id = sessionStorage.getItem("usuario_id");
    if (tokenGenerado) {
      setToken(tokenGenerado);
      setUsuarioLogueado(true);
      setUsuarioRol(rolUsuario);
      setUsuarioId(usuario_id);
    }
  };

  useEffect(() => {
    getUserLogueado();
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          {usuarioLogueado ? (
            <>
              <NavIcon to="#">
                <FaIcons.FaBars onClick={showSidebar} />
              </NavIcon>
            </>
          ) : (
            <NavIconLogin to="#">
              <IoIcons.IoPersonCircle onClick={showSidebar} />
            </NavIconLogin>
          )}
          <NavIconApp to="#">Easy-Parking</NavIconApp>
        </Nav>

        <SidebarNav sidebar={sidebar} usuarioLogueado={usuarioLogueado}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {usuarioLogueado === true && usuarioRol == "tarjetero" ? (
              <>
                {SidebarDataTarjetero.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
              </>
            ) : null}
            {usuarioLogueado === true && usuarioRol == "administrador" ? (
              <>
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
