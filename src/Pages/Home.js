import * as React from "react";
import { get, post } from "../helper/apiHelper";
import { validateResponseUser } from "../helper/validateResponse";
import dayjs from "dayjs";
import "../css/dashboard.css";
import PublicMap from "../components/PublicMap";
import AutocompliteInput from "../components/AutocompliteInput";
import FormControl from "@mui/material/FormControl";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";

const sampleData = [
  {
    id: 1,
    name: "rr",
    center: "Barasat",
    centerLat: 22.577152,
    centerLong: 88.5096448,
    radius: 0,
    status: true,
    createdAt: "2023-06-02T09:25:05.435Z",
    updatedAt: "2023-06-02T09:25:05.435Z",
  },
  {
    id: 5,
    name: "Route 2",
    center: "Barasat",
    centerLat: 22.56025627345084,
    centerLong: 88.5176386170709,
    radius: 1000,
    status: true,
    createdAt: "2023-06-02T10:37:04.416Z",
    updatedAt: "2023-06-02T10:37:04.416Z",
  },
];
// const sampleData = [
//   {
//     id: 8,
//     name: "Sapurji ",
//     lat: 22.571725370383422,
//     long: 88.50618249744969,
//     radius: 1150,
//     routeId: 1,
//     refId: 1,
//     isVisited: true,
//   },
//   {
//     id: 1,
//     name: "center 1",
//     lat: 38.9847719,
//     long: -77.5619419,
//     radius: 50,
//     routeId: 1,
//     refId: 1,
//     isVisited: false,
//     visitData: {},
//   },
//   {
//     id: 2,
//     name: "center 2",
//     lat: 38.983409741644955,
//     long: -77.5611265089506,
//     radius: 500,
//     routeId: 1,
//     refId: 1,
//     isVisited: false,
//     visitData: {},
//   },
//   {
//     id: 9,
//     name: "Place 2",
//     lat: 22.54522904910307,
//     long: 88.51922464974501,
//     radius: 50,
//     routeId: 1,
//     refId: 1,
//     isVisited: false,
//     visitData: {},
//   },
// ];

let watchId;

export default function FolderList() {
  const [routes, setRoutes] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = React.useState(
    dayjs(new Date()).format("DD-MM-YYYY")
  );
  const [selectedPoliceStation, setSelectedPoliceStation] =
    React.useState(null);
  const [reCenterLoocation, setReCenterLoocation] = React.useState(null);
  const [liveCenter, setLiveCenter] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [isInsideCircle, setIsInsideCircle] = React.useState(false);
  const [locations, setLocations] = React.useState(sampleData);

  React.useEffect(() => {
    fetchRoutes(date);
    const user = localStorage.getItem("x-user-data");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const fetchRoutes = async (date) => {
    setRoutes(null);
    setLoading(true);
    const response = await post("/user/getRoutes", {
      date: date,
    });
    if (validateResponseUser(response)) {
      setRoutes(response?.data);
    }
    setLoading(false);
  };

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
      console.log("----------------->", liveCenterData);
    }
  };

  const findRoute = () => {
    fetchRoutes(date);
  };

  const selectedPoliceStationCallback = (data) => {
    console.log("---->", data);
    setSelectedPoliceStation(data?.id);
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
  console.log("reCenterLoocation", reCenterLoocation);
  return (
    <body className="d-flex flex-column h-100">
      <div className="bg-default" style={{ zIndex: 0 }}></div>

      <main className="flex-shrink-0 main-foot-adjust" style={{ zIndex: 1 }}>
        <div className="container pt-5">
          <div className="row profile-dtl">
            <div className="col-2">
              <div className="img-hldr">
                <img
                  src={user?.image && user?.image}
                  alt=""
                  height={50}
                  width={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
            </div>
            <div className="col-8">
              <div className="desc-hldr">
                <h2>Welcome</h2>
                <p>To Alipore Museum </p>
              </div>
            </div>
          </div>

          <div className="container find-duty-hldr mb-4">
            <div className="datepicker">
              <div className="mb-3 mt-3">
                <FormControl size="small" fullWidth>
                  <AutocompliteInput
                    data={locations}
                    onchangeCallback={selectedPoliceStationCallback}
                  />
                </FormControl>
              </div>
            </div>
            <div className="time-picker-hldr">
              {sampleData?.slice(0, 3)?.map((data) => (
                <div className="time-hldr">
                  <div className="time">{data?.name}</div>
                  {/* <div className="time-icon">
                      <img src="../images/icon-time.png" alt="" />
                    </div> */}
                </div>
              ))}
            </div>
            <div className="container">
              <button className="find-btn" onClick={() => findRoute()}>
                <span>
                  <img src="../images/loupe.png" alt="" />
                </span>
                <div className="txt-hldr pl-3" style={{ color: "white" }}>
                  Find Places
                </div>
              </button>
            </div>
          </div>

          {/* <div className="container route-info-hdr">
            <span>
              <img src="../images/route.png" alt="" />
            </span>
            <h3>
              <strong>Route Information</strong> List
            </h3>
          </div> */}

          <div className="container">
            {reCenterLoocation ? (
              <PublicMap
                locations={sampleData}
                reCenterLoocation={reCenterLoocation}
                isInsideCircle={isInsideCircle}
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
                <div className="col-9">
                  <p className="text-black">Re-center</p>
                </div>
                <div
                  className="col-2"
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
        </div>
      </main>
    </body>
  );
}
