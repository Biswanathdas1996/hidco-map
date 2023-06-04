import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MapForm from "../../components/MapForm";
import TextField from "@mui/material/TextField";
import ListOfRoutes from "../../components/ListOfRoutes";
import AutocompliteInput from "../../components/AutocompliteInput";
import AddCircleMap from "./AddCircleMap";
import { validateResponseUser } from "../../helper/validateResponse";
import { get } from "../../helper/apiHelper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const AddCircleToRoutsView = ({
  open,
  handleClose,
  selectLocation,
  updatedPointer,
  setName,
  radius,
  setRadius,
  addPlace,
  routeData,
  handleClick,
  choosedLocation,
  deletLocation,
  handleMapClick,
  selectedPoliceStationCallback,
  loding,
}) => {
  const [markerLocation, setSelectMarkerLocation] = React.useState(null);
  const [locationType, setLocationsType] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setSelectMarkerLocation({
        lat: latitude,
        lng: longitude,
      });
    });
  };

  const fetchData = async () => {
    setLoading(true);

    const responseLocationType = await get(`/getLocationTypes`);
    if (validateResponseUser(responseLocationType)) {
      setLoading(false);
      setLocationsType(responseLocationType?.data);
    } else {
      setLoading(false);
    }
  };

  let watchId;

  React.useEffect(() => {
    getCurrentLocation();
    fetchData();
  }, []);

  const trackFetchLocation = () => {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const positionData = { lat: latitude, lng: longitude };
        setSelectMarkerLocation(positionData);
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

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectLocation && (
            <MapForm markers={null} updatedPointer={updatedPointer} />
          )}
          <br />
          {!loading ? (
            <AutocompliteInput
              data={locationType}
              onchangeCallback={selectedPoliceStationCallback}
            />
          ) : (
            <b>Please wait...</b>
          )}

          <TextField
            id="outlined-basic"
            label="Enter Name"
            variant="outlined"
            style={{ marginTop: 10, width: "100%" }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Circle center"
            variant="outlined"
            value={JSON.stringify(selectLocation)}
            style={{ marginTop: 10, width: "100%", display: "none" }}
            disabled
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Circle Radius (in meters)"
            variant="outlined"
            style={{ marginTop: 10, width: "100%" }}
            onChange={(e) => setRadius(e.target.value)}
            defaultValue={radius}
          />
          <br />
          <br />
          {!loding ? (
            <>
              <button
                type="button"
                onClick={() => addPlace()}
                className="admin-button"
              >
                Add Circle
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="admin-close-button"
              >
                Close
              </button>
            </>
          ) : (
            <center style={{ width: "auto" }}>
              <div className="loader"></div>
            </center>
          )}
        </Box>
      </Modal>
      <h2 style={{ padding: 12, marginTop: "2rem" }}>
        <b>Add Circles to routes</b>
      </h2>

      {routeData && (
        <>
          <AddCircleMap
            defaultCenter={{
              lat: routeData?.centerLat,
              lng: routeData?.centerLong,
            }}
            handleMapClick={handleMapClick}
            markerLocation={markerLocation}
            handleClick={handleClick}
            choosedLocation={choosedLocation}
          />
          {/* <GoogleMap
            defaultCenter={{
              lat: routeData?.centerLat,
              lng: routeData?.centerLong,
            }}
            defaultZoom={13}
            onClick={(e) => handleMapClick(markerLocation)}
          >
            <Marker
              key={10000}
              position={markerLocation}
              color="#3498DB"
              title={"You are here"}
              label={"You are here"}
              icon={{
                url: `https://maps.google.com/mapfiles/kml/paddle/purple-stars.png`,
                scaledSize: { width: 50, height: 50 },
              }}
              onClick={(e) => handleClick(e)}
            />
            {choosedLocation?.map((marker, index) => (
              <>
                <Marker
                  key={index}
                  position={{ lat: marker?.lat, lng: marker?.long }}
                  title={marker?.name}
                  label={marker?.name}
                />
                <Circle
                  center={{ lat: marker?.lat, lng: marker?.long }}
                  radius={marker?.radius}
                  options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                  }}
                />
              </>
            ))}
          </GoogleMap> */}
          <div style={{ margin: 10 }}>
            <ListOfRoutes
              routeData={choosedLocation}
              deletLocation={deletLocation}
            />

            <br />
            <div
              className="login-button"
              onClick={() => window.location.replace("#/admin/list-of_routs")}
            >
              <button type="button" className="btn">
                <div className="text">
                  <h6>Done</h6>
                </div>
              </button>
            </div>
            <br />
            <br />
            <br />
          </div>
        </>
      )}
    </>
  );
};

export default AddCircleToRoutsView;
