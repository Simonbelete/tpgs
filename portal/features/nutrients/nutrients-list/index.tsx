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
  nutrientApi,
  exportNutrientsCSV,
  exportNutrientsXLS,
  exportNutrientsXLSX,
  importNutrientsCSV,
  importNutrientsXLS,
  importNutrientsXLSX,
} from "../services";
import { Nutrient } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";

export const NutrientList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    {
      field: "abbreviation",
      headerName: "Abbreviation",
      flex: 1,
      minWidth: 150,
    },
    { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
    {
      field: "nutrient_group",
      headerName: "Nutrient Group",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient_group ? params.row.nutrient_group.name : "",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.nutrient_group == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/nutrient-groups/${params.row.nutrient_group.id}`}>
              {params.row.nutrient_group.name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => (params.row.unit ? params.row.unit.name : ""),
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.unit == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/units/${params.row.unit.id}`}>
              {params.row.unit.name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "code", headerName: "Code", flex: 1, minWidth: 100 },
  ];
  return (
    <ListLayout<Nutrient>
      title="Nutrient"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={nutrientApi.endpoints.getNutrients}
      deleteEndpoint={nutrientApi.endpoints.deleteNutrient}
      filters={{}}
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportNutrientsCSV}
            exportXls={exportNutrientsXLS}
            exportXlsx={exportNutrientsXLSX}
          />
          <ImportButton
            importCsv={importNutrientsCSV}
            importXls={importNutrientsXLS}
            importXlsx={importNutrientsXLSX}
          />
        </>
      }
    />
  );
};
