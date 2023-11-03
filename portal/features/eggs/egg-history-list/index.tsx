import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { eggApi } from "../services";
import { Egg, EggHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const EggHistoryList = ({ data }: { data: Egg }) => {
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
    { field: "eggs", headerName: "Eggs" },
  ];
  return (
    <HistoryList<EggHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={eggApi.endpoints.getEggHistory}
    />
  );
};
