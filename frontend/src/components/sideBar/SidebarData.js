import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import * as SlIcons from "react-icons/sl";
import * as GrIcons from "react-icons/gr";
import * as TbIcons from "react-icons/tb";

/*
const [usuarioRol, setUsuarioRol] = useState();
const [username, setUserName] = useState();
const getUserLogueado = async () => {
  const tokenGenerado = sessionStorage.getItem("token");
  if (tokenGenerado) {
    setUserName(sessionStorage.getItem("username"));
  }
};
useEffect(() => {
  getUserLogueado();
}, []);
*/
export const SidebarDataAdmin = [
  {
    title: "Inicio",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Usuarios",
    //path: "/users",
    icon: <TbIcons.TbUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Ver usuarios",
        path: "/users",
        icon: <RiIcons.RiUserSearchLine />,
        cName: "sub-nav",
      },
      {
        title: "Registrar usuario",
        path: "/signup",
        icon: <MdIcons.MdPersonAddAlt1 />,
        cName: "sub-nav",
      },
    ],
  },
  /*
  {
    title: "Configuración de perfil",
    //path: "/logout",
    icon: <GrIcons.GrUserSettings />,
  },
  */
  {
    title: "Cerrar sesión",
    path: "/logout",
    icon: <SlIcons.SlLogout />,
  },
];

export const SidebarDataTarjetero = [
  {
    title: "Inicio",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  /*
  {
    title: "Estacionamiento",
    //path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Actualizar lugares",
        path: "/estacionamiento/zonadetrabajo",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Zona de trabajo",
        path: "/reports/reports2",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  */
  {
    title: "Estacionamiento",
    path: "/estacionamiento/zonadetrabajo",
    icon: <TbIcons.TbParking />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Tarjetas",
    //path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Nueva tarjeta",
        path: "/tarjeta/activar",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Tarjetas activas",
        path: "/tarjeta/instancia",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Pendientes por pagar",
        path: "/tarjeta/pendienteDePago",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  /*
  {
    title: "Pagos",
    //path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Efectuados",
        path: "/pago/configuracion",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Configurar pagos",
        path: "/pago/pagosefectuados",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  */

  {
    title: "Pagos",
    //path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Configuración de Facturación",
        path: "/pago/configuracion",
        icon: <MdIcons.MdPayment />,
        cName: "sub-nav",
      },
      {
        title: "Pagos efectuados",
        path: "/pago/realizado",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },

  /*
  {
    title: "Configuración de Facturación",
    path: "/pago/configuracion",
    icon: <MdIcons.MdPayment />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  */
  /*
  {
    title: "Configuraciòn de perfil",
    //path: "/logout",
    icon: <GrIcons.GrUserSettings />,
  },
  */
  {
    title: "Cerrar sesión",
    path: "/logout",
    icon: <SlIcons.SlLogout />,
  },
];

export const SidebarDataLogin = [
  {
    title: "Inicio",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Ingresar",
    path: "/login",
    icon: <BiIcons.BiLogIn />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];

/*

export const SidebarData = [
  {
    title: "Overview",
    path: "/overview",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Users",
        path: "/overview/users",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Revenue",
        path: "/overview/revenue",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Reports",
        path: "/reports/reports1",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Reports 2",
        path: "/reports/reports2",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "Reports 3",
        path: "/reports/reports3",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Products",
    path: "/products",
    icon: <FaIcons.FaCartPlus />,
  },
  {
    title: "Team",
    path: "/team",
    icon: <IoIcons.IoMdPeople />,
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Message 1",
        path: "/messages/message1",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Message 2",
        path: "/messages/message2",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];
*/
