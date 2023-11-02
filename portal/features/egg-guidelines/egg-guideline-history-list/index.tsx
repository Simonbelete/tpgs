import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { eggGuidelineApi } from "../services";
import { EggGuideline, EggGuidelineHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const EggGuidelineHistoryList = ({ data }: { data: EggGuideline }) => {
  const columns: GridColDef[] = [
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
    { field: "week", headerName: "Week", flex: 1 },
    { field: "egg", headerName: "No of eggs", flex: 1 },
    { field: "weight", headerName: "Total egg weight", flex: 1 },
  ];

  return (
    <HistoryList<EggGuidelineHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={eggGuidelineApi.endpoints.getEggGuidelineHistory}
    />
  );
};
