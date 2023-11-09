import React, { useState } from "react";
import {
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
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
  Stack,
  Typography,
  IconButton,
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
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";

export interface EditToolbarProps<T extends EditMode, T2>
  extends AsyncDropdownProps<T2> {
  setRows: (newRows: (oldRows: GridRowsProp<T>) => GridRowsProp<T>) => void;
  rows: GridRowsProp<T>;
  // T2 key
  mapperKey: string;
  title?: string;
  refetch: () => void;
}

export default function EditToolbar<
  T extends EditMode & AbstractBaseModel,
  T2 extends AbstractBaseModel
>({
  setRows,
  rows,
  label,
  endpoint,
  mapperKey,
  title,
  refetch,
}: EditToolbarProps<T, T2>) {
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

      setRows((oldRows) => [...(newRows as T[]), ...oldRows]);
    }
    setSelectedValues([]);
    handleCloseDialog();
  };

  return (
    <>
      <Dialog disableEscapeKeyDown open={openDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h5" fontWeight={500} color={"text.main"}>
              {title}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
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
        <DialogActions
          sx={{ display: "felx", justifyContent: "space-between" }}
        >
          <Button onClick={handleCloseDialog} color="error" size="small">
            Cancel
          </Button>
          <Button
            onClick={handleSelected}
            variant="contained"
            disableElevation
            size="small"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <GridToolbarContainer
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <Button
            color="primary"
            startIcon={<RefreshIcon />}
            variant="text"
            onClick={() => refetch()}
            size={"small"}
          >
            Refresh
          </Button>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            variant="text"
            onClick={handleOpenDialog}
            size={"small"}
          >
            Add new
          </Button>
        </Box>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    </>
  );
}
