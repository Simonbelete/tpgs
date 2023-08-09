import React from "react";
import { Modal, Box, Button } from "@mui/material";
import { PlainModal } from "@/components/modals";

const InvitationFormModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) => {
  return (
    <PlainModal open={open} onClose={onClose}>
      <form></form>
    </PlainModal>
  );
};

export default InvitationFormModal;
