import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import MapIcon from "@mui/icons-material/Map";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProgressBar from "./ProgressBar";

function calculatePercentage(total, currentCount) {
  const val = (currentCount / total) * 100;
  if (val) {
    return parseFloat(val).toFixed(0);
  }
  return 0;
}

export function FolderList({ routes }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 400,
        bgcolor: "background.paper",
        padding: 0,
      }}
    >
      {routes ? (
        routes?.map((route, index) => {
          return (
            <div
              className="list-hldr"
              key={`cers-${index}`}
              style={{ marginTop: 5 }}
            >
              <div className="img-hldr">
                <img src="../images/location.jpeg" alt="" />
              </div>
              <div className="desc-hldr">
                <p>
                  <strong>{route?.route?.name}</strong>
                </p>
                <p>
                  <small style={{ fontWeight: 200, color: "#3c3c3c" }}>
                    {route?.completedAt ? `Completed at` : `Start time`}
                  </small>
                  {/* {route?.date} */}
                  <br />

                  {route?.completedAt
                    ? dayjs(new Date(route?.completedAt)).format(
                        "DD-MM-YYYY hh:mm A"
                      )
                    : dayjs(new Date(route?.startTime * 1000)).format(
                        "DD-MM-YYYY hh:mm A"
                      )}
                </p>
                <ProgressBar
                  value={calculatePercentage(
                    route?.totalLocations,
                    route?.totalVisited
                  )}
                />
              </div>
              <div
                className="lst-btn-hldr"
                onClick={() =>
                  (window.location.href = `#/map/${route?.route?.id}/${route?.date}`)
                }
              >
                <button>
                  <img src="../images/ArrowBarUp.png" alt="" />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <center>
          <div className="loader"></div>
        </center>
      )}
    </List>
  );
}

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
        <Box sx={{ pt: 1 }}>
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

export default function BasicTabs({ routes }) {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    console.log("----routes", routes);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const completedRoutes = routes?.filter(
    (route) => route?.completedAt !== null
  );
  const pendingRoutes = routes?.filter((route) => route?.completedAt === null);
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", padding: 0 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ padding: 0 }}
        >
          <Tab label={"Completed"} {...a11yProps(0)} />
          <Tab label={"Pending"} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {completedRoutes?.length > 0 ? (
          <FolderList routes={completedRoutes} />
        ) : (
          <div className="register mt-4">
            <p>
              No <strong>route</strong> found
            </p>
          </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1} style={{ padding: 0 }}>
        {pendingRoutes?.length > 0 ? (
          <FolderList routes={pendingRoutes} />
        ) : (
          <div className="register mt-4">
            <p>
              No <strong>route</strong> found
            </p>
          </div>
        )}
      </TabPanel>
    </>
  );
}
