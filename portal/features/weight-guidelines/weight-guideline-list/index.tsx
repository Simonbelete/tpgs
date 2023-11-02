import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ExportButton,
  ImportButton,
} from "@/lib/crud";
import {
  weightGuidelineApi,
  exportWeightGuidelinesCSV,
  exportWeightGuidelinesXLS,
  exportWeightGuidelinesXLSX,
  importWeightGuidelinesCSV,
  importWeightGuidelinesXLS,
  importWeightGuidelinesXLSX,
} from "../services";
import { WeightGuideline } from "@/models";
import { breedApi } from "@/features/breeds/services";
import { Typography } from "@mui/material";
import Link from "next/link";

export const WeightGuidelineList = () => {
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
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/breeds/${params.row.breed.id}`}>
              {params.row.breed.name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "week", headerName: "Week", flex: 1 },
    { field: "weight", headerName: "Body Weight", flex: 1 },
  ];
  return (
    <ListLayout<WeightGuideline>
      title="Body Weight Guideline"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={weightGuidelineApi.endpoints.getWeightGuidelines}
      deleteEndpoint={weightGuidelineApi.endpoints.deleteWeightGuideline}
      filters={{
        breed: {
          label: "Breed",
          dataDisplayKey: "name",
          endpoint: breedApi.endpoints.getBreeds,
        },
      }}
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportWeightGuidelinesCSV}
            exportXls={exportWeightGuidelinesXLS}
            exportXlsx={exportWeightGuidelinesXLSX}
          />
          <ImportButton
            importCsv={importWeightGuidelinesCSV}
            importXls={importWeightGuidelinesXLS}
            importXlsx={importWeightGuidelinesXLSX}
          />
        </>
      }
    />
  );
};
