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
import { useLazyGetNutrientsQuery } from "@/features/nutrients/services";
import { useLazyGetAllNutrientsOfIngredientQuery } from "@/features/ingredients/services";
import { Loading } from "@/components";
import { IngredientSelectDialog } from "@/features/ingredients";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Dropdown } from "@/components/dropdowns";
import { LabeledInput } from "@/components/inputs";
import { PurposeDropdown } from "@/features/purposes";
import { CountryDropdown } from "@/features/countries";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useLazyGetAllIngredientsOfFormulaQuery,
  useLazyGetAllRationsOfFormulaQuery,
  useLazyGetAllRequirementsOfFormulaQuery,
  useUpdateIngredientOfFormulaMutation,
  useCreateIngredientForFormulaMutation,
  useCreateRequirementForFormulaMutation,
  useUpdateRequirementOfFormulaMutation,
} from "../services";
import { useCRUD } from "@/hooks";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import dynamic from "next/dynamic";
import { RequirementSelectDialog } from "@/features/requirements";
import { useLazyGetAllNutrientsOfRequirementQuery } from "@/features/requirements/services";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { formulaApi } from "../services";

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
} & GridColumn;

interface Row {
  rowId: string | number;
  ration?: number;
  price?: number;
  ration_weight?: number;
  ration_price?: number;
  dm?: number;
  // eg. {'CP': 20}, key = column.id
  nutrients?: { [key: string]: number };
}

type Inputs = Partial<Formula>;

const schema = yup.object({
  name: yup.string().required(),
  // purpose: yup.string().nullable(),
  weight: yup.number().required(),
  // country: yup.string().nullable(),
  // sex: yup.string().nullable(),
  // age_from_week: yup.number().nullable(),
  // age_to_week: yup.number().nullable(),
  // formula_basis: yup.string().nullable(),
  // note: yup.string().nullable(),
});
// .transform((currentValue: any) => {
//   if (currentValue.purpose != null)
//     currentValue.purpose = currentValue.purpose.id;
//   if (currentValue.country != null)
//     currentValue.country = currentValue.country.id;
//   if (currentValue.formula_basis != null)
//     currentValue.formula_basis = currentValue.formula_basis.value;
//   return currentValue;
// });

