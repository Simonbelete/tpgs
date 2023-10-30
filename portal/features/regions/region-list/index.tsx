import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { ListLayout } from "@/lib/crud";
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
    { field: "display_name", headerName: "Name", flex: 1 },
  ];
  return (
    <ListLayout<Region>
      baseUrl="/regions"
      title="Region"
      columns={columns}
      actions={[]}
      getEndpoint={regionApi.endpoints.getRegions}
      deleteEndpoint={regionApi.endpoints.deleteRegion}
      filters={{}}
      exportCsv={exportRegionsCSV}
      exportXls={exportRegionsXLS}
      exportXlsx={exportRegionsXLSX}
      importCsv={importRegionsCSV}
      importXls={importRegionsXLS}
      importXlsx={importRegionsXLSX}
      getRowId={(row: any) => row.geoname_id}
    />
  );
};
