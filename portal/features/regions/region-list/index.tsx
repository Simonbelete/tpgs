import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { ListLayout } from "@/lib/crud";
import { regionApi } from "../services";
import { Region } from "@/models";

export const RegionList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
  ];
  return (
    <ListLayout<Region>
      title="Region"
      columns={columns}
      actions={[]}
      getEndpoint={regionApi.endpoints.getRegions}
    />
  );
};
