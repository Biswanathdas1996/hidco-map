import React from "react";
import "./App.css";
import Router from "./Routes";
import { site_text } from "./utils/languageMapper";
import { useDispatch, useSelector } from "react-redux";
import { updateLanguage } from "./redux/slices/config/configSlice";
import CookieModal from "./components/CookiesModal";

function App() {
  const config = useSelector((state) => state.config);
  const dispatch = useDispatch();

  window.site_lang = config?.language;
  window.site_text = site_text;

  React.useEffect(() => {
    const lang_value = localStorage.getItem("site-lang");
    if (lang_value) {
      dispatch(updateLanguage(lang_value));
    } else {
      dispatch(updateLanguage("Engligh"));
    }
  }, []);

  const changeLang = (lang) => {
    dispatch(updateLanguage(lang));
    localStorage.setItem("site-lang", lang);
  };

  return (
    <>
      <CookieModal />
      <div style={{ float: "right" }}>
        <span
          onClick={() => changeLang("English")}
          style={{
            marginRight: 10,
            color: config?.language === "English" ? "#ad0004" : "black",
            fontWeight: config?.language === "English" ? "bold" : "300",
          }}
        >
          English
        </span>
        <span
          onClick={() => changeLang("Bengali")}
          style={{
            marginRight: 10,
            color: config?.language === "Bengali" ? "#ad0004" : "black",
            fontWeight: config?.language === "Bengali" ? "bold" : "300",
          }}
        >
          বাংলা
        </span>
      </div>
      {/* <Header /> */}
      <Router />
    </>
  );
}

export default App;
