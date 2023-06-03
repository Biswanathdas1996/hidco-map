import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TodayIcon from "@mui/icons-material/Today";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export default function ControlledComponent({ defaultValue, getDate }) {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onchangeHandler = (newValue) => {
    getDate(newValue);
    setValue(newValue);
  };

  return (
    <center>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <DatePicker
            value={value}
            onChange={(newValue) => onchangeHandler(newValue)}
            style={{ width: "100%", borderRadius: 0 }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <TodayIcon />
                </IconButton>
              ),
            }}
          />
          <Button
            color="warning"
            style={{
              borderRadius: 0,
              marginLeft: "-11px",
              background: "#343a4021",
            }}
          >
            <TodayIcon sx={{ fontSize: 35 }} />
          </Button>
        </div>
      </LocalizationProvider>
    </center>
  );
}
