import React, { ReactElement, useRef, useMemo } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import { data } from "autoprefixer";

interface Ingredient {
  name: string;
  cp: string;
}

const DataTable = (): ReactElement => {
  const columns = useMemo<GridColumn[]>(() => {
    return [
      { title: "Name", id: "name" },
      { title: "CP%", id: "cp" },
    ];
  }, []);
  const dataRef = useRef([
    {
      name: "Maze",
      cp: "23",
    },
    {
      name: "Maze",
      cp: "23",
    },
    {
      name: "Maze",
      cp: "23",
    },
  ]);

  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = dataRef.current[row];
    // dumb but simple way to do this
    const indexes: (keyof Ingredient)[] = ["name", "cp"];
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

      const indexes: (keyof Ingredient)[] = ["name", "cp"];
      const [col, row] = cell;
      const key = indexes[col];
      dataRef.current[row][key] = newValue.data;
    },
    []
  );

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
