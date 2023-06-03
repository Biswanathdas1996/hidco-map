import React, { useState, useEffect } from "react";

const CookieModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled) {
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="cookie-modal">
          <div className="cookie-modal-content">
            <h2>Enable Cookies</h2>
            <p>
              This website requires cookies to function properly. Please enable
              cookies in your browser settings to continue.
            </p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieModal;
