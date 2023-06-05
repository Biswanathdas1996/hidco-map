import React, { useEffect, useRef } from "react";
export const MAP_KEY = "AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA";

function MapComponent({ sourceData, destiNationData }) {
  const mapRef = useRef(null);
  const directionsRenderersRef = useRef([]);
  const markersRef = useRef([]);

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
    // Initialize the map
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.7749, lng: -122.4194 }, // Set the initial map center
      zoom: 13, // Set the initial zoom level
    });

    // Create the DirectionsRenderers for each destination

    const destinations = destiNationData?.map((val) => ({
      location: new window.google.maps.LatLng(val?.lat, val?.long),
      label: val?.name,
    }));

    const directionsRenderers = destinations.map(
      () =>
        new window.google.maps.DirectionsRenderer({
          map: map,
        })
    );

    const markers = destinations.map((destination) => {
      const marker = new window.google.maps.Marker({
        position: destination.location,

        label: {
          text: destination.label,
          color: "black",
          fontSize: "12px",
          fontWeight: "bold",
        },
        icon: {
          url: `https://maps.google.com/mapfiles/kml/paddle/grn-stars.png`,
        },
        map: map,
      });
      return marker;
    });

    directionsRenderersRef.current = directionsRenderers;
    markersRef.current = markers;
    // Render directions for each destination
    renderDirections(destinations);
  };

  const renderDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const origin = new window.google.maps.LatLng(sourceData); // Source point

    const destinations = destiNationData?.map(
      (val) => new window.google.maps.LatLng(val?.lat, val?.long)
    );

    destinations.forEach((destination, index) => {
      const request = {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (response, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderersRef.current[index].setDirections(response);
        }
      });
    });
  };

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "700px" }}></div>
    </div>
  );
}

export default MapComponent;
