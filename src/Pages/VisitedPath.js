import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Polyline,
} from "react-google-maps";
import coordinates from "../Data/coordinates.json";

const API_KEY = "AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA&amp";

const options = {
  fillColor: "lightblue",
  fillOpacity: 1,
  strokeColor: "red",
  strokeOpacity: 1,
  strokeWeight: 10,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

const Map = withScriptjs(
  withGoogleMap(({ coordinates }) => (
    <GoogleMap
      defaultCenter={{ lat: 22.571695590417033, lng: 88.50591509173454 }}
      defaultZoom={13}
    >
      <Polyline path={coordinates} options={options} />
    </GoogleMap>
  ))
);

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "80vh" }} />}
        coordinates={coordinates.coordinates}
      />
    </div>
  );
}
