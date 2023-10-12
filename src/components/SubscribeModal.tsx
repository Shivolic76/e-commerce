import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";

const modalContentStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: "white",
  border: "2px solid #000 !important",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  borderRadius: "4px",
  p: 4,
  textAlign: "center",
  animation: "fade-in 0.5s ease-in-out",

  "@media (max-width:768px)": {
    width: "auto",
  },
};

const closeButtonStyle =
  "absolute top-0 right-0 m-2 text-gray-500 cursor-pointer";

interface CustomModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const SubsribeModal: React.FC<CustomModalProps> = ({
  open,
  handleOpen,
  handleClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalContentStyle}>
        <span onClick={handleClose} className={closeButtonStyle}>
          &#x2716;
        </span>
        <div className="flex">
          <div>
            <img
              src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            />
          </div>
          <div className="p-5">
            <Typography className="text-black text-left !font-black">
              Subscribe Newsletter.
            </Typography>
            <Typography className="text-black text-left !font-medium">
              Subscribe to Monsta to get the latest product and discount
              updates.
            </Typography>
            <input
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder="Email Address"
              required
            />
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SubsribeModal;
