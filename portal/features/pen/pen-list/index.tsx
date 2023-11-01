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
  penApi,
  exportPensCSV,
  exportPensXLS,
  exportPensXLSX,
  importPensCSV,
  importPensXLS,
  importPensXLSX,
} from "../services";
import { Pen } from "@/models";
import { houseApi } from "@/features/houses/services";
import { Typography } from "@mui/material";
import Link from "next/link";

export const PenList = () => {
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
    <ListLayout<Pen>
      title="Pen"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={penApi.endpoints.getPens}
      deleteEndpoint={penApi.endpoints.deletePen}
      filters={{
        house: {
          label: "House",
          dataDisplayKey: "name",
          endpoint: houseApi.endpoints.getHouses,
        },
      }}
      menus={
        <>
          <CreateButton />
          <ExportButton
            exportCsv={exportPensCSV}
            exportXls={exportPensXLS}
            exportXlsx={exportPensXLSX}
          />
          <ImportButton
            importCsv={importPensCSV}
            importXls={importPensXLS}
            importXlsx={importPensXLSX}
          />
        </>
      }
    />
  );
};
