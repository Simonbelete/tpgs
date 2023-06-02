import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Card } from "@mui/material";
import { DataTable } from "@/components";
import nutrient_service from "../services/nutrient_service";
import { Nutrient } from "@/models";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, minWidth: 150 },
  { field: "Code", headerName: "Code", flex: 1, minWidth: 150 },
  { field: "abbreviation", headerName: "Abbreviation", flex: 1, minWidth: 150 },
  { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
  { field: "nutrient_group", headerName: "Type", flex: 1, minWidth: 150 },
  { field: "unit", headerName: "Unit", flex: 1, minWidth: 150 },
  {
    field: "Setting",
    flex: 1,
    minWidth: 150,
  },
];

const NutrientsList = () => {
  const [rows, setRows] = useState<GridRowsProp<Nutrient>>([]);

  useEffect(() => {
    try {
      nutrient_service.get().then((response) => {
        console.log("results");
        console.log(response.data);
        setRows(response.data.results);
      });
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  return <DataTable rows={rows} columns={columns} />;
};

export default NutrientsList;
