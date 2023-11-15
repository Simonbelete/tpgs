import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { ListLayout } from "@/lib/crud";
import { cityApi } from "../services";
import { City } from "@/models";

export const CityList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "subregion", headerName: "Subregion", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
  ];
  return (
    <ListLayout<City>
      title="City"
      columns={columns}
      actions={[]}
      getEndpoint={cityApi.endpoints.getCities}
    />
  );
};
