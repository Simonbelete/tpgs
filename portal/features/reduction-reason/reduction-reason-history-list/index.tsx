import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { reductionReasonApi } from "../services";
import { ReductionReason, ReductionReasonHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const ReductionReasonHistoryList = ({
  data,
}: {
  data: ReductionReason;
}) => {
  const columns: GridColDef[] = [{ field: "name", headerName: "Name" }];
  return (
    <HistoryList<ReductionReasonHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={
        reductionReasonApi.endpoints.getReductionReasonHistory
      }
    />
  );
};
