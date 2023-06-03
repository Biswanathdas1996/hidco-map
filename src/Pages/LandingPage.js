import * as React from "react";
import "../css/start.css";
import VoiceFileEnglish from "../assets/Voice/English.mp3";
import VoiceFileBengali from "../assets/Voice/Bengali.mp3";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { useSelector } from "react-redux";

const englishAudio = new Audio(VoiceFileEnglish);

const bengaliAudio = new Audio(VoiceFileBengali);

export default function FolderList() {
  const [audioPlay, setAudioPlay] = React.useState(false);
  const config = useSelector((state) => state.config);

  const handleButtonClick = () => {
    if (!audioPlay) {
      setAudioPlay(true);
      config?.language === "English" && englishAudio.play();
      config?.language === "Bengali" && bengaliAudio.play();
    } else {
      setAudioPlay(false);
      config?.language === "English" && englishAudio.pause();
      config?.language === "Bengali" && bengaliAudio.pause();
    }
  };

  React.useEffect(() => {
    setAudioPlay(false);
    englishAudio.pause();
    bengaliAudio.pause();
    return englishAudio.pause(), bengaliAudio.pause();
  }, [config?.language]);

  console.log("config", config?.language);
  return (
    <div>
      <div className="main container">
        <div className="welcome">
          <h6> {window.site_text(`pages.landing.welcome_text`)}</h6>
        </div>
        <div className="Security">
          <h1>{window.site_text(`pages.landing.welcome_header_text`)}</h1>
        </div>
        <div className="lorem">
          <h6>{window.site_text(`pages.landing.welcome_header_sub_text`)}</h6>
        </div>
        <div className="img_map">
          <img src="../images/image1.png" alt="" />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <div
            className="button"
            onClick={() => (window.location.href = "#/home")}
            style={{ marginTop: 15 }}
          >
            <center>
              <div className="text" style={{ display: "flex" }}>
                <PinDropIcon />{" "}
                <h6 style={{ marginLeft: 5, marginTop: 3 }}>
                  {window.site_text(`pages.landing.explore`)}{" "}
                </h6>
              </div>
            </center>
          </div>

          <div
            className="button"
            onClick={handleButtonClick}
            style={{ marginTop: 15, marginLeft: 20 }}
          >
            <center>
              <div className="text" style={{ display: "flex" }}>
                {!audioPlay ? <PlayCircleIcon /> : <PauseCircleIcon />}{" "}
                <h6 style={{ marginLeft: 5, marginTop: 3 }}>
                  {window.site_text(`pages.landing.about`)}
                </h6>
              </div>
            </center>
          </div>
        </div>
        <div className="register" style={{ marginTop: 15 }}>
          <h6>
            {window.site_text(`pages.landing.welcome_header_bottom_text`)}
          </h6>
        </div>
      </div>
    </div>
  );
}
