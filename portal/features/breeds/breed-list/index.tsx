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
import { breedApi, URL } from "../services";
import { Breed } from "@/models";
import dayjs from "dayjs";

export const BreedList = () => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
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
    <ListLayout<Breed>
      title="Breed"
      columns={columns}
      actions={[EditAction, HistoryAction, PermanentlyDeleteAction]}
      getEndpoint={breedApi.endpoints.getBreeds}
      deleteEndpoint={breedApi.endpoints.deleteBreed}
      filters={{}}
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
