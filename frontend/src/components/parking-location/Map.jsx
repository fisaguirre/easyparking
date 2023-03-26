import { GoogleMap, useLoadScript, Marker, InfoWIndow, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import { createRoutesFromElements } from "react-router-dom";
import { useState, useEffect } from "react";
import React from 'react';
import { formatRelative } from "date-fns";

const API = process.env.REACT_APP_API_USER;
const API_LOCATION = process.env.REACT_APP_API_LOCATION

const libraries = ["places"];
const mapContainerStyle = {
    width: "80vw",
    height: "80vh"
};

export const Map = (props) => {
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [users, setUsers] = useState([])
    const [userLogueado, setUserLogueado] = useState(true)
    const [updateWorkZone, setUpdateWorkZone] = useState(props.updateWorkZone)
    let usuario_id = sessionStorage.getItem("usuario_id")
    const token = sessionStorage.getItem("token")

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCoQ7TJ2P8yl36zZsXF3l6PtD64BJq77NU',
        libraries,
    });


    const center = {
        lat: -32.889894119559635,
        lng: -68.84615948128344,
    };


    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };


    const getWorkZone = async () => {
        //Condicional para verificar si el tarjetero quiere ver el mapa para actualizar zona
        //Si no es el tarjetero, se obtienen todas las zonas de trabajo
        if (!updateWorkZone) {
            const res = await fetch(`${API_LOCATION}/estacionamiento`);
            const data = await res.json();
            setMarkers(data);
        }
    };

    //Guardar el o los markers (zonas de trabajo) y mandarlas a la base de datos
    const saveCoordinates = async (markers) => {
        const latitud = markers[0]['latitud']
        const longitud = markers[0]['longitud']
        const time = markers[0]['time']
        const usuario_id = 4
        const res = await fetch(`${API_LOCATION}/estacionamiento`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                latitud,
                longitud,
                usuario_id
            }),
        });
        const resp = await res.json();
        if (resp && resp[1]['code'] == 201) {
            window.confirm(resp[0]['message']);
        } else {
            window.confirm('No se pudo actualizar zona de trabajo');
        }
        console.log(resp)
    };


    const onMapClick = React.useCallback((event) => {
        const usuario_logueado = "no"
        if (updateWorkZone) {
            setMarkers(() => [
                {
                    latitud: event.latLng.lat(),
                    longitud: event.latLng.lng(),
                    time: new Date(),
                },
            ]);
        }

    }, []);

    useEffect(() => {
        getWorkZone();
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";


    return (
        <div>

            <h1>
                Estacionamiento{" "}
                <span role="img" aria-label="tent">
                </span>
            </h1>
            {updateWorkZone ? (
                <button type="button" id="signup-button" className="btn btn-info" onClick={(e) => saveCoordinates(markers, usuario_id)}>Guardar coordenadas</button>


            ) : null}
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker key={marker.calle + '_' + Date.now()} position={{ lat: Number(marker.latitud), lng: Number(marker.longitud) }}
                        icon={{
                            url: '/cat.png',
                            scaledSize: new window.google.maps.Size(30, 30),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}

                    />

                ))}

                {selected ? (
                    <InfoWindow
                        position={{ lat: Number(selected.latitud), lng: Number(selected.longitud) }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>Lugares disponibles: {selected.cantidad_disponible}</h2>
                            <h3>Calle: {selected.calle}</h3>
                        </div>
                    </InfoWindow>
                ) : null}

            </GoogleMap>


        </div>
    )
}
