import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ExportModal,
  ImportButton,
} from "@/lib/crud";
import { formulaApi, URL } from "../services";
import { Formula } from "@/models";
import { IconButton, Typography, Tooltip, Button } from "@mui/material";
import Link from "next/link";
import TableViewIcon from "@mui/icons-material/TableView";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { purposeApi } from "@/features/purposes/services";

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

const CreateByMatrix = () => {
  return (
    <Link href={"/formulation/experimental"}>
      <Button size="small" startIcon={<TableViewIcon fontSize="small" />}>
        Grid
      </Button>
    </Link>
  );
};

export const FormulaList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", minWidth: 150 },
    {
      field: "purpose",
      headerName: "Purpose",
      flex: 1,
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
    {
      field: "created_at",
      headerName: "Create at",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.created_at
          ? dayjs(params.row.created_at).format(
              process.env.NEXT_PUBLIC_DATE_FORMAT
            )
          : "",
    },
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
      filters={{
        purpose: {
          label: "Purpose",
          dataDisplayKey: "name",
          endpoint: purposeApi.endpoints.getPurposes,
        },
        // house: {
        //   label: "House",
        //   dataDisplayKey: "name",
        //   endpoint: houseApi.endpoints.getHouses,
        // },
      }}
      menus={
        <>
          <CreateButton />
          <CreateByMatrix />
          <ExportModal
            url={URL}
            fields={{}}
            beforeSubmit={(values) => values}
          />
          <ImportButton url={URL} />
        </>
      }
    />
  );
};
