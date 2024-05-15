import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { chickenApi } from "../services";
import { Chicken, ChickenHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const ChickenHistoryList = ({ data }: { data: Chicken }) => {
  const columns: GridColDef[] = [
    { field: "tag", headerName: "Tag" },
    { field: "sex", headerName: "Tag", flex: 1 },
    {
      field: "house",
      headerName: "House",
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) =>
        row.nutrient_group ? row.nutrient_group.name : "",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.house == null) return <></>;
        return (
          <Link href={`/houses/${params.row.house}`}>
            <Tooltip title="Click to view">
              <Button>
                <Typography color={"link.primary"} variant="body2">
                  {params.row.house}
                </Typography>
              </Button>
            </Tooltip>
          </Link>
        );
      },
    },
  ];
  return (
    <HistoryList<ChickenHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={chickenApi.endpoints.getChickenHistory}
    />
  );
};
