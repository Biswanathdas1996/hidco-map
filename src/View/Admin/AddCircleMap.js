import React, { useEffect } from "react";
export const MAP_KEY = "AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA";

const GoogleMap = ({
  defaultCenter,
  handleMapClick,
  markerLocation,
  handleClick,
  choosedLocation,
}) => {
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
  }, []);

  const initMap = () => {
    // Create a new Google Map instance
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: defaultCenter, // Initial position
      zoom: 15, // Initial zoom level
    });

    map.addListener("click", (e) => {
      // Handle the marker click event here
      handleMapClick(markerLocation);
      console.log("Marker clicked!");
    });

    // Add a marker to the map
    const marker = new window.google.maps.Marker({
      position: markerLocation, // Marker position
      map, // Map instance
      label: {
        text: "You are here",
        color: "black",
        fontSize: "12px",
        fontWeight: "bold",
      },
    });
    // Add a click event listener to the marker
    marker.addListener("click", (e) => {
      // Handle the marker click event here
      handleClick(e);
      console.log("Marker clicked!");
    });

    choosedLocation.forEach((marker) => {
      const circle = new window.google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: { lat: marker?.lat, lng: marker?.long },
        radius: marker?.radius, // In meters
      });

      // Add a click event listener to the circle
      circle.addListener("click", () => {
        // Handle the circle click event here
        console.log("Circle clicked!");
      });
    });
  };

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default GoogleMap;
