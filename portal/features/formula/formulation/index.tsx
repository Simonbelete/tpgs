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
import { Ingredient, Nutrient } from "@/models";

const Formulation = () => {
  const rows = useRef<Partial<Ingredient>[]>([
    { name: "000" },
    { name: "Ration", dm: 0 },
    {
      name: "Requirement",
    },
  ]);
  const [columns, setColumns] = useState<GridColumn[]>([
    { title: "Name", id: "name" },
    { title: "%", id: "value", icon: GridColumnIcon.HeaderNumber, width: 100 },
    {
      title: "Price",
      id: "price",
      icon: GridColumnIcon.HeaderNumber,
    },
    {
      title: "DM",
      id: "dm",
      icon: GridColumnIcon.HeaderNumber,
    },
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
  ]);

  const indexes = useRef<string[]>(["name", "value", "price", "dm"]);

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
          indexes.current.push(response.data.results[i].abbreviation);
        }
        appendColumns(cols);
      })
      .catch((ex) => {});
  }, []);

  const appendColumns = (cols: GridColumn[]) => {
    setColumns(_.union(_.slice(columns, 0, 4), cols, _.slice(columns, 4)));
  };

  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = rows.current[row];

      // @ts-ignore
      let d = dataRow != undefined ? dataRow[indexes.current[col]] : "";

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

  const onRowAppended = React.useCallback(() => {
    handleOpenIngredientDialog();
  }, []);

  const [openIngredientDialog, setOpenIngredientDialog] = useState(false);
  const handleCloseIngredientDialog = () => setOpenIngredientDialog(false);
  const handleOpenIngredientDialog = () => setOpenIngredientDialog(true);
  const handleSelected = (value?: Ingredient) => {};

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
