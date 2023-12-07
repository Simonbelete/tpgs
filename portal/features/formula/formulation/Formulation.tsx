import React, { useEffect, useRef, useState } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import { Sizer } from "../components";
import {
  Formula,
  FormulaIngredient,
  FormulaRation,
  FormulaRequirement,
  Nutrient,
  Ingredient,
  Requirement,
  RequirementIngredient,
} from "@/models";
import { useLazyGetAllNutrientsQuery } from "@/features/nutrients/services";
import {
  Button,
  Box,
  Stack,
  AccordionSummary,
  Accordion,
  Typography,
  Grid,
  AccordionDetails,
  IconButton,
  Backdrop,
} from "@mui/material";
import {
  useExtraCells,
  ButtonCellType,
} from "@glideapps/glide-data-grid-cells";
import _ from "lodash";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import {
  useLazyGetAllNutrientsOfIngredientQuery,
  useUpdateIngredientMutation,
} from "@/features/ingredients/services";
import { PieChartSkeleton } from "@/components";
import { IngredientSelectDialog } from "@/features/ingredients";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Dropdown } from "@/components/dropdowns";
import { LabeledInput } from "@/components/inputs";
import { PurposeDropdown } from "@/features/purposes";
import { CountryDropdown } from "@/features/countries";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCRUD } from "@/hooks";
import dynamic from "next/dynamic";
import { RequirementSelectDialog } from "@/features/requirements";
import {
  useLazyGetAllNutrientsOfRequirementQuery,
  useLazyGetAllIngredientsOfRequirementQuery,
} from "@/features/requirements/services";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {
  useCreateFormulaMutation,
  useUpdateFormulaMutation,
  useLazyGetAllIngredientsOfFormulaQuery,
  useLazyGetAllRequirementsOfFormulaQuery,
  useLazyGetAllRationsOfFormulaQuery,
  useDeleteIngredientOfFormulaMutation,
} from "../services";
import { enqueueSnackbar } from "notistack";
import ClearIcon from "./ClearIcon";
import SearchIcon from "@mui/icons-material/Search";
import { Dna } from "react-loader-spinner";
import { RenderPdfDocument } from "./RenderPdfDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PrintIcon from "@mui/icons-material/Print";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Analysis from "./Analysis";
import SaveIcon from "./SaveIcon";
import LoadLocalHistoryIcon from "./LoadLocalHistoryIcon";

export const LOCAL_FORMULA_KEY = "formula";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <PieChartSkeleton />,
});

export type ColumnProperty = ({} & Partial<GridCell>) | Partial<ButtonCellType>;

export type Column = {
  property: ColumnProperty;
  path: string; // lodashb _.get({}, path) key
  colId?: number; // id from api
  pathId?: string; // id for row
  width?: number;
} & GridColumn;

export interface Row {
  /**
   * For ingredients, id holds Ingredient id
   * rowId holds either FormulaIngredient.id(when data is seted) or Ingredient.id(for new formula)
   */
  id?: number;
  rowId: string | number;
  display_name: string;
  ration?: number;
  ratio?: number;
  unit_price?: number;
  ration_weight?: number;
  ration_price?: number;
  dm?: number;
  // eg. {'CP': 20}, key = column.id
  nutrients?: {
    [key: string]: {
      id: number; // Nutrient id
      value: number;
    };
  };
  // Stores Min & Max for requirement
  ingredients?: RequirementIngredient[];
  min?: number;
  max?: number;
}

type Inputs = Partial<Formula>;

const schema = yup.object({
  name: yup.string().required(),
  purpose: yup.string().nullable(),
  country: yup.string().nullable(),
  sex: yup.string().nullable(),
  age_from_week: yup.number().nullable(),
  age_to_week: yup.number().nullable(),
  formula_basis: yup.string().nullable(),
  note: yup.string().nullable(),
});

