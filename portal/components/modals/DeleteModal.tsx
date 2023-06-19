import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteModal({
  open,
  onYes,
  onClose,
}: {
  open: boolean;
  onYes: () => void;
  onClose?: () => void;
}) {
  const handleClose = React.useCallback(
    () => (onClose != undefined ? onClose() : null),
    [onClose]
  );

  const handleYes = React.useCallback(() => onYes, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          are you sure you want to delete
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleClose} color="error" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
