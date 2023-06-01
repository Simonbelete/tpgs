import React, { useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Card } from "@mui/material";
import { DataTable } from "@/components";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, minWidth: 150 },
  { field: "Code", headerName: "Code", flex: 1, minWidth: 150 },
  { field: "abbreviation", headerName: "Abbreviation", flex: 1, minWidth: 150 },
  { field: "Description", headerName: "Description", flex: 1, minWidth: 150 },
  { field: "type", headerName: "Type", flex: 1, minWidth: 150 },
  { field: "unit", headerName: "Unit", flex: 1, minWidth: 150 },
  {
    field: "Setting",
    flex: 1,
    minWidth: 150,
  },
];

const NutrientsList = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);

  return <DataTable rows={rows} columns={columns} />;
};

export default NutrientsList;
