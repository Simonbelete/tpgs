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
import NutrientForm from "../nutrient-form";

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
              createFormTitle="Create new nutrient"
              createForm={<NutrientForm redirect={false} />}
            />
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

export default NutrientSelectDialog;
