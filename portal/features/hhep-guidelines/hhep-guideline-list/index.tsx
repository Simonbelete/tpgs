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
  hHEPGuidelineApi,
  exportHHEPGuidelinesCSV,
  exportHHEPGuidelinesXLS,
  exportHHEPGuidelinesXLSX,
  importHHEPGuidelinesCSV,
  importHHEPGuidelinesXLS,
  importHHEPGuidelinesXLSX,
} from "../services";
import { HHEPGuideline } from "@/models";
import { breedApi } from "@/features/breeds/services";
import { Typography } from "@mui/material";
import Link from "next/link";

export const HHEPGuidelineList = () => {
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
    { field: "hhep", headerName: "HHEP (%)", flex: 1 },
  ];
  return (
    <ListLayout<HHEPGuideline>
      title="Body HHEP Guideline"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={hHEPGuidelineApi.endpoints.getHHEPGuidelines}
      deleteEndpoint={hHEPGuidelineApi.endpoints.deleteHHEPGuideline}
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
            exportCsv={exportHHEPGuidelinesCSV}
            exportXls={exportHHEPGuidelinesXLS}
            exportXlsx={exportHHEPGuidelinesXLSX}
          />
          <ImportButton
            importCsv={importHHEPGuidelinesCSV}
            importXls={importHHEPGuidelinesXLS}
            importXlsx={importHHEPGuidelinesXLSX}
          />
        </>
      }
    />
  );
};
