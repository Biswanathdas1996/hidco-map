import React from "react";
import dayjs from "dayjs";
import "../css/dutylist.css";

export default function VisitListTable({ locations, handleOpen }) {
  const reversedArray = locations?.map((item) => {
    return Object.assign({}, item, { id: locations?.length - item?.id + 1 });
  });
  // .reverse();
  return (
    <div className="container p-0">
      <table className="table caption-top red-header">
        <thead>
          <tr>
            <th scope="col">Location</th>
            <th scope="col">Time</th>
            <th scope="col">Track</th>
          </tr>
        </thead>
        <tbody>
          {reversedArray &&
            reversedArray?.map((val) => {
              return (
                <tr
                  className={val?.isVisited ? "active" : ""}
                  key={val?.name + val?.id}
                >
                  <td>{val?.name}</td>
                  <td>
                    {val?.isVisited
                      ? `${dayjs(new Date(val?.visitData?.createdAt)).format(
                          "DD-MM-YYYY hh:mm A"
                        )}`
                      : "Not Visited"}
                  </td>
                  <td>
                    <img
                      src="../images/placeholder.png"
                      alt=""
                      onClick={() => handleOpen && handleOpen(val)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
