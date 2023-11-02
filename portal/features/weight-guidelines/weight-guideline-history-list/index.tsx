import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { weightGuidelineApi } from "../services";
import { WeightGuideline, WeightGuidelineHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const WeightGuidelineHistoryList = ({
  data,
}: {
  data: WeightGuideline;
}) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name" },
    {
      field: "breed",
      headerName: "Breed",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient_group ? params.row.nutrient_group.name : "",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.breed == null) return <></>;
        return (
          <Link href={`/breeds/${params.row.breed}`}>
            <Tooltip title="Click to view">
              <Button>
                <Typography color={"link.primary"} variant="body2">
                  {params.row.breed}
                </Typography>
              </Button>
            </Tooltip>
          </Link>
        );
      },
    },
  ];

  return (
    <HistoryList<WeightGuidelineHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={
        weightGuidelineApi.endpoints.getWeightGuidelineHistory
      }
    />
  );
};
