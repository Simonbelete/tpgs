import React, { ReactElement, useCallback } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "60%",
  bgcolor: "background.paper",
  // border: "1px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const ChartModal = ({
  open = false,
  onClose,
  children,
}: {
  open?: boolean;
  onClose: () => void;
  children: ReactElement | ReactElement[];
}) => {
  const handleClose = useCallback(() => onClose(), [onClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: 0,
            top: 0,
            padding: "10px",
          }}
        >
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Modal>
  );
};

export default ChartModal;
