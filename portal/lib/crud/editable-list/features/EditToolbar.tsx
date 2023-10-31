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
import { EditMode } from "@/types";

export interface EditToolbarProps<T extends EditMode, T2>
  extends AsyncDropdownProps<T2> {
  setRows: (newRows: (oldRows: GridRowsProp<T>) => GridRowsProp<T>) => void;
  rows: GridRowsProp<T>;
  // T2 key
  mapperKey: string;
}

export default function EditToolbar<
  T extends EditMode & AbstractBaseModel,
  T2 extends AbstractBaseModel
>({ setRows, rows, label, endpoint, mapperKey }: EditToolbarProps<T, T2>) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValues, setSelectedValues] = useState<T2[]>([]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  /**
   *
   * @param id T2 id
   * @returns
   */
  const checkDuplicate = (id: any) => {
    return rows.some((e: any) => e[mapperKey].id == id);
  };

  const buildNewRow = (row: T2): Partial<T> => {
    const newRow: Partial<T> = {
      id: randomId(),
      isNew: true,
    } as Partial<T>;

    // @ts-ignore
    newRow[mapperKey] = row;

    return newRow;
  };

  const handleOnChange = (event: any, newValue: T2 | T2[]) => {
    if (Array.isArray(newValue)) {
      setSelectedValues([...selectedValues, ...newValue]);
    } else {
      setSelectedValues([newValue]);
    }
  };

  const handleSelected = () => {
    const newRows: Partial<T>[] = [];

    if (selectedValues.length != 0) {
      for (let rowVal of selectedValues) {
        if (checkDuplicate(rowVal.id)) {
          enqueueSnackbar(
            `${rowVal.display_name} is duplicate, already exists`,
            { variant: "warning" }
          );
        } else {
          const newRow = buildNewRow(rowVal);
          newRows.push(newRow);
        }
      }

      setRows((oldRows) => [...oldRows, ...(newRows as T[])]);
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
              <AsyncDropdown<T2>
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
