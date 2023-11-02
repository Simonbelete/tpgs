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
  eggGuidelineApi,
  exportEggGuidelinesCSV,
  exportEggGuidelinesXLS,
  exportEggGuidelinesXLSX,
  importEggGuidelinesCSV,
  importEggGuidelinesXLS,
  importEggGuidelinesXLSX,
} from "../services";
import { EggGuideline } from "@/models";
import { breedApi } from "@/features/breeds/services";
import { Typography } from "@mui/material";
import Link from "next/link";

export const EggGuidelineList = () => {
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
    { field: "egg", headerName: "No of eggs", flex: 1 },
    { field: "weight", headerName: "Total egg weight", flex: 1 },
  ];
  return (
    <ListLayout<EggGuideline>
      title="Body Egg Guideline"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={eggGuidelineApi.endpoints.getEggGuidelines}
      deleteEndpoint={eggGuidelineApi.endpoints.deleteEggGuideline}
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
            exportCsv={exportEggGuidelinesCSV}
            exportXls={exportEggGuidelinesXLS}
            exportXlsx={exportEggGuidelinesXLSX}
          />
          <ImportButton
            importCsv={importEggGuidelinesCSV}
            importXls={importEggGuidelinesXLS}
            importXlsx={importEggGuidelinesXLSX}
          />
        </>
      }
    />
  );
};
