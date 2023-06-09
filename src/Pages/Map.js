import React from "react";
import Map from "../components/Map";
import CircleViewDetailsModal from "../components/CircleViewDetailsModal";
import CaptureData from "../components/CaptureData";
import { validateResponseUser } from "../helper/validateResponse";
import "../css/dutylist.css";
import VisitTable from "../components/VisitTable";
import HorizontalPlaceScroll from "../components/HorizontalPlaceScroll";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import Button from "@mui/material/Button";
import { get } from "../helper/apiHelper";
import SearchPlaces from "../components/SearchPlaces";
import Compass from "../components/Compass";
import Fab from "@mui/material/Fab";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// const MapWrapped = withScriptjs(withGoogleMap(Map));
let watchId;

function Home() {
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [isInsideCircle, setIsInsideCircle] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [clickedPlace, setClickedPlace] = React.useState(false);
  const [openCamera, setOpenCamera] = React.useState(false);
  const [locations, setLocations] = React.useState(null);

  const [user, setUser] = React.useState(null);
  const [liveCenter, setLiveCenter] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [reCenterLoocation, setReCenterLoocation] = React.useState(null);

  const [locationTypes, setLocationTypes] = React.useState(null);
  const [routeData, setRouteData] = React.useState(null);

  const [clickedLocationType, setClickedLocationType] = React.useState(null);

  const [selectedPoliceStation, setSelectedPoliceStation] =
    React.useState(null);

  const locationTypeClickHandler = (id) => {
    if (clickedLocationType !== id) {
      setClickedLocationType(id);
    } else {
      setClickedLocationType(null);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    setLoading(true);
    const user = localStorage.getItem("x-user-data");
    if (user) {
      setUser(JSON.parse(user));
    }
    const responseLocationType = await get(`/getLocationTypes`);
    if (validateResponseUser(responseLocationType)) {
      setLoading(false);
      setLocationTypes(responseLocationType?.data);
    } else {
      setLoading(false);
    }

    const responseRoutes = await get(`/user/getRoutes`);
    if (validateResponseUser(responseRoutes)) {
      setLoading(false);
      setRouteData(responseRoutes?.data);
      const allLocations = responseRoutes?.data?.flatMap(
        (route) => route.locations
      );
      setLocations(allLocations);
    } else {
      setLoading(false);
    }

    // await setTimeout(() => {
    //   setLocations(sampleData);
    // }, 5000);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (text) => {
    setOpen(true);
    setClickedPlace(text);
  };

  const handleClose = () => setOpen(false);

  const handleOpenCameraClose = () => setOpenCamera(false);

  const checkIfUserInCircle = (locations, latitude, longitude) => {
    // Check if the current location is inside any of the circles
    const circles = locations;
    if (circles) {
      circles.forEach((circle) => {
        const center = { lat: circle?.lat, lng: circle?.long };
        const radius = circle.radius;
        const distanceInMeters =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(latitude, longitude),
            center
          );
        if (distanceInMeters <= radius) {
          setIsInsideCircle(true);
          setLiveCenter(circle);
        }
      });

      const distances = circles.map((circle) => {
        const center = { lat: circle?.lat, lng: circle?.long };
        const radius = circle.radius;
        const distanceInMeters =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(latitude, longitude),
            center
          );
        return { distanceInMeters, radius };
      });

      // check is inside
      const liveCenterData = distances?.filter(
        (data) => data?.distanceInMeters <= data?.radius
      );

      if (liveCenterData?.length === 0) {
        setIsInsideCircle(false);
      }
    }
  };

  // --------------------------------------------------Live tracking ------------

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const trackFetchLocation = () => {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const positionData = { lat: latitude, lng: longitude };
        setReCenterLoocation(positionData);
        checkIfUserInCircle(locations, latitude, longitude);
        setCurrentLocation(positionData);
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

  const getCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({
        lat: latitude,
        lng: longitude,
      });
      setReCenterLoocation({
        lat: latitude,
        lng: longitude,
      });
      setLoading(false);
      // checkIfUserInCircle(locations, latitude, longitude);
    });
  };

  // React.useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  React.useEffect(() => {
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

  const findTotalVisitedCount = locations?.filter(
    (location) => location?.isVisited
  );

  const selectedPoliceStationCallback = (data) => {
    setSelectedPoliceStation(data);
  };

  const findPlace = async (destination, destinationId = null) => {
    const source = `${reCenterLoocation?.lat},${reCenterLoocation?.lng}`;
    window.location.href = `#/navigation/${source}/${destination}?sourcePlaceID=&destinationPlaceId=${destinationId}`;
  };

  console.log("---locations->", locations);
  return (
    <>
      <>
        <CircleViewDetailsModal
          open={open}
          onClose={handleClose}
          clickedPlace={clickedPlace}
          currentLocation={reCenterLoocation}
        />

        {liveCenter && (
          <CaptureData
            open={openCamera}
            onCloseModal={handleOpenCameraClose}
            liveCenter={liveCenter}
          />
        )}
      </>{" "}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, margin: 0 }}>
          <div style={{ marginTop: 20 }}>
            {reCenterLoocation && (
              <HorizontalPlaceScroll
                locations={locations}
                findPlace={findPlace}
              />
            )}
          </div>
          {locations && (
            <SearchPlaces
              locations={locations}
              destinationPlaceId={null}
              sourcePlaceID={null}
            />
          )}
          {/* <div className="container find-duty-hldr mb-4">
            <div className="container">
              <button
                className="find-btn"
                onClick={() =>
                  findPlace(
                    `${selectedPoliceStation?.lat},${selectedPoliceStation?.long}`
                  )
                }
              >
                <span>
                  <img src="../images/loupe.png" alt="" />
                </span>
                <div className="txt-hldr pl-3" style={{ color: "white" }}>
                  {window.site_text(`pages.map.find_places`)}
                </div>
              </button>
            </div>
          </div> */}
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={window.site_text(`pages.map.map_view`)}
              {...a11yProps(0)}
            />
            <Tab
              label={window.site_text(`pages.map.list_view`)}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div style={{ width: "auto", height: "60vh" }}>
            {!loading && locations && reCenterLoocation ? (
              <Map
                locations={locations}
                defaultCenter={reCenterLoocation}
                defaultZoom={16}
                currentLocation={currentLocation}
                isInsideCircle={isInsideCircle}
                handleOpen={handleOpen}
                reCenterLoocation={reCenterLoocation}
              />
            ) : (
              <center
                style={{ width: "auto", height: "60vh", paddingTop: "10rem" }}
              >
                <div className="loader"></div>
              </center>
            )}
            <div className="container grey-location">
              <div className="row routecard">
                <div className="col-4">
                  <p className="text-black">
                    {" "}
                    {window.site_text(`pages.map.re_center`)}
                  </p>
                </div>
                <div className="col-5">
                  <Fab
                    color="secondary"
                    aria-label="add"
                    style={{
                      background: "#ad0004",
                    }}
                  >
                    <Compass />
                  </Fab>
                </div>

                <div
                  className="col-3"
                  style={{ marginTop: "-4rem" }}
                  onClick={() => getCurrentLocation()}
                >
                  <span
                    className="red-circle"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    <FlipCameraAndroidIcon />
                    {/* <img src="../images/Vector.png" alt="" /> */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} style={{ padding: 10 }}>
          <VisitTable locations={locations} handleOpen={handleOpen} />
        </TabPanel>
      </Box>
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          paddingTop: "2rem",
        }}
      >
        {locationTypes?.map((data, index) => {
          return (
            <Button
              variant="outlined"
              size="small"
              style={{ margin: 10, border: "1px solid #343e42" }}
              // onClick={() =>
              //   (window.location.href = `#/nearest-locations/${data?.id}`)
              // }
              onClick={() => locationTypeClickHandler(data?.id)}
            >
              <span style={{ padding: 10 }}>
                {data?.name}
                <div className="time-icon">
                  <img
                    src="../images/icon-time.png"
                    alt=""
                    style={{ marginLeft: 5 }}
                  />
                </div>
              </span>
            </Button>
          );
        })}
      </div>
    </>
  );
}

export default Home;
