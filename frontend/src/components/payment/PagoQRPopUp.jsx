import React from "react";
//import cat from './cat.png';
import QRCode from "react-qr-code";

const PagoQRPopUp = ({
  open,
  codigo_qr,
  onFinalizar,
  onClose,
  patente,
  cantidad_tarjetas,
  minutos,
  precio_total,
}) => {
  const tituloStyle = {
    color: "black",
    fontWeight: "bold",
    marginLeft: "1.5rem",
    marginRight: "2rem",
    //fontSize: "1.8rem",
    fontSize: "1.7rem",
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
  const datosStyle = {
    color: "black",
    fontWeight: "bold",
    marginLeft: "2rem",
    marginRight: "2rem",
    fontSize: "1.2rem",
    marginTop: "0.7rem",
    height: "25px",
    //display: "flex",
    alignItems: "center",
    fontFamily: "'Helvetica Neue', 'sans-serif'",
    //letterSpacing: "2px",
    color: "#2b2b2b",
    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
    textTransform: "uppercase",
    margin: "1rem 0",
  };
  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        {/*<img src={nft} alt='/' />*/}
        {/*<img src={cat} alt='/' />*/}
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose} size={60}>
            X
          </p>
          <div className="content">
            <p style={tituloStyle}>Muestre el QR al conductor</p>
            <p style={datosStyle}>Tarjetas: {cantidad_tarjetas}</p>
            <p style={datosStyle}>Tiempo: {minutos} minutos</p>
            <p style={datosStyle}>Precio: $ {precio_total}</p>
            <h1>
              {" "}
              <QRCode value={codigo_qr} />
            </h1>
          </div>
          <div className="btnContainer">
            <button className="btnPrimary" onClick={onFinalizar}>
              <span className="bold">CERRAR</span>
            </button>
            {/*
                        <button className='btnOutline' onClick={onClose}>
                            <span className='bold'>Volver y regenerar QR</span>
                        </button>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagoQRPopUp;
