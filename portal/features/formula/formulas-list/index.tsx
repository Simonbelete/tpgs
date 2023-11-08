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
  formulaApi,
  exportFormulasCSV,
  exportFormulasXLS,
  exportFormulasXLSX,
  importFormulasCSV,
  importFormulasXLS,
  importFormulasXLSX,
} from "../services";
import { Formula } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";

export const FormulaList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "purpose",
      headerName: "Purpose",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.purpose ? params.row.purpose.name : "",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.purpose == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/purposes/${params.row.purpose.id}`}>
              {params.row.purpose.name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "weight", headerName: "Weight", flex: 1 },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.country ? params.row.country.name : "",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.purpose == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/countries/${params.row.country.id}`}>
              {params.row.country.name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "sex", headerName: "Sex", flex: 1 },
    { field: "ration_price", headerName: "Ration Price", flex: 1 },
  ];
  return (
    <ListLayout<Formula>
      title="Formulas"
      columns={columns}
      actions={[
        DashboardAction,
        EditAction,
        HistoryAction,
        PermanentlyDeleteAction,
      ]}
      getEndpoint={formulaApi.endpoints.getFormulas}
      deleteEndpoint={formulaApi.endpoints.deleteFormula}
      filters={
        {
          // house: {
          //   label: "House",
          //   dataDisplayKey: "name",
          //   endpoint: houseApi.endpoints.getHouses,
          // },
        }
      }
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportFormulasCSV}
            exportXls={exportFormulasXLS}
            exportXlsx={exportFormulasXLSX}
          />
          <ImportButton
            importCsv={importFormulasCSV}
            importXls={importFormulasXLS}
            importXlsx={importFormulasXLSX}
          />
        </>
      }
    />
  );
};
