import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  Polyline,
} from "react-google-maps";
import { MAP_KEY } from "../../config";
import CarIcon from "../../assets/pcr.png";

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

let watchId;
const Map = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
      onClick={props.onMapClick}
    >
      <Marker
        position={props.markerPosition}
        icon={{ url: CarIcon, scaledSize: { width: 60, height: 50 } }}
      />
      <Polyline path={props?.lineData} options={options} />
    </GoogleMap>
  ))
);

const MapContainer = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [lineData, setLineData] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      trackFetchLocation();
    }, 10000);
    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearInterval(intervalId);
    };
  }, []);

  const trackFetchLocation = () => {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const positionData = { lat: latitude, lng: longitude };
        setCurrentPosition(positionData);
        const prevDataStr = localStorage.getItem("live-track");

        if (prevDataStr) {
          const prevData = JSON.parse(prevDataStr);
          console.log(
            "prevData[prevData?.length - 1]?.lat",
            prevData[prevData?.length - 1]?.lat
          );
          console.log("positionData?.lat", positionData?.lat);
          if (prevData[prevData?.length - 1]?.lat != positionData?.lat) {
            prevData.push(positionData);

            localStorage.setItem("live-track", JSON.stringify(prevData));
            setLineData(prevData);
          }
        } else {
          localStorage.setItem("live-track", JSON.stringify([positionData]));
          setLineData([positionData]);
          console.log("positionData", positionData);
        }
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, maximumAge: 20000, timeout: 10000 }
    );
  };

  useEffect(() => {
    let animationId;

    function keepScreenOn() {
      animationId = window.requestAnimationFrame(keepScreenOn);
    }

    keepScreenOn();

    const handleScreenChange = () => {
      if (window.screen && window.screen.keepAwake) {
        window.screen.keepAwake = true;
      }
    };

    handleScreenChange();

    document.addEventListener("visibilitychange", handleScreenChange);

    return () => {
      window.cancelAnimationFrame(animationId);
      document.removeEventListener("visibilitychange", handleScreenChange);
    };
  }, []);
  console.log("lineData", lineData);
  return (
    <>
      {currentPosition ? (
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "60vh" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          center={currentPosition}
          zoom={16}
          markerPosition={currentPosition}
          lineData={lineData}
        />
      ) : (
        <center>
          <div className="loader" style={{ marginTop: "10rem" }}></div>
        </center>
      )}
    </>
  );
};

export default MapContainer;
