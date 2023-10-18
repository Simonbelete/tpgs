import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  FormControl,
  DialogActions,
  Button,
} from "@mui/material";
import { Chicken } from "@/models";
import {
  useDeleteChickenMutation,
  useUpdateChickenMutation,
} from "../services";
import { DatePicker } from "@mui/x-date-pickers";

const ChickenReductionSelectDialog = ({ open = false }: { open?: boolean }) => {
  const [value, setValue] = useState();

  const [updateChicken, updateResult] = useUpdateChickenMutation();

  const handleClose = useCallback(() => onClose(), [onClose]);

  return (
    <Dialog disableEscapeKeyDown open={open} maxWidth="md" fullWidth>
      <DialogTitle>Select ChickenReduction</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 200, width: "100%" }}>
            <DatePicker />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleOnSelected} variant="outlined">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChickenReductionSelectDialog;
