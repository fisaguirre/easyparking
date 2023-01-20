import { GoogleMap, useLoadScript, Marker, InfoWIndow, MarkerClusterer } from "@react-google-maps/api";
import { createRoutesFromElements } from "react-router-dom";
import { useState } from "react";
import React from 'react';

const API = process.env.REACT_APP_API_USER;
const API_LOCATION = process.env.REACT_APP_API_LOCATION

const libraries = ["places"];
const mapContainerStyle = {
    width: "80vw",
    height: "80vh"
};

export const Map = () => {
    const [markers, setMarkers] = useState([]);
    const [markers1, setMarkers1] = useState();
    const [markers2, setMarkers2] = useState();

    const [selected, setSelected] = useState(null);
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);



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
    const saveCoordinates = async (markers1, markers2) => {
        console.log("asd")
        console.log(markers1)
        console.log(markers2)

        /*
        const latitud = markers[0]['lat']
        const longitud = markers[0]['lng']
        const time = markers[0]['time']
        const usuario_id = 1

        const res = await fetch(`${API}/location`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                latitud,
                longitud,
                time,
                usuario_id
            }),
            
        });
        await res.json();
*/
    };
    /*
        const onMapClick = React.useCallback((event) => {
            setMarkers((current) => [
                ...current,
                {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    time: new Date(),
                },
            ]);
        }, []);
    */
    const fer = async (marker, marker2) => {
        console.log(marker)
        console.log(marker2)
        setMarkers1(marker)
        setMarkers2(marker2)
    };


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
                //onClick={onMapClick}
                /*
                onClick={(event) => {
                    fer(event.latLng.lat(), event.latLng.lng());
                }}
                
                */
                onClick={(event) => {
                    fer(event.latLng.lat(), event.latLng.lng());
                }}

                onLoad={onMapLoad}
            >
                <Marker position={{ lat: -32.889894119559635, lng: -68.84615948128344 }}
                />
            </GoogleMap>

            <button type="button" onClick={(e) => saveCoordinates(markers1, markers2)}>Guardar Lugar</button>
        </div>
    )
}

