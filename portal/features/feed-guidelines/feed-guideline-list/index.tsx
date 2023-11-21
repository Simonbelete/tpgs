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
import { feedGuidelineApi, URL } from "../services";
import { FeedGuideline } from "@/models";
import { breedApi } from "@/features/breeds/services";
import { Typography } from "@mui/material";
import Link from "next/link";

export const FeedGuidelineList = () => {
  const columns: GridColDef[] = [
    {
      field: "breed",
      headerName: "Breed",
      flex: 1,
      minWidth: 150,
      valueGetter: (params) =>
        params.row.nutrient_group ? params.row.nutrient_group.name : "",
      renderCell: (params: GridRenderCellParams<any>) => {
        if (params.row.breed == null) return <></>;
        return (
          <Typography color={"link.primary"} variant="body2">
            <Link href={`/breeds/${params.row.breed.id}`}>
              {params.row.breed.name}
            </Link>
          </Typography>
        );
      },
    },
    { field: "week", headerName: "Week", flex: 1 },
    { field: "weight", headerName: "Feed weight (g)", flex: 1 },
  ];
  return (
    <ListLayout<FeedGuideline>
      title="Body Feed Guideline"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={feedGuidelineApi.endpoints.getFeedGuidelines}
      deleteEndpoint={feedGuidelineApi.endpoints.deleteFeedGuideline}
      filters={{
        breed: {
          label: "Breed",
          dataDisplayKey: "name",
          endpoint: breedApi.endpoints.getBreeds,
        },
      }}
      menus={
        <>
          <CreateButton />
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
