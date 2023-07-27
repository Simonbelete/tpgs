import React, { useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { EditableTable } from "@/components/tables";
import { Nutrient } from "@/models";

const columns: GridColDef[] = [
  { field: "code", headerName: "Code", flex: 1, minWidth: 150 },
  { field: "abbreviation", headerName: "Abbreviation", flex: 1, minWidth: 150 },
  {
    field: "value",
    headerName: "Value",
    flex: 1,
    minWidth: 150,
    editable: true,
  },
];

const NutrientEditableTable = () => {
  const [rows, setRows] = useState<GridRowsProp>([{ id: 1, code: "TF" }]);

  const handleOnRowSave = (data: object) => {
    console.log(data);
  };

  const handleOnRowDelete = (data: object) => {
    console.log(data);
  };

  return (
    <EditableTable
      data={rows}
      columns={columns}
      onRowSave={handleOnRowSave}
      onRowDelete={handleOnRowDelete}
    />
  );
};

export default NutrientEditableTable;
