import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import AutocompliteInput from "../components/AutocompliteInput";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

const SearchPlaces = ({
  locations,
  destinationPlaceId = null,
  sourcePlaceID = null,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [selectedSource, setSelectedSource] = React.useState(null);
  const [selectedDestination, setSelectedDestination] = React.useState(null);
  const [value, setValue] = React.useState(sourcePlaceID ? "1" : "0");

  const handleChange = (event) => {
    if (event.target.value === "0") {
      getCurrentLocation();
    }
    setValue(event.target.value);
  };

  React.useEffect(() => {
    if (destinationPlaceId) {
      const findDPlace = locations?.find(
        (val) => Number(val?.id) === Number(destinationPlaceId)
      );
      setSelectedDestination(findDPlace);
    }
    if (sourcePlaceID) {
      const findSPlace = locations?.find(
        (val) => Number(val?.id) === Number(sourcePlaceID)
      );

      setSelectedSource(findSPlace);
    } else {
      getCurrentLocation();
    }
  }, [sourcePlaceID, destinationPlaceId, locations]);

  const selectSourceLocation = (data) => {
    setSelectedSource(data);
  };
  const selectDestinationLocation = (data) => {
    setSelectedDestination(data);
  };

  const findPlace = async () => {
    const source = `${selectedSource?.lat},${selectedSource?.long}`;
    const destination = `${selectedDestination?.lat},${selectedDestination?.long}`;
    window.location.replace(
      `#/navigation/${source}/${destination}?sourcePlaceID=${
        selectedSource?.id || ""
      }&destinationPlaceId=${selectedDestination?.id}`
    );
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

  return (
    <>
      {!loading ? (
        <>
          <Box sx={{ margin: 2 }}>
            <div className="container find-duty-hldr mb-4">
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  <b> {window.site_text(`pages.map.from_where`)}</b>
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
                    label={window.site_text(`pages.map.currnt_location`)}
                    size="small"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label={window.site_text(`pages.map.custom_location`)}
                    size="small"
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
                        defaultValue={
                          sourcePlaceID &&
                          locations?.find(
                            (val) => Number(val?.id) === Number(sourcePlaceID)
                          )
                        }
                      />
                    </FormControl>
                  </div>
                </div>
              )}

              <FormLabel id="demo-controlled-radio-buttons-group">
                <b>{window.site_text(`pages.map.to_where`)}</b>
              </FormLabel>
              <div className="datepicker">
                <div className="mb-3 mt-0">
                  <FormControl size="small" fullWidth>
                    <AutocompliteInput
                      data={locations}
                      onchangeCallback={selectDestinationLocation}
                      defaultValue={
                        destinationPlaceId &&
                        locations?.find(
                          (val) =>
                            Number(val?.id) === Number(destinationPlaceId)
                        )
                      }
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
    </>
  );
};

export default SearchPlaces;
