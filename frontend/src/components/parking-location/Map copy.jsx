import { GoogleMap, useLoadScript, Marker, InfoWIndow, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import { createRoutesFromElements } from "react-router-dom";
import { useState } from "react";
import React from 'react';
import { formatRelative } from "date-fns";
import { MapHome } from "./MapHome";

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

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDUTbZbNn8fOZ8QXaYc_PoQqTP3HqMWsDI',
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
        console.log(updateWorkZone)
        if (updateWorkZone == "si") {

            const res = await fetch(`${API_LOCATION}/estacionamiento`);
            const data = await res.json();
            setUsers(data);
        }
    };

    const saveCoordinates = async (markers) => {
        //console.log(markers)
        //console.log(markers[0]['lat'])
        //console.log(markers[0]['lng'])
        const latitud = markers[0]['lat']
        const longitud = markers[0]['lng']
        const time = markers[0]['time']
        const usuario_id = 1

        const res = await fetch(`${API_LOCATION}/estacionamiento`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                latitud,
                longitud,
                usuario_id
            }),
        });
        await res.json();

    };




    const onMapClick = React.useCallback((event) => {
        const usuario_logueado = "no"
        if (userLogueado) {
            //console.log(actualizar)
            setMarkers(() => [
                {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    time: new Date(),
                },
            ]);
        }

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
                    ⛺️
                </span>
            </h1>
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
                    <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }}
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
                <Marker position={{ lat: -32.889894119559635, lng: -68.84615948128344 }}
                    icon={{
                        url: '/cat.png',
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                    }}

                />

                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>
                                <span role="img" aria-label="bear">
                                    🐻
                                </span>{" "}
                                Alert
                            </h2>
                            <p>Spotted {formatRelative(selected.time, new Date())}</p>
                        </div>
                    </InfoWindow>
                ) : null}

            </GoogleMap>
            {userLogueado ? (
                <button type="button" onClick={(e) => saveCoordinates(markers)}>Guardar Lugar</button>
            ) : null}

        </div>
    )
}
