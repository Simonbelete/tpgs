import React, { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DataTable } from "@/components/tables";
import { Unit } from "@/models";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, minWidth: 150 },
  { field: "name", headerName: "name", flex: 1, minWidth: 150 },
];

const UnitsList = () => {
  const [rows, setRows] = useState<GridRowsProp<Unit>>([]);

  return <DataTable rows={rows} columns={columns} />;
};

export default UnitsList;
