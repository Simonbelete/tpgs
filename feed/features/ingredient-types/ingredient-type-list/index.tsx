import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ingredient_type_services from "../services/ingredient_type_services";

const columns: GridColDef[] = [
  { field: "id", headerName: "Id" },
  {
    field: "setting",
    headerName: "",
    renderCell: (params) => {
      return (
        <Box>
          <IconButton aria-label="edit">
            <CreateIcon />
          </IconButton>
          <IconButton aria-label="view">
            <VisibilityIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      );
    },
  },
];

const IngredientTypeList = () => {
  const [rows, setRows] = useState<GridRowsProp>([
    { id: 1, col1: "Hello", col2: "World" },
  ]);

  useEffect(() => {
    ingredient_type_services.get();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default IngredientTypeList;
