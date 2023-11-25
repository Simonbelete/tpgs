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
  Ingredient,
  Requirement,
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
  InputAdornment,
} from "@mui/material";
import {
  useExtraCells,
  ButtonCellType,
} from "@glideapps/glide-data-grid-cells";
import _ from "lodash";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { useLazyGetAllNutrientsOfIngredientQuery } from "@/features/ingredients/services";
import { Loading } from "@/components";
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
import { useLazyGetAllNutrientsOfRequirementQuery } from "@/features/requirements/services";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SaveIcon from "@mui/icons-material/Save";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import {
  useUpdateFormulaMutation,
  useLazyGetAllIngredientsOfFormulaQuery,
  useLazyGetAllRequirementsOfFormulaQuery,
  useLazyGetAllRationsOfFormulaQuery,
} from "../services";
import { enqueueSnackbar } from "notistack";
import ClearIcon from "./ClearIcon";

const AchivementChartComponent = dynamic(
  () => import("../components/achivement-chart"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

type ColumnProperty = ({} & Partial<GridCell>) | Partial<ButtonCellType>;

type Column = {
  property: ColumnProperty;
  path: string; // lodashb _.get({}, path) key
  colId?: number; // id from api
  pathId?: string; // id for row
} & GridColumn;

interface Row {
  id?: number;
  rowId: string | number;
  display_name: string;
  ration?: number;
  ratio?: number;
  price?: number;
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
  min?: number;
  max?: number;
}

type Inputs = Partial<Formula>;

const schema = yup.object({
  name: yup.string().required(),
  purpose: yup.string().nullable(),
  weight: yup.number().required(),
  country: yup.string().nullable(),
  sex: yup.string().nullable(),
  age_from_week: yup.number().nullable(),
  age_to_week: yup.number().nullable(),
  formula_basis: yup.string().nullable(),
  note: yup.string().nullable(),
});

const Formulation = ({ data }: { data?: Formula }) => {
  const { customRenderers } = useExtraCells();

  const [getAllNutrients, { data: nutreints }] = useLazyGetAllNutrientsQuery();
  const [getAllNutrientsOfIngredient] =
    useLazyGetAllNutrientsOfIngredientQuery();
  const [getAllNutrientsOfRequirement, getNutrientsOfRequirement] =
    useLazyGetAllNutrientsOfRequirementQuery();
  const [getAllRequirementsOfFormula] =
    useLazyGetAllRequirementsOfFormulaQuery();
  const [getAllRationsOfFormula] = useLazyGetAllRationsOfFormulaQuery();
  const [getAllIngredientOfFormula] = useLazyGetAllIngredientsOfFormulaQuery();

  const [updateFormula, updateFormulaResult] = useUpdateFormulaMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [isIngredientOpen, setIsIngredientOpen] = useState(false);
  const [isRequirementOpen, setIsRequirementOpen] = useState(false);
  const [achivementData, setAchivementData] = useState<{ x: any; y: any }>({
    x: [],
    y: [],
  });

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
      },
    },
    {
      id: "price",
      title: "Unit Price",
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

  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<Row[]>([]);

  const [ration, setRation] = useState<Row>({
    rowId: "ratio",
    display_name: "Ratio",
  });

  const [requirement, setRequirement] = useState<Row>({
    rowId: "requirement",
    display_name: "Requirement",
    nutrients: {},
  });

  // Form
  const { handleSubmit, control, setError, getValues } = useForm<Inputs>({
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
    results: [updateFormulaResult],
    setError: setError,
  });

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;
      const dataCol = columns[col];
      const dataRow = rows[row];

      const RATION_INDEX = rows.length;
      const REQUIREMENT_INDEX = rows.length + 1;

      const rowCopy = [...rows];

      if (row < rowCopy.length) {
        _.set(rowCopy[row], dataCol.path, newValue.data);
      } else if (row == RATION_INDEX) {
        // TODO: should not be editable
        _.set(ration, dataCol.path, newValue.data);
      } else if (row == REQUIREMENT_INDEX) {
        // if Column is nutrient set the id also
        if (dataCol.path.includes("nutrients.")) {
          _.set(requirement, dataCol.path, newValue.data);
          _.set(requirement, dataCol.pathId || "", dataCol.colId);
        } else {
          _.set(requirement, dataCol.path, newValue.data);
        }
      }

      let updatedRation = { rowId: "ration", display_name: "Ration" };

      rowCopy.forEach((r) => {
        // Calculate feed
        columns.slice(1, -endColumns.length).forEach((c) => {
          const cell = Number(_.get(r, c.path, 0));
          const cellTotal = Number(_.get(updatedRation, c.path, 0));

          const price = Number(_.get(r, "price", 0));
          const ratio = Number(_.get(r, "ratio", 0));
          const weight: number = Number(getValues("weight") || 0);

          if (c.id == "ratio")
            _.set(
              updatedRation,
              c.path,
              roundTo3DecimalPlace(cell + cellTotal)
            );
          else if (c.id == "price")
            _.set(
              updatedRation,
              c.path,
              roundTo3DecimalPlace(cell + cellTotal)
            );
          else if (c.id == "ration_weight")
            _.set(
              updatedRation,
              c.path,
              roundTo3DecimalPlace(weight * cell + cellTotal)
            );
          else if (c.id == "ration_price")
            _.set(
              updatedRation,
              c.path,
              roundTo3DecimalPlace(((weight * ratio) / 100) * price + cellTotal)
            );
          else if (c.id == "dm")
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

      setRation(updatedRation);
      setRows(rowCopy);
    },
    [rows, ration, requirement, columns]
  );

  useEffect(() => {
    const chart: any = {
      x: [],
      y: [],
    };

    ["ratio", "price", "dm"].map((e) => {
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
    const dataRow = rows[row];

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

  useEffect(() => {
    loadNutrientsToTable();
    getFormulaRequirements();
    getFormulaRations();
    getFormulaIngredients();
  }, []);

  const getFormulaIngredients = async () => {
    if (data == null) return;

    try {
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
          rowId: _.get(ing, "ingredient.id", ""),
          display_name: _.get(ing, "ingredient.display_name", ""),
          ration: _.get(ing, "ration", 0),
          price: _.get(ing, "price", 0),
          dm: _.get(ing, "ingredient.dm", 0),
          min: _.get(ing, "ingredient.min", 0),
          max: _.get(ing, "ingredient.max", 0),
          nutrients: nutrients,
          ratio: _.get(ing, "ration", 0),
          // formula ingredient fields
          ration_price: _.get(ing, "ration_price", 0),
          ration_weight: _.get(ing, "ration_weight", 0),
        });
      });

      setRows(newRows);
    } catch (ex) {}
  };

  const getFormulaRequirements = async () => {
    if (data == null) return;

    const response = await getAllRequirementsOfFormula({
      id: data.id,
    }).unwrap();

    const newRow: Row & Partial<FormulaRequirement> = {
      id: data.id,
      rowId: "requirement",
      display_name: "Requirement",
      ration: data.desired_ratio,
      price: 0,
      ration_price: data.budget,
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

    setRequirement(newRow);
  };

  const getFormulaRations = async () => {
    if (data == null) return;

    const response = await getAllRationsOfFormula({ id: data.id }).unwrap();

    const newRow: Row & Partial<FormulaRation> = {
      id: data.id,
      rowId: "ration",
      display_name: "Ration",
      ration: data.ration_ratio,
      // TODO:
      price: 0,
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

  const deleteRow = (index: number) => {
    setRows(rows.filter((e, i) => i != index));
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

      const requests = _.map(ingredients, (e) => {
        return getAllNutrientsOfIngredient({
          id: e.id,
          query: {},
        }).unwrap();
      });

      const responses = await Promise.all(requests);

      _.forEach(responses, (e, i) => {
        const ing = _.get(ingredients, i, {});

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
          id: _.get(ing, "id", 0),
          rowId: _.get(ing, "id", ""),
          display_name: _.get(ing, "display_name", ""),
          ration: _.get(ing, "ration", 0),
          price: _.get(ing, "price", 0),
          dm: _.get(ing, "dm", 0),
          min: _.get(ing, "min", 0),
          max: _.get(ing, "max", 0),
          nutrients: nutrients,
          // formula ingredient fields
          ration_price: _.get(ing, "ration_price", 0),
          ration_weight: _.get(ing, "ration_weight", 0),
        });
      });

      setRows([...newRows, ...rows]);
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
        rowId: "requirement",
        display_name: value.display_name,
        ration: value.desired_ratio,
        price: 0,
        ration_price: value.budget,
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

      setRequirement(newRow);
    } finally {
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formula: Partial<Formula> = data;

    const ingredients: Partial<FormulaIngredient>[] = [];
    const rations: Partial<FormulaRation>[] = [];
    const requirements: Partial<FormulaRequirement>[] = [];

    _.forEach(rows, (e, i) => {
      ingredients.push({
        ingredient: _.get(e, "id", 0),
        ration: e.ratio, // TODO: naming
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
    formula.unit_price = ration.ration_price;
    formula.ration_price = ration.ration_price;
    formula.ration_ratio = ration.ratio;
    formula.ration_weight = ration.ration_weight;
    formula.ration_dm = ration.dm;

    formula.requirements = requirements as any;
    formula.budget = requirement.ration_price;
    formula.desired_ratio = requirement.ratio;
    formula.desired_dm = requirement.dm;

    const response = await updateFormula(formula as any);
  };

  const clearAll = () => {
    clearRation();
    clearRequirements();
    clearIngredients();
    resetGraph();
  };

  const clearRation = () => {
    const rationCopy = { ...ration };
    _.forEach(rationCopy.nutrients, (value, key) => {
      _.set(rationCopy.nutrients || {}, `${key}.value`, 0);
    });

    setRation(rationCopy);
  };

  const clearRequirements = () => {
    const requirementCopy = { ...ration };
    _.forEach(requirementCopy.nutrients, (value, key) => {
      _.set(requirementCopy.nutrients || {}, `${key}.value`, 0);
    });
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

  return (
    <>
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
                {/* Weight */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"weight"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <LabeledInput
                        error={!!error?.message}
                        helperText={error?.message}
                        onChange={(event: any) => {
                          console.log(event.target.value);
                          setColumns([...columns]);
                          // TODO:  Update header title of price per kg
                          onChange(event);
                        }}
                        fullWidth
                        size="small"
                        value={value ?? 0}
                        label={"Weight [Kg]"}
                        placeholder={"Weight per Kg"}
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">Kg</InputAdornment>
                          ),
                        }}
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
      <Stack direction={"row"} sx={{ my: 5 }} gap={1}>
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
          startIcon={<PlaylistAddIcon fontSize="small" />}
          sx={{ textTransform: "none" }}
          onClick={() => setIsRequirementOpen(true)}
        >
          Load Requirement
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
        <Button
          color="secondary"
          size="small"
          startIcon={<SaveIcon fontSize="small" />}
          sx={{ textTransform: "none" }}
          onClick={() => handleSubmit(onSubmit)()}
        >
          Save
        </Button>
        <ClearIcon
          onClearAll={clearAll}
          onClearIngredients={clearIngredients}
          onClearRations={clearRation}
          onClearRequirements={clearRequirements}
          resetGraph={resetGraph}
        />
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
          trailingRowOptions={{
            // How to get the trailing row to look right
            sticky: true,
            tint: true,
            hint: "Add Ingredient",
          }}
        />
      </Sizer>
      <Box sx={{ my: 5 }}>
        <AchivementChartComponent data={achivementData} />
      </Box>
    </>
  );
};

export default Formulation;
