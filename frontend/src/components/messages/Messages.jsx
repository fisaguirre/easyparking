import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import './MessageStyles.css';

export const propertyA = {
    bodyClassName: 'custom-toast',
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: 'colored',
    transition: Flip,
};
export const propertyB = {
    bodyClassName: 'custom-toast',
    position: 'top-center',
    autoClose: 1800,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: 'colored',
    transition: Flip,
};