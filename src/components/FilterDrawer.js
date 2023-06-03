import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import TuneIcon from "@mui/icons-material/Tune";

export default function TemporaryDrawer({
  selectedOption,
  handleOptionChange,
  routsData,
  users,
  value,
  setValue,
  filter,
  selectedDate,
  setSelectedDate,
  applyFilter,
}) {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const searchData = (anchor, event) => {
    toggleDrawer(anchor, false)(event);
    applyFilter(false);
  };
  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <TuneIcon
            onClick={toggleDrawer(anchor, true)}
            style={{
              fontSize: "2rem",
              marginTop: "1.5rem",
              float: "right",
              marginRight: "1rem",
            }}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            style={{ overflowX: "hidden" }}
          >
            <div className="container p-4 mb-4">
              <div className="datepicker">
                <div className="mb-3 mt-3">
                  <TextField
                    id="select-option"
                    select
                    label="Select Route"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    variant="outlined"
                    style={{ width: "100%" }}
                  >
                    {routsData?.map((option) => (
                      <MenuItem key={option.id} value={option}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {/* {users && (
                    <Autocomplete
                      style={{ width: "100%", marginTop: 10 }}
                      value={value}
                      onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                          setValue({
                            empID: newValue,
                          });
                        } else if (newValue && newValue.inputValue) {
                          // Create a new value from the user input
                          setValue({
                            empID: newValue.inputValue,
                          });
                        } else {
                          setValue(newValue);
                        }
                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some(
                          (option) => inputValue === option.empID
                        );
                        if (inputValue !== "" && !isExisting) {
                          filtered.push({
                            inputValue,
                            title: `Add "${inputValue}"`,
                          });
                        }

                        return filtered;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      id="free-solo-with-text-demo"
                      options={users}
                      getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === "string") {
                          return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        // Regular option
                        return option.empID;
                      }}
                      renderOption={(props, option) => (
                        <li {...props}>{option.empID}</li>
                      )}
                      freeSolo
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Employee ID"
                          style={{ width: "100%", marginTop: 10 }}
                        />
                      )}
                    />
                  )} */}
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{ padding: 17, width: "100%", marginTop: 10 }}
                  />

                  {/* <input
                    type="date"
                    className="form-control"
                    id=""
                    placeholder=""
                    name=""
                    // onChange={(e) => setDate(e.target.value)}
                    // value={date}
                  /> */}
                </div>
              </div>
              {/* <div className="time-picker-hldr">
                <div
                  className="time-hldr"
                  // onClick={() =>
                  //   updateDateOnButtonClick(
                  //     dayjs().subtract(1, "day").format("DD-MM-YYYY")
                  //   )
                  // }
                >
                  <div className="time">Not started</div>
                  <div className="time-icon">
                    <img src="../images/icon-time.png" alt="" />
                  </div>
                </div>
                <div
                  className="time-hldr"
                  // onClick={() =>
                  //   updateDateOnButtonClick(
                  //     dayjs(new Date()).format("DD-MM-YYYY")
                  //   )
                  // }
                >
                  <div className="time">Less than 50%</div>
                  <div className="time-icon">
                    <img src="../images/icon-time.png" alt="" />
                  </div>
                </div>
                <div
                  className="time-hldr"
                  // onClick={() =>
                  //   updateDateOnButtonClick(
                  //     dayjs().add(1, "day").format("DD-MM-YYYY")
                  //   )
                  // }
                >
                  <div className="time">100% completed</div>
                  <div className="time-icon">
                    <img src="../images/icon-time.png" alt="" />
                  </div>
                </div>
              </div> */}
              <div className="container">
                <button
                  className="find-btn"
                  onClick={(e) => searchData(anchor, e)}
                >
                  <span>
                    <img src="../images/loupe.png" alt="" />
                  </span>
                  <div className="txt-hldr pl-3" style={{ color: "white" }}>
                    Search
                  </div>
                </button>
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
