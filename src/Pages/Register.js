import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "../utilities";
import UserRegister from "./UserRegister";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [faceData, setFaceData] = useState("");
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);

  const [findFace, setFindFace] = useState(null);

  //  Load posenet
  const runFacemesh = async () => {
    setLoading(true);
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh,

      { backend: "webgl" }
    );
    setLoading(false);
    console.log("======net==>", net);
    setInterval(() => {
      detect(net);
    }, 2000);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections

      const face = await net.estimateFaces({
        input: video,
        predictIrises: false,
        flipHorizontal: false,
        predictBoundingBox: true,
      });

      const faceStringData = JSON.stringify(face[0]?.scaledMesh);
      if (face?.length > 0) {
        setFindFace(faceStringData);
      }
      // console.log(face[0]?.scaledMesh);
      setFaceData(faceStringData);
      // console.log("------>", faceStringData);
      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");

      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
    }
  };

  useEffect(() => {
    runFacemesh();
  }, []);

  return (
    <>
      <UserRegister faceData={faceData} />
      {/* {start ? (
        <div
          style={{
            marginTop: "10rem",
          }}
        >
          <center>
            <div className="loader"></div>
            <p style={{ fontSize: 20, fontWeight: "bold" }}>
              {" "}
              Validating blockchain transction ...
            </p>
          </center>
        </div>
      ) : (
        <div className="App">
          <header className="App-header">
            <h1>Register</h1>
            {loading ? (
              <h1>Loading Model...</h1>
            ) : (
              <>
                <Webcam
                  ref={webcamRef}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: "100%",
                    height: 480,
                  }}
                />

                <canvas
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: "100%",
                    height: 480,
                  }}
                />
              </>
            )}
          </header>
          <center>
            {findFace ? (
              <UserRegister faceData={faceData} />
            ) : (
              <>
                <div className="loader"></div>
                <p style={{ fontSize: 20, fontWeight: "bold" }}>
                  Initiating model, Please wait...
                </p>
              </>
            )}
          </center>
        </div>
      )} */}
    </>
  );
}

export default App;