const FormulaMatrix = ({ data }: { data?: Formula }) => {
  const { customRenderers } = useExtraCells();

  const [getAllNutrients, { data: nutreints }] = useLazyGetAllNutrientsQuery();
  const [getAllNutrientsOfIngredient] =
    useLazyGetAllNutrientsOfIngredientQuery();
  const [getAllNutrientsOfRequirement, getNutrientsOfRequirement] =
    useLazyGetAllNutrientsOfRequirementQuery();
  const [getAllIngredientOfFormula] = useLazyGetAllIngredientsOfFormulaQuery();
  const [getAllRequirementsOfFormula] =
    useLazyGetAllRequirementsOfFormulaQuery();
  const [getAllRationsOfFormula] = useLazyGetAllRationsOfFormulaQuery();

  // Ingredients
  const [createIngredient] = useCreateIngredientForFormulaMutation();
  const [updateIngredient] = useUpdateIngredientOfFormulaMutation();

  // Requirement
  const [createRequirement] = useCreateRequirementForFormulaMutation();
  const [updateRequirement] = useUpdateRequirementOfFormulaMutation();

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

  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<
    Array<Partial<Omit<FormulaIngredient, "nutrients">> & Row>
  >([]);

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

  // Form
  const { handleSubmit, control, setError, getValues } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      weight: 100,
      ...data,
    },
  });

  const roundTo3DecimalPlace = (value: number): number => {
    return Number(value.toFixed(3));
  };

  const useCRUDHook = useCRUD({
    results: [],
    setError: setError,
  });

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;
      const dataCol = columns[col];
      const dataRow = rows[row];

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

      rows.forEach((r) => {
        // Calculate feed
        columns.slice(1, -endColumns.length).forEach((c) => {
          const cell = Number(_.get(r, c.path, 0));
          const cellTotal = Number(_.get(updatedRation, c.path, 0));

          const price = Number(_.get(r, "price", 0));
          const ration = Number(_.get(r, "ration", 0));
          const weight: number = Number(getValues("weight") || 0);

          if (c.id == "ration")
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
              roundTo3DecimalPlace(
                ((weight * ration) / 100) * price + cellTotal
              )
            );
          else if (c.id == "dm")
            _.set(
              updatedRation,
              c.path,
              roundTo3DecimalPlace((ration * cell) / 100 + cellTotal)
            );
          else
            _.set(
              updatedRation,
              c.path,
              roundTo3DecimalPlace((ration * cell) / 100 + cellTotal)
            );
        });
      });

      setRation(updatedRation);
    },
    [rows, ration, requirement, columns]
  );

  useEffect(() => {
    const chart: any = {
      x: [],
      y: [],
    };

    ["ration", "price", "dm"].map((e) => {
      chart.x.push(e);
      const req: number = _.get(requirement, `${e}`, 1);
      const rat: number = _.get(ration, `${e}`, 0);
      chart.y.push(roundTo3DecimalPlace(Number((rat / req) * 100)));
    });

    console.log(chart);

    // Achivement chart
    Object.keys(ration?.nutrients || {}).map((key, i) => {
      chart.x.push(key);
      const req: number = _.get(requirement, `nutrients.${key}`, 1);
      const rat: number = _.get(ration.nutrients, `${key}`, 0);
      chart.y.push(roundTo3DecimalPlace(Number((rat / req) * 100)));
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

  const onRowAppended = React.useCallback(() => {
    setIsIngredientOpen(true);
  }, []);

  const onCellActivated = React.useCallback((cell: Item) => {}, []);

  useEffect(() => {
    // TODO: clean all data
    setRows([]);
    loadNutrientsToTable();
    if (data != null) {
      getFormulaIngredients();
      getFormulaRequirements();
      getFormulaRations();
    }
  }, []);

  const getFormulaIngredients = async () => {
    if (data == null) return;

    try {
      const response = await getAllIngredientOfFormula({
        id: data.id,
      }).unwrap();

      // for (let i = 0; i < response.results?.length; i += 1) {
      //   const formulaIngredient = response.results[i];

      //   const ingredient: Ingredient = _.get(
      //     formulaIngredient,
      //     "ingredient"
      //   ) as Ingredient;

      //   const newRows: Array<
      //     Partial<Omit<FormulaIngredient, "nutrients">> & Row
      //   > = [];

      //   // Check if ingredient already exits

      //   const newRow: Partial<Omit<FormulaIngredient, "nutrients">> & Row = {
      //     id: formulaIngredient.id,
      //     rowId: formulaIngredient.id,
      //     ...formulaIngredient,
      //     nutrients: {},
      //   };

      //   const response2 = await getAllNutrientsOfIngredient({
      //     id: formulaIngredient.ingredient.id || 0,
      //     query: {},
      //   }).unwrap();
      //   for (let i = 0; i < response2.results.length; i += 1) {
      //     const abbreviation: string = (
      //       response2.results[i].nutrient as Nutrient
      //     ).abbreviation;
      //     const ing_nutrient_value = _.get(response2.results[i], "value", 0);
      //     _.set(newRow, `nutrients.${abbreviation}`, ing_nutrient_value);
      //   }

      //   newRows.push(newRow);
      // }

      // setRows([...newRows, ...rows]);
    } catch {}
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
      const abbreviation: string = (response.results[i].nutrient as Nutrient)
        .abbreviation;
      const ing_nutrient_value = _.get(
        response.results[i],
        "nutrient.value",
        0
      );
      _.set(newRow, `nutrients.${abbreviation}`, ing_nutrient_value);
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
      const abbreviation: string = (response.results[i].nutrient as Nutrient)
        .abbreviation;
      const ing_nutrient_value = _.get(
        response.results[i],
        "nutrient.value",
        0
      );
      _.set(newRow, `nutrients.${abbreviation}`, ing_nutrient_value);
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
            title: e.display_name,
            path: `nutrients.${e.abbreviation}`,
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
    if (ingredients?.length == 0) {
      setIsIngredientOpen(false);
      return;
    }
    try {
      setIsIngredientOpen(false);
      setIsLoading(true);
      ingredients = ingredients ?? [];

      const newRows: Array<
        Partial<Omit<FormulaIngredient, "nutrients">> & Row
      > = [];

      for (let i = 0; i < ingredients?.length; i += 1) {
        // Check if ingredient already exits

        const newRow: Partial<Omit<FormulaIngredient, "nutrients">> & Row = {
          id: 0,
          rowId: ingredients[i].id,
          ingredient: {
            id: ingredients[i].id,
            name: ingredients[i].name,
            dm: ingredients[i].dm,
          },
          ration: _.get(ingredients[i], "ration", 0),
          ration_price: _.get(ingredients[i], "ration_price", 0),
          ration_weight: _.get(ingredients[i], "ration_weight", 0),
          price: ingredients[i].price,
          dm: ingredients[i].dm,
          nutrients: {},
        };

        const response = await getAllNutrientsOfIngredient({
          id: ingredients[i].id,
          query: {},
        }).unwrap();
        for (let i = 0; i < response.results.length; i += 1) {
          const abbreviation: string = (
            response.results[i].nutrient as Nutrient
          ).abbreviation;
          const ing_nutrient_value = _.get(response.results[i], "value", 0);
          _.set(newRow, `nutrients.${abbreviation}`, ing_nutrient_value);
        }

        newRows.push(newRow);
      }

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
        const abbreviation: string = (response.results[i].nutrient as Nutrient)
          .abbreviation;
        const ing_nutrient_value = _.get(response.results[i], "value", 0);
        _.set(newRow, `nutrients.${abbreviation}`, ing_nutrient_value);
      }

      setRequirement(newRow);
    } finally {
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formula: Partial<Formula> = data;

    console.log("abbbbb");

    for (let i = 0; i < rows.length; i += 1) {
      let body: Partial<FormulaIngredient> = {
        id: rows[i].id,
        formula: data.id,
        ingredient: _.get(rows[i], "ingredient.id", 0),
        ration: rows[i].ration,
      };
      formulaApi.endpoints.updateIngredientOfFormula.initiate(body);
    }
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
        <Button
          color="secondary"
          size="small"
          startIcon={<SaveAsIcon fontSize="small" />}
          sx={{ textTransform: "none" }}
          onClick={loadNutrientsToTable}
        >
          Save As
        </Button>
        <Button
          color="secondary"
          size="small"
          startIcon={<DeleteSweepIcon fontSize="small" />}
          sx={{ textTransform: "none" }}
          onClick={loadNutrientsToTable}
        >
          Remove all
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
      <Box sx={{ my: 5 }}>
        <AchivementChartComponent data={achivementData} />
      </Box>
    </>
  );
};

export default FormulaMatrix;