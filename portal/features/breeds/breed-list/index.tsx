import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ExportButton,
  ImportButton,
} from "@/lib/crud";
import {
  breedApi,
  exportBreedsCSV,
  exportBreedsXLS,
  exportBreedsXLSX,
  importBreedsCSV,
  importBreedsXLS,
  importBreedsXLSX,
} from "../services";
import { Breed } from "@/models";
import { houseApi } from "@/features/houses/services";
import { Typography } from "@mui/material";
import Link from "next/link";

export const BreedList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
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
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/houses/${params.row.house.id}`}>
              {params.row.house.name}
            </Link>
          </Typography>
        );
      },
    },
  ];
  return (
    <ListLayout<Breed>
      title="Breed"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={breedApi.endpoints.getBreeds}
      deleteEndpoint={breedApi.endpoints.deleteBreed}
      filters={{}}
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportBreedsCSV}
            exportXls={exportBreedsXLS}
            exportXlsx={exportBreedsXLSX}
          />
          <ImportButton
            importCsv={importBreedsCSV}
            importXls={importBreedsXLS}
            importXlsx={importBreedsXLSX}
          />
        </>
      }
    />
  );
};
