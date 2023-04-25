import React, { ReactElement } from "react";
import {
  DataEditor,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";

interface Ingredient {
  name: string;
  cp: string;
}

const DataTable = (): ReactElement => {
  const columns: GridColumn[] = [
    { title: "Name", id: "name", width: 100 },
    { title: "CP%", id: "cp", width: 100 },
  ];
  const data: Ingredient[] = [
    {
      name: "Maze",
      cp: "23",
    },
  ];

  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    // dumb but simple way to do this
    const indexes: (keyof Ingredient)[] = ["name", "cp"];
    const d = dataRow[indexes[col]];
    return {
      kind: GridCellKind.Text,
      allowOverlay: false,
      displayData: d,
      data: d,
    };
  }, []);

  return (
    <DataEditor
      getCellContent={getContent}
      columns={columns}
      rows={data.length}
    />
  );
};

export default DataTable;
