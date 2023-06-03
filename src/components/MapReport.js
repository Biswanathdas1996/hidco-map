import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Polyline,
  Circle,
  Marker,
} from "react-google-maps";

import CircleViewDetailsModal from "../components/CircleViewDetailsModal";
import VisitTable from "./VisitTable";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const API_KEY = "AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA&amp";

const options = {
  fillColor: "lightblue",
  fillOpacity: 1,
  strokeColor: "red",
  strokeOpacity: 1,
  strokeWeight: 10,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

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

const Map = withScriptjs(
  withGoogleMap(({ data, routsData, handleOpen }) => {
    console.log("--data--->", data);

    return (
      <>
        <GoogleMap
          defaultCenter={{
            lat: routsData?.centerLat,
            lng: routsData?.centerLong,
          }}
          defaultZoom={14}
        >
          {data?.locations &&
            data?.locations?.map((val) => {
              let color;
              if (val?.isVisited) {
                color = "green";
              } else {
                color = "#FF0000";
              }
              return (
                <>
                  <Circle
                    center={{ lat: val?.lat, lng: val?.long }}
                    radius={val?.radius}
                    onClick={() => handleOpen(val)}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: color,
                      fillOpacity: 0.35,
                    }}
                  />
                  <Marker
                    position={{ lat: val?.lat, lng: val?.long }}
                    optimized={true}
                    draggable={false}
                    label={`${val?.name}`}
                    color="#3498DB"
                    icon={{
                      url: `https://maps.google.com/mapfiles/kml/paddle/red-stars.png`,
                      scaledSize: { width: 1, height: 1 },
                    }}
                  />
                </>
              );
            })}
          {/* <Polyline
            path={data?.locations?.map((val) => ({
              lat: val?.lat,
              lng: val?.long,
            }))}
            options={options}
          /> */}
        </GoogleMap>
      </>
    );
  })
);

export default function App({ data, routsData }) {
  const [open, setOpen] = React.useState(false);
  const [clickedPlace, setClickedPlace] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = (text) => {
    setOpen(true);
    setClickedPlace(text);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <CircleViewDetailsModal
        open={open}
        onClose={handleClose}
        clickedPlace={clickedPlace}
      />
      <Box sx={{ width: "100%", padding: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", padding: 0 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Map View" {...a11yProps(0)} />
            <Tab label="List View" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} style={{ padding: 0 }}>
          <div style={{ height: "60vh", width: "100%", padding: 0 }}>
            <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "60vh" }} />}
              data={data}
              routsData={routsData}
              handleOpen={handleOpen}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={{ marginTop: "2rem", zIndex: 2 }}>
            <VisitTable locations={data?.locations} handleOpen={handleOpen} />
          </div>
        </TabPanel>
      </Box>
    </>
  );
}
