import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const modalContentStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: "#182B58",
  border: "2px solid #000",
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
  borderRadius: "4px",
  p: 4,
  textAlign: "center",
  animation: "fade-in 0.5s ease-in-out",
};

const closeButtonStyle =
  "absolute top-0 right-0 m-2 text-gray-500 cursor-pointer";

interface CustomModalProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  paymentId: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  handleOpen,
  handleClose,
  paymentId,
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
        <Typography className="text-white" variant="h3" gutterBottom>
          Order Successfully Placed
        </Typography>
        <Typography className="text-white" variant="body1">
          Your payment was successful, and your payment ID is: {paymentId}
        </Typography>
      </Box>
    </Modal>
  );
};

export default CustomModal;
