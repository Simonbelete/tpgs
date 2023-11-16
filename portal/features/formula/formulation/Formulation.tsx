import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  CustomCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import { Sizer } from "../components";
import { Formula } from "@/models";
import { useLazyGetAllNutrientsQuery } from "@/features/nutrients/services";
import { Button, Box, Stack } from "@mui/material";

type Column = { nutrient_id?: number } & GridColumn;
type Inputs = Partial<Formula>;

const Formulation = ({ saveRef }: { saveRef: React.Ref<unknown> }) => {
  const [getAllNutrients, { data: nutreints }] = useLazyGetAllNutrientsQuery();

  const defaultColumns: Column[] = [
    { id: "name", title: "Name" },
    { id: "ration", title: "%" },
    { id: "price", title: "Price[Kg]" },
    { id: "ration_weight", title: "Ration Weight [kg]" },
    { id: "ration_price", title: "Ration Price [100kg]" },
    { id: "dm", title: "DM[%]" },
  ];

  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<any[]>([{ name: "Example" }]);

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;
    },
    [columns]
  );

  const getContent = (cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = rows[row];

    const col_data = columns[col];

    // @ts-ignore
    let d = dataRow != undefined ? dataRow[columns[col].id] : "";

    const ROW_RATION_INDEX = rows.length - 2;
    const ROW_REQUIREMENT_INDEX = rows.length - 1;

    if (col == 0) {
      return {
        kind: GridCellKind.Custom,
        copyData: "4",
        data: {
          kind: "button-cell",
          backgroundColor: ["transparent", "#6572ffee"],
          color: ["accentColor", "accentFg"],
          borderColor: "#6572ffa0",
          borderRadius: 9,
          title: "View Details",
          onClick: () => window.alert("Button clicked"),
        },
      };
    } else if (
      (ROW_REQUIREMENT_INDEX == row || col == 1) &&
      row != ROW_RATION_INDEX
    ) {
      return {
        kind: GridCellKind.Number,
        allowOverlay: true,
        displayData: String(d ?? 0),
        data: Number(d ?? 0),
      };
    } else if (col == columns.length - 1) {
      return {
        kind: GridCellKind.Number,
        allowOverlay: false,
        readonly: true,
        displayData: String(d ?? 0),
        data: Number(d ?? 0),
        style: "faded",
        themeOverride: {
          bgCell: "red",
        },
      };
    } else {
      return {
        kind: GridCellKind.Number,
        allowOverlay: false,
        readonly: true,
        displayData: String(d ?? 0),
        data: Number(d ?? 0),
        style: "faded",
        themeOverride: {
          bgCell: "#EFEFF1",
        },
      };
    }
  };

  const onRowAppended = React.useCallback(() => {}, []);

  const onCellActivated = React.useCallback((cell: Item) => {}, []);

  useEffect(() => {
    loadNutrientsToTable();
  }, []);

  const loadNutrientsToTable = async () => {
    const response = await getAllNutrients({}).unwrap();
    if (response) {
      const cols = response.results.map(
        (e) =>
          ({
            id: e.abbreviation,
            title: e.display_name,
          } as Column)
      );
      setColumns([...defaultColumns, ...cols]);
    }
  };

  return (
    <Box>
      <Stack direction={"row"}>
        <Button size="small" onClick={loadNutrientsToTable}>
          Reload Nutrients
        </Button>
      </Stack>
      <Sizer>
        <DataEditor
          width="100%"
          experimental={{ strict: true }}
          columns={columns}
          rows={rows.length}
          isDraggable={true}
          freezeColumns={1}
          rowMarkers="number"
          onCellEdited={onCellEdited}
          getCellContent={getContent}
          onRowAppended={onRowAppended}
          onCellActivated={onCellActivated}
          trailingRowOptions={{
            // How to get the trailing row to look right
            sticky: true,
            tint: true,
            hint: "Add Ingredient",
          }}
        />
      </Sizer>
    </Box>
  );
};

export default Formulation;
