import React from 'react';
import cat from './cat.png';
import QRCode from "react-qr-code";


const PagoQRPopUp = ({ open, codigo_qr, onFinalizar, onClose, patente, cantidad_tarjetas, minutos, precio_total }) => {
    if (!open) return null;
    return (
        <div onClick={onClose} className='overlay'>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className='modalContainer'
            >
                {/*<img src={nft} alt='/' />*/}
                {/*<img src={cat} alt='/' />*/}
                <div className='modalRight'>
                    <p className='closeBtn' onClick={onClose}>
                        X
                    </p>
                    <div className='content'>
                        <h4>Muestre el QR al conducotr</h4>
                        <h5>{cantidad_tarjetas} tarjetas - {minutos} minutos -$ {precio_total}</h5>
                        <h1> <QRCode value={codigo_qr} /></h1>
                    </div>
                    <div className='btnContainer'>
                        <button className='btnPrimary' onClick={onFinalizar}>
                            <span className='bold'>CERRAR</span>
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