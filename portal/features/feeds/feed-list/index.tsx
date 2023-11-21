import React from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  ListLayout,
  PermanentlyDeleteAction,
  EditAction,
  HistoryAction,
  CreateButton,
  ImportButton,
  ExportModal,
} from "@/lib/crud";
import { feedApi, URL } from "../services";
import { Feed } from "@/models";
import { Typography } from "@mui/material";
import Link from "next/link";
import { chickenApi } from "@/features/chickens/services";
import _ from "lodash";
import { hatcheryApi } from "@/features/hatchery/services";
import { penApi } from "@/features/pen/services";
import { houseApi } from "@/features/houses/services";

export const FeedList = () => {
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
    {
      field: "weight",
      headerName: "Feed intake weight (g)",
      flex: 1,
      minWidth: 150,
    },
  ];

  const beforeExportSubmit = (values: any) => {
    return {
      chicken: _.get(values, "chicken.id", null),
      chicken__hatchery: _.get(values, "hatchery.id", null),
      chicken__pen: _.get(values, "pen.id", null),
      chicken__pen__house: _.get(values, "house.id", null),
    };
  };

  return (
    <ListLayout<Feed>
      title="Feed"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={feedApi.endpoints.getFeeds}
      deleteEndpoint={feedApi.endpoints.deleteFeed}
      filters={{
        chicken: {
          label: "Chicken",
          dataDisplayKey: "display_name",
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
