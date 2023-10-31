import React, { useState } from "react";
import {
  GridRowsProp,
  GridToolbarContainer,
  GridValidRowModel,
} from "@mui/x-data-grid";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  FormControl,
  DialogActions,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AbstractBaseModel } from "@/models";
import AsyncDropdown, {
  AsyncDropdownProps,
} from "../../components/AsyncDropdown";
import AddIcon from "@mui/icons-material/Add";
import { enqueueSnackbar } from "notistack";
import _ from "lodash";
import randomId from "@/util/randomId";

export interface EditToolbarProps<
  T extends GridValidRowModel & AsyncDropdownProps<T> & { isNew: boolean }
> extends AsyncDropdownProps<T>,
    AbstractBaseModel {
  setRows: (newRows: (oldRows: GridRowsProp<T>) => GridRowsProp<T>) => void;
  rows: GridRowsProp<T>;
}

export default function EditToolbar<
  T extends GridValidRowModel & AsyncDropdownProps<T> & { isNew: boolean }
>({ setRows, rows, label, endpoint, multiple, dataKey }: EditToolbarProps<T>) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValues, setSelectedValues] = useState<T[]>([]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const checkDuplicate = () => {
    return rows.some((e) => selectedValues.some((o) => e.id == o.id));
  };

  const generateIdForNewRow = (row: T) => {
    return { ...row, id: randomId(), isNew: true };
  };

  const handleOnChange = (event: any, newValue: T | T[]) => {
    if (Array.isArray(newValue)) {
      const processedRows = newValue.map((e) => generateIdForNewRow(e));
      setSelectedValues(processedRows || []);
    } else {
      const newRow = generateIdForNewRow(newValue);
      setSelectedValues([newRow]);
    }
  };

  const handleSelected = () => {
    if (selectedValues.length != 0) {
      // TODO: isNew
      if (checkDuplicate())
        enqueueSnackbar("Duplicate, Already exists", { variant: "warning" });
      else {
        const newRows = selectedValues.map((v) => ({ ...v, isNew: true }));

        setRows((oldRows) => [...oldRows, ...newRows]);
      }
    }
    setSelectedValues([]);
    handleCloseDialog();
  };

  return (
    <>
      <Dialog disableEscapeKeyDown open={openDialog} maxWidth="md" fullWidth>
        <DialogTitle>Select Nutrient</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 200, width: "100%" }}>
              <AsyncDropdown<T>
                dataKey="name"
                label={label}
                endpoint={endpoint}
                onChange={handleOnChange}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleSelected} variant="outlined">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={handleOpenDialog}
          size={"small"}
        >
          Add new
        </Button>
      </GridToolbarContainer>
    </>
  );
}
