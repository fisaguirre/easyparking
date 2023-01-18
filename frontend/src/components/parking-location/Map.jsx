import { GoogleMap, useLoadScript, Marker, InfoWIndow } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
};

export const Map = () => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDUTbZbNn8fOZ8QXaYc_PoQqTP3HqMWsDI',
        libraries,
    });
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    const center = {
        lat: 43.6532,
        lng: -79.3832,
    };

    return (
        <div>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
            ></GoogleMap></div>
    )
}
