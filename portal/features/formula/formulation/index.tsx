import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  GridColumnIcon,
  DataEditorProps,
  GridSelection,
} from "@glideapps/glide-data-grid";
import { NutrientService } from "@/features/nutrients";
import { Sizer } from "../components";

const Formulation = () => {
  const [columns, setColumns] = useState<GridColumn[]>([]);
  const rows = useRef<[]>([]);

  useEffect(() => {
    NutrientService.get({
      limit: 100,
    })
      .then((response) => {
        const cols: GridColumn[] = [];
        for (let i = 0; i < response.data.results.length; i += 1) {
          cols.push({
            title: response.data.results[i].abbreviation,
            id: response.data.results[i].abbreviation,
          });
        }
        setColumns(cols);
      })
      .catch((ex) => {});
  }, []);

  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = rows.current[row];

      // const d = dataRow != undefined ? dataRow[columns[col]] : "";
      const d = "";
      return {
        kind: GridCellKind.Text,
        allowOverlay: true,
        displayData: String(d),
        data: String(d),
      };
    },
    [rows]
  );

  return (
    <Sizer>
      <DataEditor
        width="100%"
        height={100}
        experimental={{ strict: true }}
        columns={columns}
        rows={rows.current.length}
        isDraggable={true}
        freezeColumns={1}
        rowMarkers={"both"}
        getCellContent={getContent}
        trailingRowOptions={{
          // How to get the trailing row to look right
          sticky: true,
          tint: true,
          hint: "New row...",
        }}
      />
    </Sizer>
  );
};

export default Formulation;
