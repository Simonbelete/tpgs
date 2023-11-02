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
  hDEPGuidelineApi,
  exportHDEPGuidelinesCSV,
  exportHDEPGuidelinesXLS,
  exportHDEPGuidelinesXLSX,
  importHDEPGuidelinesCSV,
  importHDEPGuidelinesXLS,
  importHDEPGuidelinesXLSX,
} from "../services";
import { HDEPGuideline } from "@/models";
import { breedApi } from "@/features/breeds/services";
import { Typography } from "@mui/material";
import Link from "next/link";

export const HDEPGuidelineList = () => {
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
    { field: "hdep", headerName: "HDEP (%)", flex: 1 },
  ];
  return (
    <ListLayout<HDEPGuideline>
      title="HDEP Guideline"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={hDEPGuidelineApi.endpoints.getHDEPGuidelines}
      deleteEndpoint={hDEPGuidelineApi.endpoints.deleteHDEPGuideline}
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
            exportCsv={exportHDEPGuidelinesCSV}
            exportXls={exportHDEPGuidelinesXLS}
            exportXlsx={exportHDEPGuidelinesXLSX}
          />
          <ImportButton
            importCsv={importHDEPGuidelinesCSV}
            importXls={importHDEPGuidelinesXLS}
            importXlsx={importHDEPGuidelinesXLSX}
          />
        </>
      }
    />
  );
};
