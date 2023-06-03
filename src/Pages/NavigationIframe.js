import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import AutocompliteInput from "../components/AutocompliteInput";
import FormControl from "@mui/material/FormControl";
import { get } from "../helper/apiHelper";
import { validateResponseUser } from "../helper/validateResponse";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

export const MAP_KEY = "AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA";

const MapWithDirections = () => {
  const { source, destinationdata } = useParams();

  const [locations, setLocations] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [selectedSource, setSelectedSource] = React.useState(null);
  const [selectedDestination, setSelectedDestination] = React.useState(null);

  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    if (event.target.value === "0") {
      getCurrentLocation();
    }
    setValue(event.target.value);
  };

  const selectSourceLocation = (data) => {
    console.log(data);
    setSelectedSource(data);
  };
  const selectDestinationLocation = (data) => {
    console.log(data);
    setSelectedDestination(data);
  };

  const findPlace = async () => {
    const source = `${selectedSource?.lat},${selectedSource?.long}`;
    const destination = `${selectedDestination?.lat},${selectedDestination?.long}`;
    window.location.replace(`#/navigation/${source}/${destination}`);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setSelectedSource({
        lat: latitude,
        long: longitude,
      });
    });
  };

  const fetchData = async () => {
    setLoading(true);
    const responseRoutes = await get(`/user/getRoutes`);
    if (validateResponseUser(responseRoutes)) {
      setLoading(false);

      const allLocations = responseRoutes?.data?.flatMap(
        (route) => route.locations
      );
      setLocations(allLocations);
      console.log("allLocations====>", allLocations);
    } else {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <>
      {!loading ? (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider", margin: 2 }}>
            <div className="container find-duty-hldr mb-4">
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Where from?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Current location"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Custom"
                  />
                </RadioGroup>
              </FormControl>
              <br />
              {value && value !== "0" && (
                <div className="datepicker">
                  <div className="mb-3 mt-0">
                    <FormControl size="small" fullWidth>
                      <AutocompliteInput
                        data={locations}
                        onchangeCallback={selectSourceLocation}
                      />
                    </FormControl>
                  </div>
                </div>
              )}

              <FormLabel id="demo-controlled-radio-buttons-group">
                Where to?
              </FormLabel>
              <div className="datepicker">
                <div className="mb-3 mt-0">
                  <FormControl size="small" fullWidth>
                    <AutocompliteInput
                      data={locations}
                      onchangeCallback={selectDestinationLocation}
                    />
                  </FormControl>
                </div>
              </div>

              <div className="container">
                <button className="find-btn" onClick={() => findPlace()}>
                  <span>
                    <img src="../images/loupe.png" alt="" />
                  </span>
                  <div className="txt-hldr pl-3" style={{ color: "white" }}>
                    {window.site_text(`pages.map.find_places`)}
                  </div>
                </button>
              </div>
            </div>
          </Box>
        </>
      ) : (
        <center style={{ width: "auto", height: "30vh", paddingTop: "4rem" }}>
          <div className="loader"></div>
        </center>
      )}
      <div id="map" style={{ width: "100%", height: "600px" }} />
    </>
  );
};

export default MapWithDirections;
