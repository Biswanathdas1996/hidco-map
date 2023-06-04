import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

import ImageSlider from "./Slider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  width: "90%",
};

export default function Map({ open, onClose, currentLocation, ...props }) {
  console.log("---------props-->", props?.clickedPlace);

  const findPlace = async () => {
    const source = `${currentLocation?.lat},${currentLocation?.lng}`;
    const destination = `${props?.clickedPlace?.lat},${props?.clickedPlace?.long}`;
    window.location.href = `#/navigation/${source}/${destination}?sourcePlaceID=&destinationPlaceId=${props?.clickedPlace?.id}`;
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={(e) => onClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="list-hldr n-route mt-3" style={{}}>
              <div className="desc-hldr">
                <div>
                  <div className="img-hldr">
                    <img src="../images/placeholder.png" alt="" />
                  </div>
                  <div className="text-hldr">
                    <p>
                      <strong>Spot</strong>
                    </p>
                    <p>{props?.clickedPlace?.name}</p>
                  </div>
                </div>
              </div>
            </div>
            <ImageSlider />

            <p style={{ margin: 10 }}>
              The Zoological Garden, Alipore is India's oldest formally stated
              zoological park and a big tourist attraction in Kolkata, West
              Bengal. It has been open as a zoo since 1876, and covers 18.811
              ha.
            </p>
            {/* <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ margin: 10 }}
            >
              <b></b>
              <p>
                
              </p> 
            </Typography> */}

            {props?.clickedPlace?.isVisited && (
              <>
                <ImageList sx={{ width: 300, height: 200 }}>
                  <ImageListItem style={{ borderRadius: 12 }}>
                    <img
                      src={props?.clickedPlace?.visitData?.profileImage}
                      srcSet={props?.clickedPlace?.visitData?.profileImage}
                      alt={`item.title`}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={`Selfie`}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about `}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                  <ImageListItem>
                    <img
                      src={props?.clickedPlace?.visitData?.image}
                      srcSet={props?.clickedPlace?.visitData?.image}
                      alt={`item.title`}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={`Site image`}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about `}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                </ImageList>

                {/* <ImageCard
                  img={props?.clickedPlace?.visitData?.profileImage}
                  text="Selfie"
                />
                <ImageCard
                  img={props?.clickedPlace?.visitData?.image}
                  text="Site image"
                /> */}
              </>
            )}

            <button
              type="button"
              onClick={(e) => onClose()}
              className="admin-close-button"
              style={{ float: "right", margin: 0 }}
            >
              <div className="text">
                <h6>Close</h6>
              </div>
            </button>
            <button
              type="button"
              className="admin-button"
              style={{ float: "right", marginRight: 10, background: "#ad0004" }}
              onClick={() => findPlace()}
            >
              <div className="text" style={{ width: "100%" }}>
                <h6>{window.site_text("pages.map.take_me_there")}</h6>
              </div>
            </button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
