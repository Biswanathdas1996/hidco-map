import React from "react";

export default function Footer() {
  return (
    <div className="container footer mt-auto py-0">
      <footer className="footer-nav">
        <div className="d-flex justify-content-between">
          <div>
            <a href="#/home">
              <i className="bi bi-house-door-fill"></i>
            </a>
          </div>
          <div>
            <i className="bi bi-list-ul"></i>
          </div>
          <div>
            <i className="bi bi-envelope"></i>
          </div>
          <div>
            <i className="bi bi-person"></i>
          </div>
        </div>
      </footer>
    </div>
  );
}
