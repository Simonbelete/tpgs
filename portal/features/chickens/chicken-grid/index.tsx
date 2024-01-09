import React, { useEffect, useRef, useState } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import { Sizer } from "@/features/formula/components";
import _ from "lodash";

type ColumnProperty = {} & Partial<GridCell>;

type Column = {
  id: string;
  property?: ColumnProperty;
} & GridColumn;

type Row = {
  week: number;
  body_weight: number;
};

export const ChickenGrid = () => {
  const columns: Column[] = [
    {
      title: "Week",
      id: "week",
    },
  ];

  const rows = useState<Row[]>([]);

  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = rows[row];
    const dataCol = columns[col];

    const d = _.get(dataRow, dataCol.id, "");

    return {
      kind: GridCellKind.Text,
      ...dataCol.property,
      displayData: String(d),
      // @ts-ignore
      data: String(d),
    };
  }, []);

  return (
    <Sizer>
      <DataEditor
        getCellContent={getContent}
        columns={columns}
        rows={rows.length}
      />
    </Sizer>
  );
};
