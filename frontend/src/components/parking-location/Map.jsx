//import { GoogleMap, useLoadScript, Marker, InfoWIndow, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import "./styles/estacionamiento.css";
import { createRoutesFromElements } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { formatRelative } from "date-fns";

import { toast } from 'react-toastify';
import { propertyA } from "../messages/Messages";
import 'react-toastify/dist/ReactToastify.css';
import "../messages/MessageStyles.css";
const API = process.env.REACT_APP_API_USER;
const API_LOCATION = process.env.REACT_APP_API_LOCATION;
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];
const mapContainerStyle = {
  //width: "80vw",
  width: "100%",
  height: "80vh",
};

export const Map = (props) => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);
  const [users, setUsers] = useState([]);
  const [userLogueado, setUserLogueado] = useState(true);
  const [updateWorkZone, setUpdateWorkZone] = useState(props.updateWorkZone);
  const usuario_id = sessionStorage.getItem("usuario_id");
  const token = sessionStorage.getItem("token");
  const [variable, setVerificacion] = useState(true);
  const [center, setCenter] = useState({
    lat: -32.889894119559635,
    lng: -68.84615948128344,
  })

  const [markersUserLogueado, setMarkersUserLogueado] = useState([

    { latitud: "-32.89221637504666", longitud: "-68.84531745624827" }

  ]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });
  /*
    const center = {
      lat: -32.889894119559635,
      lng: -68.84615948128344,
    };
  */
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
      console.log("antes")
      console.dir(data)
      setMarkers(data);
    }
    /*
    if (updateWorkZone) {
      console.log("entra")
      const res2 = await fetch(`${API_LOCATION}/estacionamiento/zonaTrabajo/${usuario_id}`, {
        mmethod: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      const data2 = await res2.json();
      //console.dir(data['patentes'][0])
      console.log("data tarjetaero")
      console.dir(data2)
      const myObject = {
        latitud: data2['latitud'],
        longitud: data2['longitud']
      };
      console.log("ahora el objeto es")
      console.dir(myObject)
      const jsonnn = JSON.stringify(myObject);
      console.log("convertido a json")
      console.dir(jsonnn)
     
      console.log("agregado")
      console.dir(markersUserLogueado)
      


    }
    */

  };

  //Guardar el o los markers (zonas de trabajo) y mandarlas a la base de datos
  const saveCoordinates = async (markers) => {
    const latitud = markers[0]["latitud"];
    const longitud = markers[0]["longitud"];
    const time = markers[0]["time"];

    //Se utiliza la API inversa de Geocoding para convertir lat/lng a direcciòn y guardarla en la base de datos
    const respGeocoding = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=${API_KEY}`,
      {
        method: "GET",
      }
    );
    const respGeo = await respGeocoding.json();
    console.log(respGeo);
    const calle = respGeo["results"][0]["formatted_address"];

    //Se envian las coordenadas y la direcciones al servidor
    const res = await fetch(`${API_LOCATION}/estacionamiento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        latitud,
        longitud,
        calle,
        usuario_id,
      }),
    });
    const resp = await res.json();
    if (resp && resp[1]["code"] == 201) {
      toast.success(resp[0]["message"] + calle, propertyA);
      //window.confirm(resp[0]["message"]);
    } else {
      toast.error("No se pudo actualizar zona de trabajo", propertyA);
      //window.confirm("No se pudo actualizar zona de trabajo");
    }
    console.log(resp);
  };

  const onMapClick = React.useCallback((event) => {
    const usuario_logueado = "no";
    if (updateWorkZone) {
      setMarkers(() => [
        {
          latitud: event.latLng.lat(),
          longitud: event.latLng.lng(),
          time: new Date(),
        },
      ]);
      setCenter({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      })
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
      <br></br>

      {updateWorkZone ? (
        <>
          <p className="infoWorkZone">Presione en el mapa donde este ubicada su zona de trabajo y oprima guardar.</p>
          <button
            type="button"
            id="signup-button"
            /*className="btn btn-info"*/
            className="buttonLugaresDisponiblesSucces"
            onClick={(e) => saveCoordinates(markers, usuario_id)}
          >
            Guardar coordenadas
          </button>
          <br></br>
          <p></p>
        </>
      ) :
        <h1>
          Estacionamiento <span role="img" aria-label="tent"></span>
        </h1>
      }

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
          <Marker
            key={marker.calle + "_" + Date.now()}
            position={{
              lat: Number(marker.latitud),
              lng: Number(marker.longitud),
            }}
            icon={{
              url: "/logo_park.PNG",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}




        {updateWorkZone == false && selected ? (
          <InfoWindow
            position={{
              lat: Number(selected.latitud),
              lng: Number(selected.longitud),
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h5>Lugares disponibles: {selected.cantidad_disponible}</h5>
              <h5>Calle: {selected.calle}</h5>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};
