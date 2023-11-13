import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { purposeApi } from "../services";
import { Purpose, PurposeHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const PurposeHistoryList = ({ data }: { data: Purpose }) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name" },
    {
      field: "house",
      headerName: "House",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient_group ? params.row.nutrient_group.name : "",
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
    <HistoryList<PurposeHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={purposeApi.endpoints.getPurposeHistory}
    />
  );
};
