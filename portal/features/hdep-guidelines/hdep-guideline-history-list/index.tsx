import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { HistoryList } from "@/lib/crud";
import { hDEPGuidelineApi } from "../services";
import { HDEPGuideline, HDEPGuidelineHistory } from "@/models";
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
import Link from "next/link";

export const HDEPGuidelineHistoryList = ({ data }: { data: HDEPGuideline }) => {
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
    { field: "week", headerName: "Week" },
    { field: "hdep", headerName: "HDEP (g)" },
  ];

  return (
    <HistoryList<HDEPGuidelineHistory>
      columns={columns}
      getHistoryQuery={{ id: data.id, query: {} }}
      getHistoryEndpoint={hDEPGuidelineApi.endpoints.getHDEPGuidelineHistory}
    />
  );
};
