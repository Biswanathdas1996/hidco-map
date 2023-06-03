import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const MAP_KEY = "AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA";

const MapWithDirections = () => {
  const { source, destinationdata } = useParams();

  useEffect(() => {
    // Load the Google Maps JavaScript API script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      // Initialize the map once the script has loaded
      initMap();
    });

    // Clean up the script tag
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 22.56025627345084, lng: 88.5176386170709 },
      zoom: 15,
    });
    directionsRenderer.setMap(map);

    console.log("source", source);

    const sourceSplit = source.split(",");
    const destinationdataSplit = destinationdata.split(",");
    console.log("destinationdata", destinationdata);

    const origin = new window.google.maps.LatLng(
      Number(sourceSplit[0]),
      Number(sourceSplit[1])
    );
    const destination = new window.google.maps.LatLng(
      Number(destinationdataSplit[0]),
      Number(destinationdataSplit[1])
    );

    console.log("origin", origin);
    console.log("destination", destination);

    const request = {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.WALKING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      }
    });
  };

  return <div id="map" style={{ width: "100%", height: "600px" }} />;
};

export default MapWithDirections;
