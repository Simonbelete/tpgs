import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "80%",
  p: 4,
};

const HtmlModal = ({
  html,
  open,
  onClose,
}: {
  html: string;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
          <IconButton onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <div
          style={{ overflow: "scroll", height: "100%" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Box>
    </Modal>
  );
};

export default HtmlModal;
