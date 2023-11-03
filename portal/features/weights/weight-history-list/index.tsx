import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { weightApi } from "../services";
import { Weight, WeightHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const WeightHistoryList = ({ data }: { data: Weight }) => {
  const columns: GridColDef[] = [
    {
      field: "chicken",
      headerName: "chicken",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.chicken == null) return <></>;
        return (
          <Link href={`/chickens/${params.row.chicken}`}>
            <Tooltip title="Click to view">
              <Button>
                <Typography color={"link.primary"} variant="body2">
                  {params.row.chicken}
                </Typography>
              </Button>
            </Tooltip>
          </Link>
        );
      },
    },
    { field: "week", headerName: "Week" },
    { field: "weight", headerName: "Body Weight" },
  ];
  return (
    <HistoryList<WeightHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={weightApi.endpoints.getWeightHistory}
    />
  );
};
