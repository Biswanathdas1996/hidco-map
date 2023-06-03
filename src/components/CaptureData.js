import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Attendance from "./Attendance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function Map({ open, onCloseModal, liveCenter, ...props }) {
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={onCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Attendance liveCenter={liveCenter} />
          </Box>
        </Modal>
      </div>
    </>
  );
}
