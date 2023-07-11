import React, { ReactElement } from "react";
import { Grid } from "@mui/material";
import { Loading } from "@/components";
import dynamic from "next/dynamic";
import { DataTable } from "@/components/tables";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, minWidth: 150 },
  { field: "name", headerName: "name", flex: 1, minWidth: 150 },
];

const rows = [
  { id: 1, name: "Abc" },
  { id: 2, name: "Abc" },
  { id: 3, name: "Abc" },
  { id: 4, name: "Abc" },
  { id: 5, name: "Abc" },
];

const DashboardPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* <DataTable rows={rows} columns={columns} /> */}
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
