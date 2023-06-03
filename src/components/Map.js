/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

export const MAP_KEY = "AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA";

export default function Map({
  defaultZoom,

  handleClick,
  currentLocation,
  user,
  isInsideCircle,
  locations,
  handleOpen,
  reCenterLoocation,
}) {
  const [markerPosition, setMarKerPostion] = React.useState(reCenterLoocation);

  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = React.useState(null);

  useEffect(() => {
    // Load the Google Maps JavaScript API script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}`;
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
  }, [isInsideCircle]);

  useEffect(() => {
    if (map && marker) {
      reCenterLoocation && marker && marker.setPosition(reCenterLoocation);

      // Center the map on the updated marker position
      // reCenterLoocation && map && map.setCenter(reCenterLoocation);
    }
  }, [reCenterLoocation]);

  const initMap = () => {
    // Create a new Google Map instance
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: currentLocation, // Initial position
      zoom: defaultZoom, // Initial zoom level
    });

    // Add a marker to the map

    const marker =
      markerPosition &&
      new window.google.maps.Marker({
        position: markerPosition, // Marker position
        icon: {
          url: `https://maps.google.com/mapfiles/kml/paddle/${
            isInsideCircle ? `grn-stars.png` : `purple-stars.png`
          }`,
        },
        map, // Map instance
        label: {
          text: "You are here",
          color: "black",
          fontSize: "12px",
          fontWeight: "bold",
        },
      });

    locations &&
      locations.forEach((val) => {
        let color;

        if (val?.isVisited) {
          color = "green";
        } else {
          color = "#FF0000";
        }

        const circle = new window.google.maps.Marker({
          position: { lat: val?.lat, lng: val?.long }, // Marker position
          map, // Map instance
          label: {
            text: val?.name,
            color: "black",
            fontSize: "12px",
            fontWeight: "bold",
          },
        });

        new window.google.maps.Circle({
          strokeColor: "#000000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
          map,
          center: { lat: val?.lat, lng: val?.long },
          radius: val?.radius,
        });

        // Add a click event listener to each circle
        circle.addListener("click", () => {
          handleOpen(val);
          // Handle the circle click event here
          console.log("Circle clicked!");
        });
      });

    setMap(map);
    setMarker(marker);
  };

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
}
