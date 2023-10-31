import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  ListLayout,
  CreateButton,
  ExportButton,
  ImportButton,
} from "@/lib/crud";
import {
  regionApi,
  exportRegionsCSV,
  exportRegionsXLS,
  exportRegionsXLSX,
  importRegionsCSV,
  importRegionsXLS,
  importRegionsXLSX,
} from "../services";
import { Region } from "@/models";

export const RegionList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
  ];
  return (
    <ListLayout<Region>
      baseUrl="/regions"
      title="Region"
      columns={columns}
      actions={[]}
      getEndpoint={regionApi.endpoints.getRegions}
    />
  );
};
