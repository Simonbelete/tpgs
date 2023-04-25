import React, { ReactElement, useRef, useMemo, useEffect } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  GridColumnIcon,
} from "@glideapps/glide-data-grid";
import { data } from "autoprefixer";
import _ from "lodash";

interface Ingredient {
  name: string;
  qty: string;
  price: string;
  cp: string;
  min: string;
  max: string;
}

const DataTable = (): ReactElement => {
  const columns = useMemo<GridColumn[]>(() => {
    return [
      { title: "Name", id: "name" },
      { title: "%", id: "qty", icon: GridColumnIcon.HeaderNumber },
      { title: "Price/Unit", id: "price", icon: GridColumnIcon.HeaderNumber },
      { title: "CP%", id: "cp", icon: GridColumnIcon.HeaderNumber },
      { title: "Min%", id: "min", icon: GridColumnIcon.HeaderNumber },
      { title: "Max%", id: "cp", icon: GridColumnIcon.HeaderNumber },
    ];
  }, []);
  const dataRef = useRef([
    {
      name: "Maze",
      qty: "",
      price: "",
      cp: "10",
      min: "",
      max: "",
    },
    {
      name: "",
      qty: "",
      price: "",
      cp: "",
      min: "",
      max: "",
    },
    {
      name: "Recipe",
      qty: "0",
      price: "0",
      cp: "0",
      min: "0",
      max: "0",
    },
    {
      name: "Requirement",
      qty: "10",
      price: "0",
      cp: "0",
      min: "0",
      max: "0",
    },
  ]);

  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = dataRef.current[row];
    // dumb but simple way to do this
    const indexes: (keyof Ingredient)[] = [
      "name",
      "qty",
      "price",
      "cp",
      "min",
      "max",
    ];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: d,
      data: d,
    };
  }, []);

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      if (newValue.kind !== GridCellKind.Text) {
        // we only have text cells, might as well just die here.
        return;
      }

      const indexes: (keyof Ingredient)[] = [
        "name",
        "qty",
        "price",
        "cp",
        "min",
        "max",
      ];
      const [col, row] = cell;
      const key = indexes[col];

      // Set value change
      dataRef.current[row][key] = newValue.data;

      let col_values = new Map();

      // const's
      const last_index = dataRef.current.length - 1;
      const recipe_index = last_index - 1;

      console.log(dataRef.current);

      // Calculate Each Column indexes sum & values
      for (let i = 1; i < indexes.length; i++) {
        const col_key = indexes[i];
        let vals: any = _.map(
          dataRef.current.slice(0, recipe_index),
          (o: Ingredient) => Number(o[col_key])
        );

        console.log("----");
        console.log(vals);

        // col_values.set(indexes[i], vals);

        // Set sum
        dataRef.current[recipe_index][col_key] = String(_.sum(vals));
      }
    },
    []
  );

  useEffect(() => {}, []);

  return (
    <DataEditor
      getCellContent={getContent}
      onCellEdited={onCellEdited}
      columns={columns}
      rows={dataRef.current.length}
    />
  );
};

export default DataTable;
