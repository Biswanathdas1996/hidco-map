import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { get, post } from "../../helper/apiHelper";
import { validateResponseAdmin } from "../../helper/validateResponse";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import RouteReportAccordian from "../../components/RouteReportAccordian";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminImg from "../../images/img_profile.png";
import FilterDrawer from "../../components/FilterDrawer";
import MenuDrawer from "../../LayOut/MenuDrawer";
import Chip from "@mui/material/Chip";
import Header from "../../LayOut/Header";
import Stack from "@mui/material/Stack";

const MyForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [routsData, setRoutsData] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [searchRoutsData, setSearchRoutsData] = React.useState(null);
  const [loadding, setLoadding] = React.useState(false);
  const [filterApplied, setFilterApplied] = React.useState(false);

  const fetchUserList = async () => {
    const response = await get("/admin/user?search=&page&limit=1000");
    if (validateResponseAdmin(response)) {
      setUsers(response?.data?.rows);
    }
  };

  React.useEffect(() => {
    fetchUserList();
  }, []);

  const fetchAllRouts = async () => {
    const response = await get("/admin/route?search=&page&limit");
    if (validateResponseAdmin(response)) {
      setRoutsData(response?.data?.rows);
    }
  };

  React.useEffect(() => {
    fetchAllRouts();
    search(selectedOption, value, selectedDate);
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const search = async (selectedOption, value, selectedDate) => {
    setLoadding(true);
    const response = await get(
      `/admin/route/getRoutesStatus?${`routeId=${
        selectedOption?.id || ""
      }`}&${`userId=${value?.id || ""}`}&${
        selectedDate && `date=${selectedDate}`
      }`
    );

    if (validateResponseAdmin(response)) {
      setSearchRoutsData(response?.data);
      setLoadding(false);
    } else {
      setLoadding(false);
    }
  };
  const filter = createFilterOptions();

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const applyFilter = () => {
    search(selectedOption, value, selectedDate);
    setFilterApplied(true);
  };

  return (
    <>
      <div
        className="container mb-2 p-0 mt-2"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={1} style={{ marginTop: "1.5rem" }}>
          <Chip label={selectedDate} onClick={handleClick} />
          {filterApplied && selectedOption && (
            <Chip
              label={selectedOption?.name}
              onClick={handleClick}
              onDelete={(e) => {
                setSelectedOption(null);
                search(null, value, selectedDate);
              }}
            />
          )}
          {filterApplied && value && (
            <Chip
              label={value?.empID}
              onClick={handleClick}
              onDelete={(e) => {
                setValue(null);
                search(selectedOption, null, selectedDate);
              }}
            />
          )}
        </Stack>
        <FilterDrawer
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
          routsData={routsData}
          users={users}
          value={value}
          setValue={setValue}
          filter={filter}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          applyFilter={applyFilter}
        />
      </div>

      {!loadding ? (
        <Grid container spacing={1}>
          <Grid item xs={12} style={{ padding: 10 }}>
            {searchRoutsData &&
              searchRoutsData?.map((data, index) => {
                return (
                  <RouteReportAccordian
                    data={data?.data}
                    index={index}
                    routsData={data?.route}
                  />
                );
              })}
          </Grid>
        </Grid>
      ) : (
        <center>
          <div className="loader" style={{ marginTop: "4rem" }}></div>
        </center>
      )}
      {searchRoutsData?.length === 0 && (
        <div className="desc-hldr">
          <p>No data found</p>
        </div>
      )}
    </>
  );
};

export default MyForm;
