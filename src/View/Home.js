import React, { useRef, useEffect } from "react";
import "../App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome </h1>
        <div>
          <a href="/#/login">
            <button className="button-home">Login</button>
          </a>
          <a href="/#/register">
            <button
              className="button-home"
              style={{ backgroundColor: "#3498DB", marginLeft: 20 }}
            >
              Register
            </button>
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
