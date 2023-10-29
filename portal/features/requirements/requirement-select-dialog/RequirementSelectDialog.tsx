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
import { RequirementDropdown } from "../requirement-dropdown";

const RequirementSelectDialog = ({
  open = false,
  onSelected,
  onClose,
  multiple = false,
}: {
  open?: boolean;
  onSelected: (value?: any) => void;
  onClose: () => void;
  multiple?: boolean;
}) => {
  const [value, setValue] = useState();
  const handleClose = useCallback(() => onClose(), [onClose]);
  const handleOnSelected = useCallback(
    () => onSelected(value),
    [onSelected, value]
  );

  return (
    <Dialog disableEscapeKeyDown open={open} maxWidth="md" fullWidth>
      <DialogTitle>Select Requirement</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 200, width: "100%" }}>
            <RequirementDropdown
              multiple={multiple}
              onChange={(e, newValue) => setValue(newValue)}
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

export default RequirementSelectDialog;
