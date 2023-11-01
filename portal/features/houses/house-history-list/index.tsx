import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { houseApi } from "../services";
import { House, HouseHistory } from "@/models";

export const HouseHistoryList = ({ data }: { data: House }) => {
  const columns: GridColDef[] = [{ field: "name", headerName: "Name" }];
  return (
    <HistoryList<HouseHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={houseApi.endpoints.getHouseHistory}
    />
  );
};
