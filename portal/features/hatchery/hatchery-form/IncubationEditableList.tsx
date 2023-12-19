import React, { useState } from "react";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Nutrient, Incubation, Hatchery } from "@/models";
import { EditableList, EditToolbar, ToolbarList } from "@/lib/crud";
import { nutrientApi } from "@/features/nutrients/services";
import { EditMode } from "@/types";
import { hatcheryApi } from "../services";

export interface EditableIncubation extends Incubation, EditMode {}

const IncubationToolbar = ({
  setRows,
  rows,
  refetch,
}: {
  setRows: (
    newRows: (
      oldRows: GridRowsProp<EditableIncubation>
    ) => GridRowsProp<EditableIncubation>
  ) => void;
  rows: GridRowsProp<EditableIncubation>;
  refetch: () => void;
}) => {
  return (
    <EditToolbar<EditableIncubation, Nutrient>
      refetch={refetch}
      title="Add Nutrient"
      setRows={setRows}
      rows={rows}
      endpoint={nutrientApi.endpoints.getNutrients}
      mapperKey="nutrient"
    />
  );
};

const IncubationEditableList = ({ data }: { data: Hatchery }) => {
  const columns: GridColDef[] = [
    {
      field: "egg__week",
      headerName: "Week",
      filterable: false,
      valueGetter: (params) => (params.row.egg ? params.row.egg.week : ""),
    },
    {
      field: "egg__eggs",
      headerName: "No of eggs",
      filterable: false,
      valueGetter: (params) => (params.row.egg ? params.row.egg.eggs : ""),
    },
    {
      field: "no_egg",
      headerName: "Egg Set",
      minWidth: 100,
      filterable: false,
      editable: true,
      type: "number",
    },
    {
      field: "no_egg",
      headerName: "Egg Set",
      minWidth: 100,
      filterable: false,
      editable: true,
      type: "date",
    },
    {
      field: "no_egg",
      headerName: "Egg Set",
      minWidth: 100,
      filterable: false,
      editable: true,
      type: "number",
    },
    {
      field: "no_egg",
      headerName: "Egg Set",
      minWidth: 100,
      filterable: false,
      editable: true,
      type: "number",
    },
    {
      field: "no_egg",
      headerName: "Egg Set",
      minWidth: 100,
      filterable: false,
      editable: true,
      type: "number",
    },
  ];

  const beforeSubmit = (values: Partial<Incubation>) => {
    return values;
  };

  return (
    <EditableList<Incubation>
      getQuery={{ id: data?.id, query: {} }}
      toolbar={IncubationToolbar}
      columns={columns}
      beforeSubmit={beforeSubmit}
      getEndpoint={hatcheryApi.endpoints.getIncubationOfHatchery}
      createEndpoint={hatcheryApi.endpoints.createIncubationForHatchery}
      updateEndpoint={hatcheryApi.endpoints.updateIncubationOfHatchery}
      deleteEndpoint={hatcheryApi.endpoints.deleteIncubationOfHatchery}
    />
  );
};

export default IncubationEditableList;
