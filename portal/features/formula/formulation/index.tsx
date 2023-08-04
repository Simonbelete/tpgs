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
import _ from "lodash";
import { NutrientService } from "@/features/nutrients";
import { Sizer } from "../components";
import { Box } from "@mui/material";
import { IngredientSelectDialog } from "@/features/ingredients";
import { Ingredient, Nutrient, Unit } from "@/models";

const Formulation = () => {
  const rows = useRef<Array<Array<number | string>>>([
    ["Ingredient 1", 80, 130, 98, 7],
    ["Ration"],
    ["Requirement"],
  ]);
  const [columns, setColumns] = useState<GridColumn[]>([
    { title: "Name", id: "name" },
    { title: "%", id: "value", icon: GridColumnIcon.HeaderNumber, width: 100 },
    {
      title: "Price[kg]",
      id: "price",
      icon: GridColumnIcon.HeaderNumber,
    },
    {
      title: "DM",
      id: "dm",
      icon: GridColumnIcon.HeaderNumber,
    },
    {
      title: "Min[%]",
      id: "min",
      icon: GridColumnIcon.HeaderNumber,
      width: 100,
    },
    {
      title: "Max[%]",
      id: "max",
      icon: GridColumnIcon.HeaderNumber,
      width: 100,
    },
  ]);
  const COL_DM_INDEX = 4;
  const COL_NUT_INDEX = 4;
  const COL_VALUE_INDEX = 1;

  useEffect(() => {
    NutrientService.get({
      limit: 100,
    })
      .then((response) => {
        const cols: GridColumn[] = [];
        for (let i = 0; i < response.data.results.length; i += 1) {
          const u = (response.data.results[i].unit as Unit).name;
          cols.push({
            title: `${response.data.results[i].abbreviation}[${u}]`,
            id: response.data.results[i].abbreviation,
          });
        }
        appendColumns(cols);
      })
      .catch((ex) => {});
  }, []);

  const appendColumns = (cols: GridColumn[]) => {
    setColumns(
      _.union(
        _.slice(columns, 0, COL_NUT_INDEX),
        cols,
        _.slice(columns, COL_NUT_INDEX)
      )
    );
  };

  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = rows.current[row];

      // @ts-ignore
      let d = dataRow != undefined ? dataRow[col] : "";

      if (col == 0) {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          displayData: String(d ?? ""),
          data: String(d ?? ""),
        };
      } else {
        return {
          kind: GridCellKind.Number,
          allowOverlay: true,
          displayData: String(d ?? 0),
          data: Number(d ?? 0),
        };
      }
    },
    [rows]
  );

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;

      if (rows.current[row] == undefined) {
        return;
      }

      // @ts-ignore
      rows.current[row][col] = newValue.data;

      const result: number[] = [];
      rows.current.slice(0, -2).forEach((row) => {
        row.slice(1).forEach((column, index) => {
          if (index > columns.length - 2) return;

          if (result[index]) {
            if (index == 0) result[index] += Number(column);
            else
              result[index] +=
                (Number(column) * Number(row[COL_VALUE_INDEX])) / 100;
          } else {
            if (index == 0) result[index] = Number(column);
            else
              result[index] =
                (Number(column) * Number(row[COL_VALUE_INDEX])) / 100;
          }
        });
      });

      rows.current[rows.current.length - 2] = [
        ...rows.current[rows.current.length - 1].slice(0, 1),
        ...result,
      ];
    },
    []
  );

  const onRowAppended = React.useCallback(() => {
    handleOpenIngredientDialog();
  }, []);

  const [openIngredientDialog, setOpenIngredientDialog] = useState(false);
  const handleCloseIngredientDialog = () => setOpenIngredientDialog(false);
  const handleOpenIngredientDialog = () => setOpenIngredientDialog(true);

  const handleSelected = (value?: Ingredient) => {
    if (value == undefined || value == null) return;
    rows.current = [[value?.name], ...rows.current];
  };

  return (
    <>
      <IngredientSelectDialog
        open={openIngredientDialog}
        onSelected={handleSelected}
        onClose={handleCloseIngredientDialog}
      />
      <Box></Box>
      <Sizer>
        <DataEditor
          width="100%"
          experimental={{ strict: true }}
          columns={columns}
          rows={rows.current.length}
          isDraggable={true}
          freezeColumns={1}
          rowMarkers="number"
          onCellEdited={onCellEdited}
          getCellContent={getContent}
          onRowAppended={onRowAppended}
          trailingRowOptions={{
            // How to get the trailing row to look right
            sticky: true,
            tint: true,
            hint: "Add Ingredient",
          }}
        />
      </Sizer>
    </>
  );
};

export default Formulation;
