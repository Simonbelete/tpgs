import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { requirementApi } from "../services";
import { Requirement, RequirementHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const RequirementHistoryList = ({ data }: { data: Requirement }) => {
  const columns: GridColDef[] = [{ field: "name", headerName: "Name" }];
  return (
    <HistoryList<RequirementHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={requirementApi.endpoints.getRequirementHistory}
    />
  );
};
