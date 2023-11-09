import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { unitApi } from "../services";
import { Unit, UnitHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const UnitHistoryList = ({ data }: { data: Unit }) => {
  const columns: GridColDef[] = [{ field: "name", headerName: "Name" }];
  return (
    <HistoryList<UnitHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={unitApi.endpoints.getUnitHistory}
    />
  );
};
