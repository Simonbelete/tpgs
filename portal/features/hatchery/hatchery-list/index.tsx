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
  hatcheryApi,
  exportHatcheryCSV,
  exportHatcheryXLS,
  exportHatcheryXLSX,
  importHatcheryCSV,
  importHatcheryXLS,
  importHatcheryXLSX,
} from "../services";
import { Hatchery } from "@/models";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import Link from "next/link";

export const HatcheryList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "house",
      headerName: "House",
      flex: 1,
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
    <ListLayout<Hatchery>
      title="Hatchery"
      columns={columns}
      actions={[
        DashboardAction,
        EditAction,
        HistoryAction,
        PermanentlyDeleteAction,
      ]}
      getEndpoint={hatcheryApi.endpoints.getHatchery}
      deleteEndpoint={hatcheryApi.endpoints.deleteHatchery}
      filters={{}}
      menus={
        <>
          <CreateButton baseUrl="/hatchery" />
          <ExportButton
            exportCsv={exportHatcheryCSV}
            exportXls={exportHatcheryXLS}
            exportXlsx={exportHatcheryXLSX}
          />
          <ImportButton
            importCsv={importHatcheryCSV}
            importXls={importHatcheryXLS}
            importXlsx={importHatcheryXLSX}
          />
        </>
      }
    />
  );
};
