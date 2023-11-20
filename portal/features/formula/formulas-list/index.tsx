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
import { IconButton, Typography, Tooltip } from "@mui/material";
import Link from "next/link";
import TocIcon from "@mui/icons-material/Toc";
import TableViewIcon from "@mui/icons-material/TableView";
import { useRouter } from "next/router";

const MatrixAction: React.FC<GridRenderCellParams> = ({ id }) => {
  const router = useRouter();
  return (
    <Link
      href={`${router.pathname}/${id}/matrix`}
      data-testid="data-table-dashboard"
    >
      <Tooltip title="Matrix">
        <IconButton aria-label="edit">
          <TableViewIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};
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
    { field: "ration_price", headerName: "Batch Price", flex: 1 },
    { field: "unit_price", headerName: "Unit Price", flex: 1 },
    { field: "ingredient_count", headerName: "Ingredients", flex: 1 },
    { field: "requirement_count", headerName: "Requirements", flex: 1 },
  ];
  return (
    <ListLayout<Formula>
      title="Formulas"
      columns={columns}
      actions={[
        DashboardAction,
        EditAction,
        MatrixAction,
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
