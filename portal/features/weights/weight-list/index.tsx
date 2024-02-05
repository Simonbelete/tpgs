import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  DashboardAction,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ImportButton,
  ExportModal,
} from "@/lib/crud";
import { weightApi, URL } from "../services";
import { Weight } from "@/models";
import { chickenApi } from "@/features/chickens/services";
import { Typography } from "@mui/material";
import Link from "next/link";
import _ from "lodash";

export const WeightList = () => {
  const columns: GridColDef[] = [
    {
      field: "chicken",
      headerName: "Chicken",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.chicken == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/chickens/${params.row.chicken.id}`}>
              {params.row.chicken.display_name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "week", headerName: "Week", flex: 1, minWidth: 150 },
    { field: "weight", headerName: "Weight (g)", flex: 1, minWidth: 150 },
  ];

  const beforeExportSubmit = (values: any) => {
    return {
      chicken: _.get(values, "chicken.id", null),
    };
  };

  return (
    <ListLayout<Weight>
      title="Body Weight"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={weightApi.endpoints.getWeights}
      deleteEndpoint={weightApi.endpoints.deleteWeight}
      filters={{
        chicken: {
          label: "Chicken",
          dataDisplayKey: "name",
          endpoint: chickenApi.endpoints.getChickens,
        },
      }}
      menus={
        <>
          <CreateButton />
          <ExportModal
            url="/weights"
            fields={{
              chicken: {
                endpoint: chickenApi.endpoints.getChickens,
                label: "Chicken",
                dataKey: "display_name",
                md: 12,
              },
            }}
            beforeSubmit={beforeExportSubmit}
          />
          <ImportButton url={URL} />
        </>
      }
    />
  );
};
