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

export interface ToolbarProps {
  refetch: () => void;
}

export default function Toolbar({ refetch }: ToolbarProps) {
  return (
    <>
      <GridToolbarContainer sx={{ justifyContent: "space-between", mb: 1 }}>
        <Box>
          <GridToolbarColumnsButton color="secondary" />
          <GridToolbarDensitySelector color="secondary" />
        </Box>
        <Button
          color="secondary"
          startIcon={<RefreshIcon />}
          variant="text"
          onClick={() => refetch()}
          size={"small"}
        >
          Refresh
        </Button>
      </GridToolbarContainer>
    </>
  );
}
