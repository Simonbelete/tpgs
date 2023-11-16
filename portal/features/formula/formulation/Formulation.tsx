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
  searchPath?: string; // for searching inside path
  path2?: string; // value after path -> searchPath -> path2
} & GridColumn;

interface Row {
  rowId: string | number;
  nutrients?: { id?: number; abbreviation: string; value: number }[];
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
      title: "Price (Kg)",
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
  const [rows, setRows] = useState<Array<Row & Partial<FormulaIngredient>>>([
    {
      id: 1,
      rowId: 1,
      display_name: "Ingredient 1",
      ingredient: {
        id: 1,
        name: "Ing 1",
      },
      nutrients: [
        {
          abbreviation: "N1",
          value: 88,
        },
      ],
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
  });

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;

      //   if (rows[row] == undefined) {
      //     return;
      //   }

      //   // @ts-ignore
      //   rows[row][columns[col].id] = newValue.data;

      //   const ROW_RATION_INDEX = rows.length - 2;
      //   const ROW_REQUIREMENT_INDEX = rows.length - 1;

      // const cols = [
      //   { id: "name", title: "Name" },
      //   { id: "CP", title: "Crud Protine" },
      // ]

      // const rows = [
      //   { id: 'ing_id', name: "ing 1", ration: '20%' nutreints: [
      //     {
      //       'abbreviation': 'CP',
      //       'value': 0
      //     }
      //   ]}
      // ]

      // calc = rows[i].nutreints.map(e => e.value * rows[i].ration)
    },
    [columns]
  );

  const getIngredientContent = (cell: Item): any => {
    const [col, row] = cell;
    const dataRow = rows[row];
    const dataCol = columns[col];

    let d = _.get(dataRow, dataCol.path);

    if (dataCol.path2 != null) {
      d = _.find(
        _.get(dataRow, dataCol.path),
        (el) => _.get(el, dataCol?.searchPath || "") == dataCol.id
      );
      d = _.get(d, dataCol.path2 || "");
    } else {
      d = _.get(dataRow, dataCol.path);
    }

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

    // if (col == columns.length - 1) {
    //   return {
    //     kind: GridCellKind.Custom,
    //     copyData: "4",
    //     allowOverlay: false,
    //     data: {
    //       kind: "button-cell",
    //       backgroundColor: ["transparent", "#6572ffee"],
    //       color: ["accentColor", "accentFg"],
    //       borderColor: "#6572ffa0",
    //       borderRadius: 9,

    //       title: "Delete",
    //       onClick: () => deleteRow(row),
    //     },
    //   };
    // } else if (col == 1) {
    //   return {
    //     kind: GridCellKind.Number,
    //     allowOverlay: true,
    //     displayData: String(d ?? 0),
    //     data: Number(d ?? 0),
    //   };
    // } else {
    //   d =
    //     dataRow.nutrients?.find((e) => e.abbreviation == dataKey)?.value || "";
    //   return {
    //     kind: GridCellKind.Number,
    //     allowOverlay: false,
    //     readonly: true,
    //     displayData: String(d ?? 0),
    //     data: Number(d ?? 0),
    //     style: "faded",
    //     themeOverride: {
    //       bgCell: "#EFEFF1",
    //     },
    //   };
    // }
  };

  const getRationContent = (cell: Item): any => {
    const [col, row] = cell;
    const dataRow = rows[row];
    const dataCol = columns[col];

    let d = _.get(dataRow, dataCol.path);

    d = dataCol.property.kind == GridCellKind.Number ? Number(d ?? 0) : d;

    return {
      ...dataCol.property,
      displayData: d,
      data: d,
    };
  };

  const getRequirementContent = (cell: Item): any => {
    const [col, row] = cell;
    const dataRow = rows[row];
    const dataCol = columns[col];

    let d = _.get(dataRow, dataCol.path);

    d = dataCol.property.kind == GridCellKind.Number ? Number(d ?? 0) : d;

    return {
      ...dataCol.property,
      displayData: d,
      data: d,
    };
  };

  const getContent = (cell: Item): GridCell | ButtonCellType => {
    const [col, row] = cell;

    let d: number | string = "";

    const RATION_INDEX = rows.length + 1;
    const REQUIREMENT_INDEX = rows.length + 2;

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

    // if (row)
    //   if (col < startColumns.length) {
    //     if (dataRow.ingredient != null) {
    //       d = (dataRow.ingredient as any)[dataKey];
    //     }
    //   } else {
    //     // Render nutrient value
    //     if (Array.isArray(dataRow.nutrients)) {
    //       d =
    //         dataRow.nutrients?.find((e) => e.abbreviation == dataKey)?.value ??
    //         "";
    //     }
    //   }

    // const ROW_RATION_INDEX = rows.length - 2;
    // const ROW_REQUIREMENT_INDEX = rows.length - 1;

    // if (col == 0) {
    //   return {
    //     kind: GridCellKind.Text,
    //     readonly: true,
    //     allowOverlay: false,
    //     displayData: String(d ?? ""),
    //     data: String(d ?? ""),
    //     style: "faded",
    //     themeOverride: {
    //       bgCell: "#EFEFF1",
    //     },
    //   };
    // }
    // if (col == columns.length - 1 && row < rows.length - 2) {
    //   return {
    //     kind: GridCellKind.Custom,
    //     copyData: "4",
    //     allowOverlay: false,
    //     data: {
    //       kind: "button-cell",
    //       backgroundColor: ["transparent", "#6572ffee"],
    //       color: ["accentColor", "accentFg"],
    //       borderColor: "#6572ffa0",
    //       borderRadius: 9,

    //       title: "Delete",
    //       onClick: () => deleteRow(row),
    //     },
    //   };
    // } else if (
    //   (ROW_REQUIREMENT_INDEX == row || col == 1) &&
    //   row != ROW_RATION_INDEX
    // ) {
    //   return {
    //     kind: GridCellKind.Number,
    //     allowOverlay: true,
    //     displayData: String(d ?? 0),
    //     data: Number(d ?? 0),
    //   };
    // } else {
    //   return {
    //     kind: GridCellKind.Number,
    //     allowOverlay: false,
    //     readonly: true,
    //     displayData: String(d ?? 0),
    //     data: Number(d ?? 0),
    //     style: "faded",
    //     themeOverride: {
    //       bgCell: "#EFEFF1",
    //     },
    //   };
    // }
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
            path: "nutrients",
            searchPath: "abbreviation",
            path2: "value",
            property: {
              kind: GridCellKind.Number,
              allowOverlay: false,
              readonly: true,
              style: "faded",
              themeOverride: {
                bgCell: "#EFEFF1",
              },
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
