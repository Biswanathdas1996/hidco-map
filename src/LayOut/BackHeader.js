import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#AD0004" }}>
        <Toolbar
          variant="dense"
          onClick={() => window.location.replace("#/home")}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBackIosNewIcon style={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            {window.site_text(`header.back`)}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
