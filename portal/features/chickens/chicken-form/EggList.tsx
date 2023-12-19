import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Link from "next/link";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Chicken, Egg } from "@/models";
import { ToolbarList, EditAction, BasicToolbar } from "@/lib/crud";
import { chickenApi } from "../services";
import dayjs from "dayjs";
import { eggApi } from "@/features/eggs/services";

const columns: GridColDef[] = [
  { field: "week", headerName: "Week", flex: 1, minWidth: 150 },
  { field: "weight", headerName: "Egg Weight (g)", flex: 1, minWidth: 150 },
  { field: "eggs", headerName: "Total eggs", flex: 1, minWidth: 150 },
  // {
  //   field: "hatchery_eggs",
  //   headerName: "Hatchery eggs",
  //   flex: 1,
  //   minWidth: 150,
  // },
];

const EggList = ({ data }: { data: Chicken }) => {
  return (
    <ToolbarList<Egg>
      getQuery={{ chicken: data?.id }}
      actions={[EditAction]}
      toolbar={BasicToolbar}
      columns={columns}
      getEndpoint={eggApi.endpoints.getEggs}
    />
  );
};

export default EggList;