const Formulation = ({ data }: { data?: Formula }) => {
  const ref = useRef(null);
  const { customRenderers } = useExtraCells();

  const [getAllNutrients, { isFetching: isFetchingGetAllNutrients }] =
    useLazyGetAllNutrientsQuery();
  const [getAllNutrientsOfIngredient] =
    useLazyGetAllNutrientsOfIngredientQuery();
  const [
    getAllNutrientsOfRequirement,
    { isFetching: isFetchingGetAllNutrientsOfRequirement },
  ] = useLazyGetAllNutrientsOfRequirementQuery();

  const [
    getAllIngredientsOfRequirementQuery,
    { isFetching: isFetchingGetAllIngredientsOfRequirement },
  ] = useLazyGetAllIngredientsOfRequirementQuery();

  const [getAllRequirementsOfFormula] =
    useLazyGetAllRequirementsOfFormulaQuery();
  const [getAllRationsOfFormula] = useLazyGetAllRationsOfFormulaQuery();
  const [getAllIngredientOfFormula] = useLazyGetAllIngredientsOfFormulaQuery();
  const [deleteIngredientOfFormula] = useDeleteIngredientOfFormulaMutation();

  const [updateIngredient, updateIngredientResult] =
    useUpdateIngredientMutation();

  const [createFormula, createFormulaResult] = useCreateFormulaMutation();
  const [updateFormula, updateFormulaResult] = useUpdateFormulaMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [isIngredientOpen, setIsIngredientOpen] = useState(false);
  const [isRequirementOpen, setIsRequirementOpen] = useState(false);
  const [achivementData, setAchivementData] = useState<{ x: any; y: any }>({
    x: [],
    y: [],
  });
  const [showSearch, setShowSearch] = React.useState(false);
  const onSearchClose = React.useCallback(() => setShowSearch(false), []);

  const startColumns: Column[] = [
    {
      id: "name",
      title: "Name",
      path: "display_name",
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
      id: "ratio",
      title: "%",
      path: "ratio",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
        readonly: false,
      },
    },
    {
      id: "unit_price",
      title: "Unit Price",
      path: "unit_price",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
        readonly: false,
        // style: "faded",
        themeOverride: {
          bgCell: "#e6e6f0",
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
      title: "Batch Price (kg)",
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
        allowOverlay: true,
      },
    },
    {
      id: "max",
      title: "Max",
      path: "max",
      property: {
        kind: GridCellKind.Number,
        allowOverlay: true,
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

  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<Row[]>([]);

  const [ration, setRation] = useState<Row>({
    rowId: "ration",
    display_name: "Ration",
  });

  const [requirement, setRequirement] = useState<Row>({
    rowId: "requirement",
    display_name: "Requirement",
    ration_weight: 100,
    nutrients: {},
  });

  // Form
  const { handleSubmit, control, setError, setValue } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  const roundTo3DecimalPlace = (value: number): number => {
    return Number(value.toFixed(3));
  };

  const useCRUDHook = useCRUD({
    results: [createFormulaResult, updateIngredientResult, updateFormulaResult],
    setError: setError,
  });

  const computeRation = (rowCopy: Row[], requirementCopy: Row) => {
    let updatedRation: Row = { rowId: "ration", display_name: "Ration" };

    const weight: number = _.get(requirementCopy, "ration_weight", 0);

    rowCopy.forEach((r, i) => {
      // Ingredient price not calculated price
      const price: number = Number(_.get(r, "unit_price", 0));
      const ratio: number = Number(_.get(r, "ratio", 0));

      // Set Batch Datas
      const ration_weight = (weight * ratio) / 100;
      _.set(
        rowCopy[i],
        "ration_price",
        roundTo3DecimalPlace(ration_weight * price)
      );
      _.set(rowCopy[i], "ration_weight", roundTo3DecimalPlace(ration_weight));

      // Calculate feed, i.e only sets ration row
      columns.slice(1, -endColumns.length).forEach((c) => {
        const cell = Number(_.get(r, c.path, 0));
        const cellTotal = Number(_.get(updatedRation, c.path, 0));

        if (c.id == "ratio") {
          _.set(updatedRation, c.path, roundTo3DecimalPlace(cell + cellTotal));
        } else if (c.id == "ration_weight") {
          _.set(updatedRation, c.path, roundTo3DecimalPlace(cell + cellTotal));
        } else if (c.id == "ration_price") {
          _.set(updatedRation, c.path, roundTo3DecimalPlace(cell + cellTotal));
        } else if (c.id == "dm")
          _.set(
            updatedRation,
            c.path,
            roundTo3DecimalPlace((ratio * cell) / 100 + cellTotal)
          );
        else
          _.set(
            updatedRation,
            c.path,
            roundTo3DecimalPlace((ratio * cell) / 100 + cellTotal)
          );
        _.set(updatedRation, c?.pathId || "", c.colId);
      });
    });

    setRows(rowCopy);
    setRation(updatedRation);

    localStorage.setItem(
      LOCAL_FORMULA_KEY,
      JSON.stringify({
        rows: rowCopy,
        ration: updatedRation,
        requirement: requirementCopy,
      })
    );
  };

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;
      const dataCol = columns[col];
      const dataRow = rows[row];

      const RATION_INDEX = rows.length;
      const REQUIREMENT_INDEX = rows.length + 1;

      const rowCopy = [...rows];
      const requirementCopy = { ...requirement };

      if (row < rowCopy.length) {
        _.set(rowCopy[row], dataCol.path, newValue.data);
      } else if (row == RATION_INDEX) {
        // TODO: should not be editable
        _.set(ration, dataCol.path, newValue.data);
      } else if (row == REQUIREMENT_INDEX) {
        // if Column is nutrient set the id also
        if (dataCol.path.includes("nutrients.")) {
          _.set(requirementCopy, dataCol.path, newValue.data);
          _.set(requirementCopy, dataCol.pathId || "", dataCol.colId);
        } else {
          _.set(requirementCopy, dataCol.path, newValue.data);
        }

        // Since requirement is changed set is as new requirement
        if (col > startColumns.length - 2) {
          _.set(requirementCopy, "rowId", "requirement");
          _.set(requirementCopy, "display_name", "Requirement");
        }

        setRequirement(requirementCopy);
      }

      computeRation(rowCopy, requirementCopy);
    },
    [rows, ration, requirement, columns]
  );

  useEffect(() => {
    const chart: any = {
      x: [],
      y: [],
    };

    ["ratio", "ration_weight", "dm"].map((e) => {
      chart.x.push(e);
      const req: number = _.get(requirement, `${e}`, 0);
      const rat: number = _.get(ration, `${e}`, 0);

      if (req == 0) chart.y.push(0);
      else chart.y.push(roundTo3DecimalPlace(Number((rat / req) * 100)));
    });

    // Achivement chart
    Object.keys(ration?.nutrients || {}).map((key, i) => {
      chart.x.push(key);
      const req: number = _.get(requirement, `nutrients.${key}.value`, 0);
      const rat: number = _.get(ration, `nutrients.${key}.value`, 0);

      if (req == 0) chart.y.push(0);
      else chart.y.push(roundTo3DecimalPlace(Number((rat / req) * 100)));
    });

    setAchivementData(chart);
  }, [requirement, ration]);

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

    let d = _.get(requirement, dataCol.path);

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
        displayData: String(d ?? 0),
        data: String(d ?? 0),
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

  const onRowAppended = React.useCallback(() => {
    setIsIngredientOpen(true);
  }, []);

  const alertUser = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const saveTemporarily = async () => {
    localStorage.setItem(
      LOCAL_FORMULA_KEY,
      JSON.stringify({ rows: rows, ration: ration, requirement: requirement })
    );
  };

  const loadFromLocalstorage = async () => {
    const sd = localStorage.getItem(LOCAL_FORMULA_KEY) || "";

    const formula = JSON.parse(sd);
    setRows(_.get(formula, "rows", []));
    setRation(
      _.get(formula, "ration", {
        rowId: "ration",
        display_name: "Ration",
      })
    );
    setRequirement(
      _.get(formula, "requirement", {
        rowId: "requirement",
        display_name: "Requirement",
        ration_weight: 100,
        nutrients: {},
      })
    );
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);

    loadNutrientsToTable();
    if (data != null) {
      getFormulaRations();
      getFormulaIngredients();
      getFormulaRequirements();
    }

    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const pouplateIngredientsWithMinAndMax = async ({
    rowCopy,
    requirementCopy,
  }: {
    rowCopy: Row[];
    requirementCopy: Row;
  }) => {
    _.forEach(requirementCopy.ingredients, (el, key) => {
      const index = _.findIndex(
        rowCopy,
        (o) => o.id == _.get(el.ingredient, "id", 0)
      );
      if (index > -1) {
        // Set only if the ingredient have no 0 min and max
        if (rowCopy[index].min == 0) _.set(rowCopy[index], "min", el.min);

        if (rowCopy[index].max == 0) _.set(rowCopy[index], "max", el.max);
      }
    });

    setRows(rowCopy);
  };

  const loadMinAndMax = async (requirementCopy: Row) => {
    const response = await getAllIngredientsOfRequirementQuery({
      id: Number(requirementCopy.rowId),
    }).unwrap();

    _.set(requirementCopy, "ingredients", response.results);

    setRequirement(requirementCopy);
    pouplateIngredientsWithMinAndMax({
      rowCopy: [...rows],
      requirementCopy: requirementCopy,
    });
  };

  const getFormulaIngredients = async () => {
    if (data == null) return;

    try {
      setIsLoading(true);
      const response = await getAllIngredientOfFormula({
        id: data.id,
      }).unwrap();

      const formulaIngredients = response.results;

      const newRows: Row[] = [];

      const requests = _.map(formulaIngredients, (e) => {
        const ing_id = _.get(e, "ingredient.id", 0);

        return getAllNutrientsOfIngredient({
          id: ing_id,
          query: {},
        }).unwrap();
      });

      const responses = await Promise.all(requests);

      _.forEach(responses, (e, i) => {
        const ing = _.get(formulaIngredients, i, {});

        const nutrients = {};

        _.forEach(e.results, (n) => {
          const nutrient = n.nutrient as Nutrient;
          const abbreviation: string = nutrient.abbreviation;
          const val = _.get(n, "value", 0);
          _.set(nutrients, abbreviation, {
            id: nutrient.id,
            value: val,
          });
        });

        newRows.push({
          id: _.get(ing, "ingredient.id", 0),
          rowId: _.get(ing, "id", ""),
          display_name: _.get(ing, "ingredient.display_name", ""),
          unit_price: _.get(ing, "ingredient_price", 0),
          dm: _.get(ing, "ingredient.dm", 0),
          min: _.get(ing, "min", 0),
          max: _.get(ing, "max", 0),
          nutrients: nutrients,
          ratio: _.get(ing, "ration", 0),
          // formula ingredient fields
          ration_price: _.get(ing, "ration_price", 0),
          ration_weight: _.get(ing, "ration_weight", 0),
        });
      });

      setRows(newRows);
    } catch (ex) {
    } finally {
      setIsLoading(false);
    }
  };

  const getFormulaRequirements = async () => {
    if (data == null) return;

    setIsLoading(true);

    const response = await getAllRequirementsOfFormula({
      id: data.id,
    }).unwrap();

    const newRow: Row & Partial<FormulaRequirement> = {
      id: data.id,
      rowId: _.get(data.requirement, "id", "requirement"),
      display_name: _.get(data.requirement, "name", "Requirement"),
      ratio: data.desired_ratio,
      unit_price: data.budget,
      ration_price: data.budget * data.weight,
      ration_weight: data.weight,
      dm: data.desired_dm,
      nutrients: {},
    };

    for (let i = 0; i < response.results.length; i += 1) {
      const nutrient = response.results[i].nutrient as Nutrient;
      const abbreviation: string = (response.results[i].nutrient as Nutrient)
        .abbreviation;
      const val = _.get(response.results[i], "value", 0);
      _.set(newRow, `nutrients.${abbreviation}`, {
        id: nutrient.id,
        value: val,
      });
    }

    if (typeof newRow.rowId == "number") {
      await loadMinAndMax(newRow);
    } else {
      setRequirement(newRow);
    }

    setIsLoading(false);
  };

  const getFormulaRations = async () => {
    if (data == null) return;

    setIsLoading(true);

    const response = await getAllRationsOfFormula({ id: data.id }).unwrap();

    const newRow: Row & Partial<FormulaRation> = {
      id: data.id,
      rowId: "ration",
      display_name: "Ration",
      ratio: data.ration_ratio,
      unit_price: data.unit_price || 0,
      ration_price: data.ration_price,
      ration_weight: data.ration_weight,
      dm: data.ration_dm,
      nutrients: {},
    };

    for (let i = 0; i < response.results.length; i += 1) {
      const nutrient = response.results[i].nutrient as Nutrient;
      const abbreviation: string = (response.results[i].nutrient as Nutrient)
        .abbreviation;
      const val = _.get(response.results[i], "value", 0);
      _.set(newRow, `nutrients.${abbreviation}`, {
        id: nutrient.id,
        value: val,
      });
    }

    setRation(newRow);
    setIsLoading(false);
  };

  const loadNutrientsToTable = async () => {
    const response = await getAllNutrients({}).unwrap();
    if (response) {
      const cols = response.results.map(
        (e) =>
          ({
            id: e.abbreviation,
            colId: e.id,
            title: e.display_name,
            path: `nutrients.${e.abbreviation}.value`,
            pathId: `nutrients.${e.abbreviation}.id`,
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

  const deleteRow = async (index: number) => {
    let rowCopy = [...rows];

    rowCopy = rows.filter((e, i) => i != index);

    if (data != null) {
      try {
        const response = await deleteIngredientOfFormula({
          formula: data.id,
          id: Number(rows[index].rowId) || 0,
        }).unwrap();
      } catch (ex) {}
    }

    computeRation(rowCopy, requirement);
  };

  const addSelectedIngredients = async (ingredients?: Ingredient[]) => {
    if (ingredients?.length == 0 || ingredients == null) {
      setIsIngredientOpen(false);
      return;
    }

    try {
      setIsIngredientOpen(false);
      setIsLoading(true);
      ingredients = ingredients ?? [];

      const newRows: Row[] = [];

      const requests: any = [];

      _.forEach(ingredients, (e) => {
        if (_.findIndex(rows, { rowId: e.id }) == -1) {
          requests.push(
            getAllNutrientsOfIngredient({
              id: e.id,
              query: {},
            }).unwrap()
          );
        } else {
          enqueueSnackbar(`Ingredient - ${e.display_name}, already exists`, {
            variant: "warning",
          });
        }
      });

      const responses = await Promise.all(requests);

      _.forEach(responses, (e, i) => {
        const ing = _.get(ingredients, i, {});

        const nutrients = {};

        _.forEach(e.results, (n) => {
          const nutrient = n.nutrient as Nutrient;
          const abbreviation: string = nutrient.abbreviation;
          const val = Number(_.get(n, "value", 0));
          _.set(nutrients, abbreviation, {
            id: nutrient.id,
            value: val,
          });
        });

        newRows.push({
          id: _.get(ing, "id", 0),
          rowId: _.get(ing, "id", ""),
          display_name: _.get(ing, "display_name", ""),
          ratio: 0,
          ration_price: 0,
          ration_weight: 0,
          unit_price: _.get(ing, "price", 0),
          dm: _.get(ing, "dm", 0),
          min: 0,
          max: 0,
          nutrients: nutrients,
        });
      });

      // setRows([...newRows, ...rows]);

      localStorage.setItem(
        LOCAL_FORMULA_KEY,
        JSON.stringify({
          rows: [...newRows, ...rows],
          ration: ration,
          requirement: requirement,
        })
      );

      pouplateIngredientsWithMinAndMax({
        rowCopy: [...newRows, ...rows],
        requirementCopy: { ...requirement },
      });
    } finally {
      setIsIngredientOpen(false);
      setIsLoading(false);
    }
  };

  const handleRequirementSelected = async (value?: Requirement) => {
    if (value == null) {
      setIsRequirementOpen(false);
      return;
    }

    try {
      setIsRequirementOpen(false);
      const response = await getAllNutrientsOfRequirement(
        { id: value.id, query: {} },
        false
      ).unwrap();

      const newRow: Row & Partial<FormulaRequirement> = {
        id: value.id,
        rowId: value.id,
        display_name: value.display_name,
        ratio: value.desired_ratio,
        unit_price: value.budget,
        ration_price: value.budget * value.weight,
        ration_weight: value.weight,
        dm: value.desired_dm,
        nutrients: {},
      };

      for (let i = 0; i < response.results.length; i += 1) {
        const nutrient = response.results[i].nutrient as Nutrient;
        const abbreviation: string = nutrient.abbreviation;
        const value = _.get(response.results[i], "value", 0);
        _.set(newRow, `nutrients.${abbreviation}.value`, value);
        _.set(newRow, `nutrients.${abbreviation}.id`, nutrient.id);
      }

      localStorage.setItem(
        LOCAL_FORMULA_KEY,
        JSON.stringify({
          rows: rows,
          ration: ration,
          requirement: newRow,
        })
      );

      if (typeof newRow.rowId == "number") {
        await loadMinAndMax(newRow);
      } else {
        setRequirement(newRow);
      }
    } finally {
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const formula: Partial<Formula> = formData;

    const ingredients: Partial<FormulaIngredient>[] = [];
    const rations: Partial<FormulaRation>[] = [];
    const requirements: Partial<FormulaRequirement>[] = [];

    _.forEach(rows, (e, i) => {
      ingredients.push({
        ingredient: _.get(e, "id", 0),
        ration: e.ratio, // TODO: naming
        min: _.get(e, "min", 0),
        max: _.get(e, "max", 0),
      });
    });

    _.forEach(ration.nutrients, (value, key) => {
      if (!(_.get(value, "value", 0) == 0)) {
        rations.push({
          nutrient: _.get(value, "id"),
          value: _.get(value, "value"),
        });
      }
    });

    _.forEach(requirement.nutrients, (value, key) => {
      if (!(_.get(value, "value") == 0)) {
        requirements.push({
          nutrient: _.get(value, "id"),
          value: _.get(value, "value"),
        });
      }
    });

    formula.ingredients = ingredients as any;

    formula.rations = rations as any;
    formula.unit_price = ration.unit_price;
    formula.ration_price = ration.ration_price;
    formula.ration_ratio = ration.ratio;
    formula.ration_weight = ration.ration_weight;
    formula.ration_dm = ration.dm;

    formula.requirements = requirements as any;
    formula.budget = requirement.unit_price;
    formula.desired_ratio = requirement.ratio;
    formula.desired_dm = requirement.dm;

    formula.weight = _.get(requirement, "ration_weight", 0);

    if (typeof requirement.rowId === "number") {
      formula.requirement = requirement.rowId;
    }

    if (data == null) {
      await createFormula(formula as any);
    } else {
      await updateFormula(formula as any);
    }
  };

  const clearAll = () => {
    clearRation();
    clearRequirements();
    clearIngredients();
    resetGraph();
  };

  const clearRation = () => {
    const rationCopy = { ...ration };

    rationCopy.ratio = 0;
    rationCopy.unit_price = 0;
    rationCopy.ration_weight = 0;
    rationCopy.ration_price = 0;
    rationCopy.dm = 0;

    _.forEach(rationCopy.nutrients, (value, key) => {
      _.set(rationCopy.nutrients || {}, `${key}.value`, 0);
    });

    setRation(rationCopy);
  };

  const clearRequirements = () => {
    const requirementCopy = {
      rowId: "requirement",
      display_name: "Requirement",
      ration_weight: 100,
      nutrients: {},
      ratio: 0,
      unit_price: 0,
      ration_price: 0,
      dm: 0,
    };

    _.forEach(requirementCopy.nutrients, (value, key) => {
      _.set(requirementCopy.nutrients || {}, `${key}.value`, 0);
    });

    setRequirement(requirementCopy);
  };

  const clearIngredients = () => {
    setRows([]);
  };

  const resetGraph = () => {
    setAchivementData({
      x: [],
      y: [],
    });
  };

  const onColumnResize = (column: GridColumn, newSize: number) => {
    const columnCopy = [...columns];
    const index = _.findIndex(columnCopy, column);
    if (index > -1) {
      _.set(columnCopy[index], "width", newSize);
    }
    setColumns(columnCopy);
  };

  const updateIngredientPrices = async () => {
    // TODO: only update chaned ingredients
    const requests = _.map(rows, (e) =>
      updateIngredient({ id: Number(e.rowId) || 0, price: e.unit_price })
    );

    const responses = await Promise.all(requests);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <Backdrop
          sx={{
            position: "absolute",
            backgroundColor: "rgba(255,255,255,0.5)",
            opacity: "0.9",
            top: 0,
            bottom: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={
            isLoading ||
            isFetchingGetAllNutrients ||
            isFetchingGetAllNutrientsOfRequirement
          }
          onClick={() => {}}
        >
          <Dna
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </Backdrop>
        <IngredientSelectDialog
          multiple
          open={isIngredientOpen}
          onSelected={addSelectedIngredients}
          onClose={() => setIsIngredientOpen(false)}
        />
        <RequirementSelectDialog
          open={isRequirementOpen}
          onSelected={handleRequirementSelected}
          onClose={() => setIsRequirementOpen(false)}
        />
        <Box sx={{ my: 5, border: "1px solid #98AAC4" }}>
          <Accordion elevation={0} defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography fontWeight={600}>Formula Detail</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                  {/* Name */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name={"name"}
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid, isTouched, isDirty, error },
                      }) => (
                        <LabeledInput
                          error={!!error?.message}
                          helperText={error?.message}
                          onChange={onChange}
                          fullWidth
                          size="small"
                          value={value}
                          label={"Name"}
                          placeholder={"Name"}
                        />
                      )}
                    />
                  </Grid>
                  {/* Purpose */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name={"purpose"}
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid, isTouched, isDirty, error },
                      }) => (
                        <PurposeDropdown
                          onChange={(_, data) => onChange(data)}
                          value={value}
                          error={!!error?.message}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                  {/* Sex */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name={"sex"}
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid, isTouched, isDirty, error },
                      }) => (
                        <Dropdown
                          options={[
                            { value: "M", name: "Male" },
                            { value: "F", name: "Female" },
                          ]}
                          key="name"
                          onChange={(_, data) => onChange(data)}
                          value={value}
                          label="Sex"
                          error={!!error?.message}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                  {/* Formula Basis */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name={"formula_basis"}
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid, isTouched, isDirty, error },
                      }) => (
                        <Dropdown
                          options={[
                            { value: "AF", name: "As-Fed Basis" },
                            { value: "DM", name: "DM Basis" },
                          ]}
                          key="name"
                          onChange={(_, data) => onChange(data)}
                          value={value}
                          label="Feed Basis"
                          error={!!error?.message}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                  {/* Country */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name={"country"}
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid, isTouched, isDirty, error },
                      }) => (
                        <CountryDropdown
                          onChange={(_, data) => onChange(data)}
                          value={value}
                          error={!!error?.message}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name={"age_from_week"}
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid, isTouched, isDirty, error },
                      }) => (
                        <LabeledInput
                          error={!!error?.message}
                          helperText={error?.message}
                          onChange={onChange}
                          fullWidth
                          size="small"
                          value={value}
                          label={"Age From"}
                          placeholder={"Age From"}
                          type="number"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name={"age_to_week"}
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid, isTouched, isDirty, error },
                      }) => (
                        <LabeledInput
                          error={!!error?.message}
                          helperText={error?.message}
                          onChange={onChange}
                          fullWidth
                          size="small"
                          value={value}
                          label={"Age To"}
                          placeholder={"Age To"}
                          type="number"
                        />
                      )}
                    />
                  </Grid>
                  {/* Name */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name={"note"}
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { invalid, isTouched, isDirty, error },
                      }) => (
                        <LabeledInput
                          error={!!error?.message}
                          helperText={error?.message}
                          onChange={onChange}
                          fullWidth
                          size="small"
                          value={value}
                          label={"Remark"}
                          placeholder={"Remark"}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </form>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ my: 5 }}
          gap={1}
          alignItems={"center"}
        >
          <Button
            color="secondary"
            size="small"
            startIcon={<PlaylistAddIcon fontSize="small" />}
            sx={{ textTransform: "none" }}
            onClick={() => setIsRequirementOpen(true)}
          >
            Load Requirement
          </Button>
          <Button
            onClick={onRowAppended}
            color="secondary"
            size="small"
            startIcon={<AddIcon fontSize="small" />}
            sx={{ textTransform: "none" }}
          >
            Add Ingredients
          </Button>
          <Button
            color="secondary"
            size="small"
            startIcon={<AutorenewIcon fontSize="small" />}
            sx={{ textTransform: "none" }}
            onClick={loadNutrientsToTable}
          >
            Reload Nutrients
          </Button>
          <PDFDownloadLink
            document={
              <RenderPdfDocument
                columns={columns}
                rows={rows}
                ration={ration}
                requirement={requirement}
              />
            }
            fileName="formulation.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <IconButton aria-haspopup="true" size="small">
                  <PrintIcon fontSize="small" />
                </IconButton>
              )
            }
          </PDFDownloadLink>
          <IconButton size="small" onClick={() => setShowSearch(true)}>
            <SearchIcon fontSize="small" />
          </IconButton>
          <SaveIcon
            onSave={() => handleSubmit(onSubmit)()}
            onTempSave={saveTemporarily}
          />
          <Button
            color="secondary"
            size="small"
            startIcon={<CurrencyExchangeIcon fontSize="small" />}
            sx={{ textTransform: "none" }}
            onClick={updateIngredientPrices}
          >
            Update Price
          </Button>
          <Analysis
            rows={rows}
            columns={columns.slice(startColumns.length, -endColumns.length)}
          />
          <ClearIcon
            onClearAll={clearAll}
            onClearIngredients={clearIngredients}
            onClearRations={clearRation}
            onClearRequirements={clearRequirements}
            resetGraph={resetGraph}
          />
          <LoadLocalHistoryIcon onLoad={loadFromLocalstorage} />
        </Stack>
        <Sizer>
          <DataEditor
            ref={ref}
            className="printable-area"
            customRenderers={customRenderers}
            width="100%"
            experimental={{ strict: true }}
            columns={columns}
            rows={rows.length + 2}
            isDraggable={true}
            freezeColumns={2}
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
            showSearch={showSearch}
            onSearchClose={onSearchClose}
            keybindings={{ search: true }}
            getCellsForSelection={true}
            onColumnResize={onColumnResize}
            drawCell={(args) => {
              const { cell, rect, ctx, col, row } = args;

              const dataRow = rows[row];

              if (cell.kind !== GridCellKind.Number) return false;
              if (col !== 2) return false;
              if (row > rows.length - 1) return false;

              const ratio = _.get(dataRow, "ratio", 0);
              const min = _.get(dataRow, "min", 0);
              const max = _.get(dataRow, "max", 0);

              const isBetweenMinAndMax = ratio >= min && ratio <= max;

              ctx.save();
              const { x, y, width, height } = rect;
              const data = _.get(cell, "displayData", "0");

              ctx.fillStyle = isBetweenMinAndMax ? "#fff" : "#ffe6e6";
              ctx.fillRect(x + 1, y + 1, width - 1, height - 1);

              ctx.fillStyle = isBetweenMinAndMax ? "#000" : "#e01e1e";
              // ctx.font = "bold 14px sans-serif";
              ctx.fillText(data, x + 8 + 0.5, y + height / 2 + 4.5);
              ctx.restore();

              return true;
            }}
          />
        </Sizer>
        <Box sx={{ my: 5 }}>
          <Plot
            divId="achivement-chart"
            data={[
              {
                x: achivementData.x,
                y: achivementData.y,
                type: "bar",
              },
            ]}
            layout={{
              title: "Nutrient goal achievement out of 100%",
              height: 500,
            }}
            config={{ responsive: true }}
            style={{ width: "100%" }}
          />
        </Box>
      </div>
    </>
  );
};

export default Formulation;
