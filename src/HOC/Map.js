import React from "react";
import { withGoogleMap, withScriptjs } from "react-google-maps";
import { Google_Map_URL, MAP_KEY } from "../config";

const MapWrappedComponent = (WrappedComponent) => {
  const MapWrapped = withScriptjs(withGoogleMap(WrappedComponent));

  return (
    <div style={{ width: "auto", height: "500px" }}>
      <MapWrapped
        googleMapURL={`${Google_Map_URL}?v=3.exp&libraries=geometry,drawing,places&key=${MAP_KEY}`}
        // loadingElement={<div style={{ height: `100%` }} />}
        // containerElement={<div style={{ height: `100%` }} />}
        // mapElement={<div style={{ height: `100%` }} />}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "60vh" }} />}
        defaultCenter={{ lat: 22.571695590417033, lng: 88.50591509173454 }}
        defaultZoom={14}
      />
    </div>
  );
};
export default MapWrappedComponent;
