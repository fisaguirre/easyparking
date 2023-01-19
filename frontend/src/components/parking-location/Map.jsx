import { GoogleMap, useLoadScript, Marker, InfoWIndow, MarkerClusterer } from "@react-google-maps/api";
import { createRoutesFromElements, parsePath } from "react-router-dom";
import { useState } from "react";
import React from 'react';

const API = process.env.REACT_APP_API_USER;
const API_LOCATION = process.env.REACT_APP_API_LOCATION;
const API_GOOGLE = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const asd = 'AIzaSyDUTbZbNn8fOZ8QXaYc_PoQqTP3HqMWsDI'

const libraries = ["places"];

const mapContainerStyle = {
    width: "80vw",
    height: "80vh"
};
//export default function Map() {
export const Map = () => {
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [time, setTime] = useState(null);



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

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";


    const saveCoordinates = async (markers) => {
        const latitud = markers[0]['lat']
        const longitud = markers[0]['lng']
        const time = markers[0]['time']
        const usuario_id = 1

        const res = await fetch(`${API_LOCATION}/estacionamiento/`, {
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
                onClick={(event) => {
                    setMarkers((current) => [
                        ...current,
                        {
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng(),
                            time: new Date(),
                        },
                    ]);
                }}

            >
                {markers.map((marker) => (

                    <Marker key={marker.time.toISOString()}

                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: '/cat.png',
                            scaledSize: new window.google.maps.Size(30, 30),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                        }}
                    />
                ))}

            </GoogleMap>

            <button type="button" onClick={(e) => saveCoordinates(markers)}>Guardar Lugar</button>
        </div >
    )
}