import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { get, post } from "../helper/apiHelper";
import { validateResponseAdmin } from "../helper/validateResponse";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterSelectBox from "./FilterSelectBox";
import AutocompliteInput from "./AutocompliteInput";

export default function Filter({ routeId, onClose }) {
  const [users, setUsers] = React.useState(null);
  const [fetchUserListCalled, setFetchUserListCalled] = React.useState(false);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [getUserID, setGetUserId] = React.useState(null);
  const [designation, setDesignation] = React.useState(null);
  const [policeStations, setPoliceStations] = React.useState(null);
  const [selectedPoliceStation, setSelectedPoliceStation] =
    React.useState(null);
  const [selectedDesignation, setSelectedDesignation] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUserList = async () => {
    const response = await post(
      "/admin/user/getUsersByPoliceStationDesignation",
      {
        policeStationId: selectedPoliceStation,
        designationId: selectedDesignation,
      }
    );
    if (validateResponseAdmin(response)) {
      setUsers(response?.data);
    }
  };

  React.useEffect(() => {
    if (selectedPoliceStation && selectedDesignation) {
      fetchUserList();
      setFetchUserListCalled(true);
    }
  }, [selectedPoliceStation, selectedDesignation]);

  const getPoliceStations = async () => {
    const response = await get("/policeStation");
    if (response?.success) {
      console.log("---response-->", response);
      setPoliceStations(response?.data);
    }
  };

  React.useEffect(() => {
    getPoliceStations();
  }, []);

  const getDesignation = async () => {
    const response = await get("/designation");
    if (response?.success) {
      console.log("---getDesignation-->", response?.data);
      setDesignation(response?.data);
    }
  };

  React.useEffect(() => {
    getDesignation();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      userId: Number(getUserID),
      routeId: routeId,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
    };

    const response = await post(`/admin/user/assignRoute`, data);

    if (validateResponseAdmin(response)) {
      window.location.reload();
    }
    setLoading(false);
  };

  const selectedUser = (data) => {
    console.log("---data", data);
    setGetUserId(data?.id);
  };

  const selectedPoliceStationCallback = (data) => {
    console.log("---->", data);
    setSelectedPoliceStation(data?.id);
    setFetchUserListCalled(true);
  };

  return (
    <>
      {policeStations && designation ? (
        <>
          <label>Police Station</label>
          <FormControl size="small" fullWidth>
            <AutocompliteInput
              data={policeStations}
              onchangeCallback={selectedPoliceStationCallback}
            />
          </FormControl>
          <br />
          <br />
          {designation && (
            <div className="mb-3">
              <label>Designation</label>
              <FormControl size="small" fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="designationId"
                  className="form-control icon-input input-eid"
                  value={selectedDesignation}
                  onChange={(e) => {
                    setSelectedDesignation(e.target.value);
                    setFetchUserListCalled(true);
                  }}
                  onBlur={(e) => {
                    setSelectedDesignation(e.target.value);
                    setFetchUserListCalled(true);
                  }}
                >
                  {designation?.map((data, index) => (
                    <MenuItem value={data?.id} key={index}>
                      {data?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}

          {users && users?.length > 0 && (
            <>
              <label>Employee </label>
              <AutocompliteInput data={users} onchangeCallback={selectedUser} />
            </>
          )}

          <br />
          {getUserID && (
            <>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div>
                  <label>Start date</label>
                  <br />
                  <TextField
                    type="date"
                    className="form-control icon-input "
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small"
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                  />
                </div>
                <br />
                <div>
                  <label>End date</label>
                  <br />
                  <TextField
                    type="date"
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small"
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>
              <br />
              <div
                style={{
                  width: "100%",
                }}
              >
                <div>
                  <label>Start time</label>
                  <br />
                  <TextField
                    type="time"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={(e) => setStartTime(e.target.value)}
                    size="small"
                    fullWidth
                  />
                </div>
                <br />
                <div>
                  <label>End time</label>
                  <br />

                  <TextField
                    type="time"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={(e) => setEndTime(e.target.value)}
                    size="small"
                    fullWidth
                  />
                </div>
              </div>
              <br />
            </>
          )}
          {!loading ? (
            <div style={{ display: "flex" }}>
              {getUserID && (
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="admin-button"
                  disabled={getUserID ? false : true}
                  style={{ marginRight: 10 }}
                >
                  Assign User
                </button>
              )}

              <button
                type="button"
                onClick={() => onClose(false)}
                className="admin-close-button"
              >
                Close
              </button>
            </div>
          ) : (
            <center>
              <div className="loader"></div>
            </center>
          )}
        </>
      ) : (
        <b>Please wait ...</b>
      )}
    </>
  );
}
