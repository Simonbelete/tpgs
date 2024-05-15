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
import { breedApi } from "@/features/breeds/services";
import { reductionReasonApi } from "@/features/reduction-reason/services";
import { userApi } from "@/features/users/services";
import { hatcheryApi } from "@/features/hatchery/services";
import dayjs from "dayjs";

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
    {
      field: "created_at",
      headerName: "Create at",
      valueGetter: (value, row) =>
        row.created_at
          ? dayjs(row.created_at).format(process.env.NEXT_PUBLIC_DATE_FORMAT)
          : "",
    },
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
          dataDisplayKey: "display_name",
          endpoint: chickenApi.endpoints.getChickens,
        },
        chicken__generation: {
          label: "Generation",
          dataDisplayKey: "generation",
          endpoint: chickenApi.endpoints.getGenerations,
        },
        chicken__breed: {
          label: "Breed",
          dataDisplayKey: "display_name",
          endpoint: breedApi.endpoints.getBreeds,
        },
        chicken__hatchery: {
          label: "Hatch / Batch",
          endpoint: hatcheryApi.endpoints.getHatchery,
          dataDisplayKey: "name",
        },
        chicken__sex: {
          label: "Sex",
          dataDisplayKey: "name",
          dataValueKey: "value",
          options: [
            { value: "M", name: "Male" },
            { value: "F", name: "Female" },
          ],
        },
        chicken__hatch_date: {
          label: "Hatch date",
          dataDisplayKey: "hatch_date",
          endpoint: chickenApi.endpoints.getHatchDates,
        },
        chicken__reduction_reason: {
          label: "Reduction reason",
          dataDisplayKey: "display_name",
          endpoint: reductionReasonApi.endpoints.getReductionReasons,
        },
        chicken__reduction_date: {
          label: "Reduction date",
          dataDisplayKey: "reduction_date",
          endpoint: chickenApi.endpoints.getReductionDates,
        },
        created_by: {
          label: "Created By",
          dataDisplayKey: "display_name",
          endpoint: userApi.endpoints.getUsers,
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
