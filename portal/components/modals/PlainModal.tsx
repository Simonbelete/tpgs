import * as React from "react";
import { Modal, Box, Typography, IconButton, Divider } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  // border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  height: "90%",
  overflow: "scroll",
};

export default function BasicModal({
  open,
  onClose,
  children,
  width = "60%",
}: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  width?: string;
}) {
  const handleClose = React.useCallback(() => onClose(), [onClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: width }}>
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
        <Divider sx={{ mt: 3, mb: 2 }} />
        {children}
      </Box>
    </Modal>
  );
}
