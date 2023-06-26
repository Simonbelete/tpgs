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
import { Ingredient } from "@/models";

const IngredientSelectDialog = ({
  open = false,
  onSelected,
  onClose,
}: {
  open?: boolean;
  onSelected: (value?: any) => void;
  onClose: () => void;
}) => {
  const [value, setValue] = useState();
  const handleClose = useCallback(() => onClose(), [onClose]);
  const handleOnSelected = useCallback(
    () => onSelected(value),
    [onSelected, value]
  );

  return (
    <Dialog disableEscapeKeyDown open={open}>
      <DialogTitle>Select Nutrient</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <AsyncDropdown<Ingredient>
              url="/ingredients/"
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

export default IngredientSelectDialog;
