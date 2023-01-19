import { GoogleMap, useLoadScript, Marker, InfoWIndow, MarkerClusterer } from "@react-google-maps/api";
import { createRoutesFromElements } from "react-router-dom";
import { useState } from "react";

const libraries = ["places"];
const mapContainerStyle = {
    width: "80vw",
    height: "80vh"
};

export const Map = () => {
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDUTbZbNn8fOZ8QXaYc_PoQqTP3HqMWsDI',
        libraries,
    });
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    const center = {
        lat: -32.889894119559635,
        lng: -68.84615948128344,
    };


    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };
    const asd =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
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
                    <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: '/cat.png',
                            scaledSize: new window.google.maps.Size(30, 30),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                        }}
                    />
                ))}

            </GoogleMap></div>
    )
}
