import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ExportModal,
  ImportButton,
} from "@/lib/crud";
import { feedApi, URL } from "../services";
import { Feed } from "@/models";
import { Chip, Typography } from "@mui/material";
import Link from "next/link";
import { chickenApi } from "@/features/chickens/services";
import { hatcheryApi } from "@/features/hatchery/services";
import { penApi } from "@/features/pen/services";
import { houseApi } from "@/features/houses/services";
import _ from "lodash";

export const BatchFeedList = () => {
  const columns: GridColDef[] = [
    {
      field: "hatchery",
      headerName: "Hatchery",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.hatchery == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/hatchery/${params.row.hatchery.id}`}>
              {params.row.hatchery.name}
            </Link>
          </Typography>
        );
      },
    },
    {
      field: "pen",
      headerName: "House / Pen",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.hatchery == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/pens/${params.row.pen.id}`}>
              {params.row.pen.display_name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "week", headerName: "Week", flex: 1, minWidth: 150 },
    {
      field: "total_chickens",
      headerName: "Feed distribution",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <Chip
            label={`${params.row.children_feed_count}/${params.row.total_chickens}`}
          />
        );
      },
    },
  ];

  const beforeExportSubmit = (values: any) => {
    return {
      parent__isnull: false,
      chicken: _.get(values, "chicken.id", null),
      chicken__hatchery: _.get(values, "hatchery.id", null),
      chicken__pen: _.get(values, "pen.id", null),
      chicken__pen__house: _.get(values, "house.id", null),
    };
  };

  return (
    <ListLayout<Feed>
      title="Batch Feed Intake"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={feedApi.endpoints.getBatchFeeds}
      deleteEndpoint={feedApi.endpoints.deleteFeed}
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
            url={URL}
            fields={{
              chicken: {
                endpoint: chickenApi.endpoints.getChickens,
                label: "Chicken",
                md: 12,
                dataKey: "display_name",
              },
              hatchery: {
                endpoint: hatcheryApi.endpoints.getHatchery,
                label: "hatchery",
                md: 12,
                dataKey: "display_name",
              },
              house: {
                endpoint: houseApi.endpoints.getHouses,
                label: "House",
                md: 12,
                dataKey: "display_name",
              },
              pen: {
                endpoint: penApi.endpoints.getPens,
                label: "Pen",
                md: 12,
                dataKey: "display_name",
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
