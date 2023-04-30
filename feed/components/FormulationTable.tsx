import React, { ReactElement, useRef, useMemo, useState } from "react";
import _ from "lodash";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  GridColumnIcon,
  DataEditorProps,
} from "@glideapps/glide-data-grid";

interface Ingredient {
  id?: string;
  name: string;
  qty: string;
  price: string;
  dm: string;
  me: string;
  cp: string;
  lys: string;
  meth: string;
  mc: string;
  ee: string;
  cf: string;
  ca: string;
  p: string;
  ratio_min: string;
  ratio_max: string;
}

const FormulationTable = (): ReactElement => {
  const data = useRef<Ingredient[]>([
    {
      name: "",
      qty: "",
      price: "",
      dm: "",
      me: "",
      cp: "",
      lys: "",
      meth: "",
      mc: "",
      ee: "",
      cf: "",
      ca: "",
      p: "",
      ratio_min: "",
      ratio_max: "",
    },
    {
      name: "Ration",
      qty: "",
      price: "",
      dm: "",
      me: "",
      cp: "",
      lys: "",
      meth: "",
      mc: "",
      ee: "",
      cf: "",
      ca: "",
      p: "",
      ratio_min: "",
      ratio_max: "",
    },
    {
      name: "Requirement",
      qty: "",
      price: "",
      dm: "",
      me: "",
      cp: "",
      lys: "",
      meth: "",
      mc: "",
      ee: "",
      cf: "",
      ca: "",
      p: "",
      ratio_min: "",
      ratio_max: "",
    },
  ]);
  const indexes: (keyof Ingredient)[] = [
    "name",
    "qty",
    "price",
    "dm",
    "me",
    "cp",
    "lys",
    "meth",
    "mc",
    "ee",
    "cf",
    "ca",
    "p",
    "ratio_min",
    "ratio_max",
  ];
  const columns = useMemo<GridColumn[]>(() => {
    return [
      { title: "Name", id: "name" },
      { title: "%", id: "qty", icon: GridColumnIcon.HeaderNumber, width: 100 },
      {
        title: "Price/Unit",
        id: "price",
        icon: GridColumnIcon.HeaderNumber,
      },
      { title: "DM%", id: "dm", icon: GridColumnIcon.HeaderNumber, width: 100 },
      { title: "ME%", id: "me", icon: GridColumnIcon.HeaderNumber, width: 100 },
      { title: "CP%", id: "cp", icon: GridColumnIcon.HeaderNumber, width: 100 },
      {
        title: "Lys%",
        id: "lys",
        icon: GridColumnIcon.HeaderNumber,
        width: 100,
      },
      {
        title: "Meth%",
        id: "meth",
        icon: GridColumnIcon.HeaderNumber,
        width: 100,
      },
      {
        title: "M+C%",
        id: "mc",
        icon: GridColumnIcon.HeaderNumber,
        width: 100,
      },
      { title: "EE%", id: "ee", icon: GridColumnIcon.HeaderNumber, width: 100 },
      { title: "CF%", id: "cf", icon: GridColumnIcon.HeaderNumber, width: 100 },
      { title: "Ca%", id: "ca", icon: GridColumnIcon.HeaderNumber, width: 100 },
      { title: "P%", id: "p", icon: GridColumnIcon.HeaderNumber, width: 100 },
      {
        title: "Min%",
        id: "min",
        icon: GridColumnIcon.HeaderNumber,
        width: 100,
      },
      {
        title: "Max%",
        id: "max",
        icon: GridColumnIcon.HeaderNumber,
        width: 100,
      },
    ];
  }, []);

  const generateCellData = (): Ingredient => {
    return {
      name: "Name dd",
      qty: "",
      price: "",
      dm: "",
      me: "",
      cp: "",
      lys: "",
      meth: "",
      mc: "",
      ee: "",
      cf: "",
      ca: "",
      p: "",
      ratio_min: "",
      ratio_max: "",
    };
  };

  // For Forcing re-render
  const [numRows, setNumRows] = React.useState(data.current.length);

  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data.current[row];

    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: String(d),
      data: String(d),
    };
  }, []);

  const onRowAppended = React.useCallback(() => {
    const newRow = data.current.length;
    console.log("abc");
    data.current = _.union([generateCellData()], data.current);
    setNumRows((cv) => cv + 1);
  }, [numRows]);

  return (
    <DataEditor
      width="100%"
      columns={columns}
      rows={numRows}
      rowMarkers={"both"}
      onPaste={true}
      getCellContent={getContent}
      trailingRowOptions={{
        // How to get the trailing row to look right
        sticky: true,
        tint: true,
        hint: "New row...",
      }}
      onRowAppended={onRowAppended}
    />
  );
};

export default FormulationTable;
