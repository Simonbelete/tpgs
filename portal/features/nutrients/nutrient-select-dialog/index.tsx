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
import { AsyncDropdown } from "@/components/dropdowns";
import { Nutrient } from "@/models";

const NutrientSelectDialog = ({
  open = false,
  onSelected,
  onClose,
}: {
  open?: boolean;
  onSelected: (value?: Nutrient) => void;
  onClose: () => void;
}) => {
  const [value, setValue] = useState();
  const handleClose = useCallback(() => onClose(), [onClose]);
  const handleOnSelected = useCallback(
    () => onSelected(value),
    [onSelected, value]
  );

  return (
    <Dialog disableEscapeKeyDown open={open} maxWidth="md" fullWidth>
      <DialogTitle>Select Nutrient</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 200, width: "100%" }}>
            <AsyncDropdown<Nutrient>
              url="/nutrients/"
              onChange={(e, newValue) => setValue(newValue)}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleOnSelected}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NutrientSelectDialog;
