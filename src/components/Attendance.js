import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Login from "../Pages/Login";
import { post } from "../helper/apiHelper";
import { validateResponseUser } from "../helper/validateResponse";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import TextField from "@mui/material/TextField";

function App({ liveCenter }) {
  const [image, setImage] = useState(null);
  const [selfImage, setSelfImage] = useState(null);
  const [faceAuth, setFaceauth] = useState(true); ///   skip the face auth
  const [loading, setLoading] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const webcamRef = useRef(null);
  const webcam2Ref = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const captureSelfie = () => {
    const imageSrc = webcam2Ref.current.getScreenshot();
    setSelfImage(imageSrc);
  };

  const validate = () => {
    setFaceauth(true);
  };

  const handleImageUpload = async (event) => {
    setLoading(true);
    const body = {
      routeId: liveCenter?.routeId,
      locationId: liveCenter?.id,
      refId: liveCenter?.refId,
      image: image,
      profileImage: selfImage,
      lat: 22.8796787,
      long: 88.875785,
      comment: comment,
    };
    const response = await post("/user/visitLocation", body);
    if (validateResponseUser(response)) {
      window.location.reload();
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const videoConstraints = {
    facingMode: "environment",
  };

  return (
    <center>
      <Login validate={validate} display={!faceAuth} />
      {faceAuth && (
        <>
          {/* <h5 style={{ color: "green" }}>User Authenticated!</h5> */}

          {!image ? (
            <>
              <h3>Please Capture Site Image</h3>
              <Webcam
                audio={false}
                ref={webcamRef}
                videoConstraints={videoConstraints}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 9,
                  width: "100%",
                  height: 250,
                }}
              />

              <button
                className="button"
                style={{ marginTop: "1rem", color: "white" }}
                onClick={capture}
              >
                Capture Photo
              </button>
            </>
          ) : (
            <>
              {!selfImage ? (
                <>
                  <h3>Please Capture Selfie</h3>
                  <Webcam
                    audio={false}
                    ref={webcam2Ref}
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      left: 0,
                      right: 0,
                      textAlign: "center",
                      zindex: 9,
                      width: "100%",
                      height: 250,
                    }}
                  />

                  <button
                    className="button"
                    style={{ marginTop: "1rem", color: "white" }}
                    onClick={captureSelfie}
                  >
                    Capture Selfie
                  </button>
                </>
              ) : (
                <>
                  <h3>Submit Your Visit</h3>
                  <br />
                  <ImageList sx={{ width: 300, height: 200 }}>
                    <ImageListItem style={{ borderRadius: 12 }}>
                      <img
                        src={image}
                        srcSet={image}
                        alt={`item.title`}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={`Site Image`}
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
                        src={selfImage}
                        srcSet={selfImage}
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
                  </ImageList>

                  <br />
                  <TextField
                    id="outlined-basic"
                    label="Enter Comment (if any)"
                    variant="outlined"
                    onChange={(e) => setComment(e.target.value)}
                    style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }}
                    fullWidth
                  />
                  <br />
                  {!loading ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        className="button"
                        style={{
                          marginTop: "1rem",
                          color: "white",
                          minWidth: 100,
                        }}
                        onClick={() => handleImageUpload()}
                      >
                        Submit
                      </button>
                      <button
                        className="button"
                        style={{
                          marginTop: "1rem",
                          color: "white",
                          minWidth: 100,
                          background: "#353131",
                        }}
                        onClick={() => {
                          setSelfImage(null);
                          setImage(null);
                        }}
                      >
                        Retake
                      </button>
                    </div>
                  ) : (
                    <center>
                      <div className="loader"></div>
                    </center>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </center>
  );
}

export default App;
