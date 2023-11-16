import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  DataEditorProps,
  CompactSelection,
  GridSelection,
} from "@glideapps/glide-data-grid";
import { Sizer } from "../components";
import {
  Formula,
  FormulaIngredient,
  FormulaRation,
  FormulaRequirement,
  Nutrient,
} from "@/models";
import { useLazyGetAllNutrientsQuery } from "@/features/nutrients/services";
import { Button, Box, Stack } from "@mui/material";
import {
  useExtraCells,
  ButtonCellType,
} from "@glideapps/glide-data-grid-cells";
import { Highlight } from "@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render";
import _ from "lodash";
import { data } from "cypress/types/jquery";

type ColumnProperty = ({} & Partial<GridCell>) | Partial<ButtonCellType>;

type Column = {
  property: ColumnProperty;
  path: string; // lodashb _.get({}, path) key
} & GridColumn;

interface Row {
  rowId: string | number;
  // eg. {'CP': 20}, key = column.id
  nutrients?: { [key: string]: number };
}

type Inputs = Partial<Formula>;

const Formulation = ({ saveRef }: { saveRef: React.Ref<unknown> }) => {
  const { customRenderers } = useExtraCells();

  const [getAllNutrients, { data: nutreints }] = useLazyGetAllNutrientsQuery();

  const startColumns: Column[] = [
    {
      id: "name",
      title: "Name",
      path: "ingredient.name",
      property: {
        kind: GridCellKind.Text,
        allowOverlay: false,
        readonly: true,
        style: "faded",
        themeOverride: {
          bgCell: "#EFEFF1",
        },
      },
    },
    {
      id: "ration",
      title: "%",
      path: "ration",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
      },
    },
    {
      id: "price",
      title: "Price /1 Kg",
      path: "price",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: false,
        readonly: true,
        style: "faded",
        themeOverride: {
          bgCell: "#EFEFF1",
        },
      },
    },
    // Ingredient Weight Based on Formula weight
    {
      id: "ration_weight",
      title: "Ration Weight (kg)",
      path: "ration_weight",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: false,
        readonly: true,
        style: "faded",
        themeOverride: {
          bgCell: "#EFEFF1",
        },
      },
    },
    // // Ingredient price * ingredient weight i.e batch price
    {
      id: "ration_price",
      title: "Ration Price (kg)",
      path: "ration_price",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: false,
        readonly: true,
        style: "faded",
        themeOverride: {
          bgCell: "#EFEFF1",
        },
      },
    },
    {
      id: "dm",
      title: "DM (%)",
      path: "dm",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: false,
        readonly: true,
        style: "faded",
        themeOverride: {
          bgCell: "#EFEFF1",
        },
      },
    },
  ];

  const endColumns: Column[] = [
    {
      id: "min",
      title: "Min",
      path: "min",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: false,
        readonly: true,
        style: "faded",
        themeOverride: {
          bgCell: "#EFEFF1",
        },
      },
    },
    {
      id: "max",
      title: "Max",
      path: "max",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: false,
        readonly: true,
        style: "faded",
        themeOverride: {
          bgCell: "#EFEFF1",
        },
      },
    },
    {
      id: "setting",
      title: "Setting",
      width: 80,
      path: "setting",
      property: {
        kind: GridCellKind.Custom,
        copyData: "4",
        allowOverlay: false,
        data: {
          kind: "button-cell",
          backgroundColor: ["transparent", "#6572ffee"],
          color: ["accentColor", "accentFg"],
          borderColor: "#6572ffa0",
          borderRadius: 9,

          title: "Delete",
        },
      },
    },
  ];

  const rationRow: Partial<FormulaRation[]> = [];

  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<
    Array<Partial<Omit<FormulaIngredient, "nutrients">> & Row>
  >([
    {
      id: 1,
      rowId: 1,
      display_name: "Ingredient 1",
      ingredient: {
        id: 1,
        name: "Ing 1",
      },
      nutrients: {
        N1: 88,
      },
    },
  ]);

  const [ration, setRation] = useState<Row & Partial<FormulaRation>>({
    rowId: "ration",
    display_name: "Ration",
  });

  const [requirement, setRequirement] = useState<
    Row & Partial<FormulaRequirement>
  >({
    rowId: "requirement",
    display_name: "Requirement",
    nutrients: {},
  });

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;
      const dataCol = columns[col];
      const dataRow = rows[row];

      // calc = rows[i].nutreints.map(e => e.value * rows[i].ration)

      const RATION_INDEX = rows.length;
      const REQUIREMENT_INDEX = rows.length + 1;

      if (row < rows.length) {
        _.set(rows[row], dataCol.path, newValue.data);
      } else if (row == RATION_INDEX) {
        // TODO: should not be editable
        _.set(ration, dataCol.path, newValue.data);
      } else if (row == REQUIREMENT_INDEX) {
        _.set(requirement, dataCol.path, newValue.data);
      }

      let updatedRation = { rowId: "ration", display_name: "Ration" };

      const calcColumna = columns.slice(
        startColumns.length,
        -endColumns.length
      );

      rows.forEach((r) => {
        // Calculate feed
        columns.slice(1, -endColumns.length).forEach((c) => {
          const cell = _.get(r, c.path, 0);
          const cellTotal = _.get(updatedRation, c.path, 0);

          const ration = _.get(r, "ration", 0);
          const weight = 100;

          if (c.id == "ration") _.set(updatedRation, c.path, cell + cellTotal);
          else if (c.id == "price")
            _.set(updatedRation, c.path, cell + cellTotal);
          else if (c.id == "ration_weight")
            _.set(updatedRation, c.path, weight * cell + cellTotal);
          else if (c.id == "ration_price")
            _.set(updatedRation, c.path, (weight * ration) / 100 + cellTotal);
          else if (c.id == "dm")
            _.set(updatedRation, c.path, (ration * cell) / 100 + cellTotal);
          else _.set(updatedRation, c.path, (ration * cell) / 100 + cellTotal);
        });
      });

      setRation(updatedRation);
    },
    [columns]
  );

  const getIngredientContent = (cell: Item): any => {
    const [col, row] = cell;
    const dataRow = rows[row];
    const dataCol = columns[col];

    let d = _.get(dataRow, dataCol.path);

    if (dataCol.property.kind == GridCellKind.Custom) {
      return {
        ...dataCol.property,
        data: {
          kind: "button-cell",
          backgroundColor: ["transparent", "#6572ffee"],
          color: ["accentColor", "accentFg"],
          borderColor: "#6572ffa0",
          borderRadius: 9,
          title: "Delete",
          onClick: () => deleteRow(row),
        },
      };
    } else {
      return {
        ...dataCol.property,
        displayData: String(d ?? 0),
        data: Number(d ?? 0),
      };
    }
  };

  const getRationContent = (cell: Item): any => {
    const [col, row] = cell;
    const dataRow = rows[row];
    const dataCol = columns[col];

    let d =
      col == 0 ? _.get(ration, "display_name") : _.get(ration, dataCol.path);

    return {
      ...dataCol.property,
      displayData: String(d ?? 0),
      data: String(d ?? 0),
      readonly: true,
      allowOverlay: false,
      style: "faded",
      themeOverride: {
        bgCell: "#EFEFF1",
      },
    };
  };

  const getRequirementContent = (cell: Item): any => {
    const [col, row] = cell;
    const dataRow = rows[row];
    const dataCol = columns[col];

    let d =
      col == 0
        ? _.get(requirement, "display_name")
        : _.get(requirement, dataCol.path);

    // TODO:
    d =
      dataCol.property.kind == GridCellKind.Number
        ? Number(d ?? 0)
        : String(d ?? "");

    if (col == 0) {
      return {
        ...dataCol.property,
        displayData: String(d ?? ""),
        data: String(d ?? ""),
      };
    } else {
      return {
        ...dataCol.property,
        allowOverlay: true,
        readonly: false,
        displayData: String(d ?? ""),
        data: String(d ?? ""),
        style: null,
        themeOverride: null,
      };
    }
  };

  const getContent = (cell: Item): GridCell | ButtonCellType => {
    const [col, row] = cell;

    let d: number | string = "";

    const RATION_INDEX = rows.length;
    const REQUIREMENT_INDEX = rows.length + 1;

    if (row < rows.length) return getIngredientContent(cell);
    else if (row == RATION_INDEX) return getRationContent(cell);
    else if (row == REQUIREMENT_INDEX) return getRequirementContent(cell);
    else
      return {
        kind: GridCellKind.Text,
        readonly: true,
        allowOverlay: false,
        displayData: String(d ?? ""),
        data: String(d ?? ""),
        style: "faded",
        themeOverride: {
          bgCell: "#EFEFF1",
        },
      };
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
            path: `nutrients.${e.abbreviation}`,
            searchPath: "abbreviation",
            path2: "value",
            property: {
              kind: GridCellKind.Number,
              allowOverlay: false,
            },
          } as Column)
      );
      setColumns([...startColumns, ...cols, ...endColumns]);
    }
  };

  const deleteRow = (index: number) => {
    // setRows(rows.map((e, i) => i != index));
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
          customRenderers={customRenderers}
          width="100%"
          experimental={{ strict: true }}
          columns={columns}
          rows={rows.length + 2}
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
