import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions({ routeData, deletLocation }) {
  const [expanded, setExpanded] = React.useState("panel0");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  console.log("------------------routeData", routeData);
  return (
    <div>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {routeData?.map((route, index) => {
          return (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={route?.name}
                secondary={`Type: ${route?.locationType?.name} | Radius: ${route?.radius}m`}
                // secondary="Jan 7, 2014"
              />
              <DeleteIcon
                onClick={() => deletLocation(route?.id)}
                style={{ fontSize: 30, color: "#ad0004" }}
              />
            </ListItem>
          );
        })}
      </List>

      {/* {routeData?.map((routeData, index) => {
        return (
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{routeData?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
             
                // <code> {JSON.stringify(routeData?.center)}</code>
              </Typography>
              <Typography>
                <b>Circle Radius:</b>{" "}
                <code> {JSON.stringify(routeData?.radius)} Mitter</code>
              </Typography>
              <br />
              <Button
                variant="contained"
                styel={{ marginTop: 20 }}
                color="error"
              >
                Delete
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      })} */}
    </div>
  );
}
