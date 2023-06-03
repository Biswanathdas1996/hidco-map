import React, { useEffect } from "react";
export const MAP_KEY = "AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA";

const GoogleMap = ({ locations, reCenterLoocation, isInsideCircle }) => {
  const [markerPosition, setMarKerPostion] = React.useState(reCenterLoocation);

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

  const initMap = () => {
    // Create a new Google Map instance
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: reCenterLoocation, // Initial position
      zoom: 15, // Initial zoom level
    });

    const marker =
      reCenterLoocation &&
      new window.google.maps.Marker({
        position: markerPosition, // Marker position
        icon: {
          url: `https://maps.google.com/mapfiles/kml/paddle/${
            isInsideCircle ? `grn-stars.png` : `purple-stars.png`
          }`,
        },
        map, // Map instance
      });
    // Add a click event listener to the marker
    marker.addListener("click", () => {
      // Handle the marker click event here
      console.log("Marker clicked!");
    });

    locations &&
      locations.forEach((val) => {
        let color;

        if (val?.isVisited) {
          color = "green";
        } else {
          color = "#FF0000";
        }

        const circle = new window.google.maps.Circle({
          strokeColor: "#000000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35,
          map,
          center: { lat: val?.centerLat, lng: val?.centerLong },
          radius: val?.radius,
        });

        // Add a click event listener to each circle
        circle.addListener("click", () => {
          //   handleOpen(val);
          // Handle the circle click event here
          console.log("Circle clicked!");
        });
      });
  };

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default GoogleMap;
