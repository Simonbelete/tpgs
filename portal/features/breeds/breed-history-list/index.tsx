import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { breedApi } from "../services";
import { Breed, BreedHistory } from "@/models";

export const BreedHistoryList = ({ data }: { data: Breed }) => {
  const columns: GridColDef[] = [{ field: "name", headerName: "Name" }];
  return (
    <HistoryList<BreedHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={breedApi.endpoints.getBreedHistory}
    />
  );
};
