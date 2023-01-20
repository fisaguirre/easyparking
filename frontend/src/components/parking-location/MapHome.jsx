import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
import { createRoutesFromElements } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react';
import { formatRelative } from "date-fns";

const API = process.env.REACT_APP_API_USER;
const API_LOCATION = process.env.REACT_APP_API_LOCATION

const libraries = ["places"];
const mapContainerStyle = {
    width: "80vw",
    height: "80vh"
};

export const MapHome = () => {
    const [markers, setMarkers] = useState([]);
    const [users, setUsers] = useState([])
    const [selected, setSelected] = useState(null);
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [opcion, setOpcion] = useState(true);


    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDUTbZbNn8fOZ8QXaYc_PoQqTP3HqMWsDI',
        libraries,
    });


    const center = {
        lat: -32.889894119559635,
        lng: -68.84615948128344,
    };

    const merkers = [
        {
            name: "location-1",
            location: {
                lat: -32.8845605295406,
                lng: -68.85354092013785,
            },
        },
        {
            name: "location-2",
            location: {
                lat: -32.87771288256019,
                lng: -68.86444141742221,
            },
        },
        {
            name: "location-3",
            location: {
                lat: -32.890254485684615,
                lng: -68.88126423212884,
            },
        },
        {
            name: "location-4",
            location: {
                lat: -32.86170895027429,
                lng: -68.8902764542931,
            },
        }
    ];


    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    const getWorkZone = async () => {
        const res = await fetch(`${API_LOCATION}/estacionamiento`);
        const data = await res.json();
        console.log("hola")
        setUsers(data);
        console.log(data[0])
        console.log(data[0]['latitud'])
        console.log(markers.lat)

    };

    const fer = async () => {
        console.log("merkes: ")
        console.log(merkers)
    };

    const saveCoordinates = async (markers) => {
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
                usuario_id
            }),

        });
        await res.json();

    };

    useEffect(() => {
        getWorkZone();
        fer();
    }, []);

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
                onLoad={onMapLoad}
            >
                {users.map((marker) => (
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
            <div id="form-text" className="row">
                <div className="col-md-6">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>latitud</th>
                                <th>longitud</th>
                                <th>lugares</th>
                                <th>disponibles</th>
                                <th>usuario_id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.latitud}>
                                    <td>{user.latitud}</td>
                                    <td>{user.longitud}</td>
                                    <td>{user.cantidad_lugares}</td>
                                    <td>{user.cantidad_disponible}</td>
                                    <td>{user.usuario_id}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>





        </div>
    )
}
