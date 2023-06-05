import React from "react";

export default function HorizontalPlaceScroll({ locations, findPlace }) {
  return (
    <div className="time-picker-hldr" style={{ overflowX: "auto" }}>
      {locations?.map((data) => (
        <div
          className="time-hldr"
          onClick={() => findPlace(`${data?.lat},${data?.long}`, data?.id)}
          style={{ minWidth: 105, maxHeight: 45 }}
        >
          <div className="time">{data?.name}</div>
          <div className="time-icon">
            <img src="../images/icon-time.png" alt="" />
          </div>
        </div>
      ))}
    </div>
  );
}
