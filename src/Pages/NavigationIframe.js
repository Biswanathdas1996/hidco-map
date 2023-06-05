import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import AutocompliteInput from "../components/AutocompliteInput";
import FormControl from "@mui/material/FormControl";
import { get } from "../helper/apiHelper";
import { validateResponseUser } from "../helper/validateResponse";
import { useLocation } from "react-router-dom";
import SearchPlaces from "../components/SearchPlaces";
import HorizontalPlaceScroll from "../components/HorizontalPlaceScroll";
import Compass from "../components/Compass";
import Fab from "@mui/material/Fab";

export const MAP_KEY = "AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA";

let watchId;
const MapWithDirections = () => {
  const { source, destinationdata } = useParams();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sourcePlaceID = params.get("sourcePlaceID");
  const destinationPlaceId = params.get("destinationPlaceId");

  const [locations, setLocations] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [reCenterLoocation, setReCenterLoocation] = React.useState(null);
  const [marker, setMarker] = React.useState(null);

  const fetchData = async () => {
    setLoading(true);
    const responseRoutes = await get(`/user/getRoutes`);
    if (validateResponseUser(responseRoutes)) {
      setLoading(false);

      const allLocations = responseRoutes?.data?.flatMap(
        (route) => route.locations
      );
      setLocations(allLocations);
    } else {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // --------------------------------------------------Live tracking ------------

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const trackFetchLocation = () => {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const positionData = { lat: latitude, lng: longitude };
        setReCenterLoocation(positionData);
        marker && marker.setPosition(positionData);
        setLoading(false);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, maximumAge: 20000, timeout: 10000 }
    );
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      trackFetchLocation();
    }, 3000);
    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearInterval(intervalId);
    };
  }, [trackFetchLocation]);

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
  }, [destinationdata, source]);

  useEffect(() => {
    reCenterLoocation && marker && marker.setPosition(reCenterLoocation);
  }, [reCenterLoocation, marker]);

  const initMap = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 22.56025627345084, lng: 88.5176386170709 },
      zoom: 15,
    });

    const marker =
      reCenterLoocation &&
      new window.google.maps.Marker({
        position: reCenterLoocation, // Marker position
        icon: {
          url: `https://maps.google.com/mapfiles/kml/paddle/purple-stars.png`,
        },
        map, // Map instance
        label: {
          text: "You are here",
          color: "black",
          fontSize: "12px",
          fontWeight: "bold",
        },
      });
    setMarker(marker);

    directionsRenderer.setMap(map);

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

  const findPlace = (destination, destinationId = null) => {
    setLoading(true);
    setTimeout(() => {
      const source = `${reCenterLoocation?.lat},${reCenterLoocation?.lng}`;
      window.location.href = `#/navigation/${source}/${destination}?sourcePlaceID=&destinationPlaceId=${destinationId}`;
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {!loading ? (
        <>
          <div style={{ marginTop: 20 }}>
            {locations && (
              <HorizontalPlaceScroll
                locations={locations}
                findPlace={findPlace}
              />
            )}
          </div>
          {locations && !loading && (
            <SearchPlaces
              locations={locations}
              destinationPlaceId={destinationPlaceId}
              sourcePlaceID={sourcePlaceID}
            />
          )}
        </>
      ) : (
        <center style={{ width: "auto", height: "30vh", paddingTop: "4rem" }}>
          <div className="loader"></div>
        </center>
      )}
      <div id="map" style={{ width: "100%", height: "600px" }} />
      <br />
      <br />
      <br />
      <Fab
        color="secondary"
        aria-label="add"
        style={{
          bottom: "-18rem",
          right: "35%",
          position: "absolute",
        }}
      >
        <Compass />
      </Fab>
    </>
  );
};

export default MapWithDirections;
