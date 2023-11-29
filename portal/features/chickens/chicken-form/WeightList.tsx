import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Link from "next/link";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chicken, Weight } from "@/models";
import { ToolbarList, EditAction, BasicToolbar } from "@/lib/crud";
import { chickenApi } from "../services";
import dayjs from "dayjs";
import { eggApi } from "@/features/eggs/services";
import { weightApi } from "@/features/weights/services";

const columns: GridColDef[] = [
  { field: "week", headerName: "Week", flex: 1, minWidth: 150 },
  { field: "weight", headerName: "Weight (g)", flex: 1, minWidth: 150 },
];

const WeightList = ({ data }: { data: Chicken }) => {
  return (
    <ToolbarList<Weight>
      getQuery={{ chicken: data?.id }}
      actions={[EditAction]}
      toolbar={BasicToolbar}
      columns={columns}
      getEndpoint={weightApi.endpoints.getWeights}
    />
  );
};

export default WeightList;
