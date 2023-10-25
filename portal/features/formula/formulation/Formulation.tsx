import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  DataEditor,
  EditableGridCell,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from "@glideapps/glide-data-grid";
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  InputAdornment,
  Stack,
  Button,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { useLazyGetNutrientsQuery } from "@/features/nutrients/services";
import { useLazyGetIngredientNutrientsQuery } from "@/features/ingredients/services";
import { Loading } from "@/components";
import { Sizer } from "../components";
import {
  Ingredient,
  Nutrient,
  Formula,
  FormulaIngredient,
  FormulaRequirement,
  FormulaRation,
} from "@/models";
import { IngredientSelectDialog } from "@/features/ingredients";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Dropdown } from "@/components/dropdowns";
import { LabeledInput } from "@/components/inputs";
import { PurposeDropdown } from "@/features/purposes";
import { CountryDropdown } from "@/features/countries";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateFormulaMutation } from "../services";
import { useCRUD } from "@/hooks";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import dynamic from "next/dynamic";

const AchivementChartComponent = dynamic(
  () => import("../components/achivement-chart"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

type Column = { nutrient_id?: number } & GridColumn;
type Inputs = Partial<Formula>;

const schema = yup
  .object({
    name: yup.string().required(),
    purpose: yup.string().nullable(),
    weight: yup.number().required(),
    country: yup.string().nullable(),
    sex: yup.string().nullable(),
    age_from_week: yup.number().nullable(),
    age_to_week: yup.number().nullable(),
    formula_basis: yup.string().nullable(),
    note: yup.string().nullable(),
  })
  .transform((currentValue: any) => {
    if (currentValue.purpose != null)
      currentValue.purpose = currentValue.purpose.id;
    if (currentValue.country != null)
      currentValue.country = currentValue.country.id;
    if (currentValue.formula_basis != null)
      currentValue.formula_basis = currentValue.formula_basis.value;
    return currentValue;
  });

const Formulation = ({ saveRef }: { saveRef: React.Ref<unknown> }) => {
  const router = useRouter();
  const [
    getNutrients,
    { data: nutreints, isUninitialized, isLoading: nutrientIsLoading },
  ] = useLazyGetNutrientsQuery();
  const [getIngredientNutrients] = useLazyGetIngredientNutrientsQuery();

  const [createFormula, createResult] = useCreateFormulaMutation();

  const [chartData, setChartData] = useState<{ x: any; y: any }>({
    x: [],
    y: [],
  });

  const defaultColumns: Column[] = [
    { id: "name", title: "Name" },
    { id: "ration", title: "%" },
    { id: "price", title: "Price[Kg]" },
    { id: "ration_weight", title: "Ration Weight [kg]" },
    { id: "ration_price", title: "Ration Price [100kg]" },
    { id: "dm", title: "DM[%]" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [isIngredientOpen, setIsIngredientOpen] = useState(false);
  const [refState, setRefresh] = useState(1);
  const columns = useRef<Column[]>([]);
  const rows = useRef<any[]>([]);
  const indexes = useRef<string[]>([]);

  const refresh = () => setRefresh(refState + 1);

  useEffect(() => {
    if (isUninitialized) {
      getNutrients({})
        .unwrap()
        .then((response) => {
          const cols: Column[] = (response?.results || []).map((e) => {
            return {
              id: e.abbreviation,
              title: e.abbreviation,
              nutrient_id: e.id,
            } as Column;
          });

          columns.current = [...defaultColumns, ...cols];

          const initRation: any = { id: "ration", name: "Ration" };
          const initReq: any = { id: "requirement", name: "Requirement" };

          indexes.current = columns.current.map((e) => {
            const key: string = e.id || "";
            if (key !== "name") {
              initRation[key] = "";
              initReq[key] = "";
            }
            return String(e.id);
          });

          rows.current = [initRation, initReq];

          refresh();
        });
    }
  }, []);

  const onCellEdited = React.useCallback(
    (cell: Item, newValue: EditableGridCell) => {
      const [col, row] = cell;

      if (rows.current[row] == undefined) {
        return;
      }

      // @ts-ignore
      rows.current[row][indexes.current[col]] = newValue.data;

      const ROW_RATION_INDEX = rows.current.length - 2;
      const ROW_REQUIREMENT_INDEX = rows.current.length - 1;

      const chart: any = {
        x: [],
        y: [],
      };

      // Start from ration col
      for (let c = 1; c < columns.current.length; c += 1) {
        const col_key: string = columns.current[c].id || "";

        let col_total: number = 0;

        for (let r = 0; r < ROW_RATION_INDEX; r += 1) {
          const ration = rows.current[r]["ration"];
          const price = rows.current[r]["price"];
          const cell = rows.current[r][col_key];

          let result = 0;

          if (c == 1) {
            // For ration column
            result = cell;
          } else if (c == 3) {
            // For ration weight
            result = ((getValues("weight") || 0) * ration) / 100;
            // Set ration weight for current row
            rows.current[r]["ration_weight"] = result;
          } else if (c == 4) {
            // For ration price per weight
            result = (((getValues("weight") || 0) * ration) / 100) * price;
            // set ration price for current row
            rows.current[r]["ration_price"] = result;
          } else {
            result = (ration * cell) / 100;
          }

          col_total += result || 0;
        }

        rows.current[ROW_RATION_INDEX][col_key] = col_total;

        // Chart data
        chart.x.push(columns.current[c].title);
        chart.y.push(
          (col_total / rows.current[ROW_REQUIREMENT_INDEX][col_key]) * 100
        );
      }

      setChartData(chart);
    },
    [columns]
  );

  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = rows.current[row];

      // @ts-ignore
      let d = dataRow != undefined ? dataRow[indexes.current[col]] : "";

      const ROW_RATION_INDEX = rows.current.length - 2;
      const ROW_REQUIREMENT_INDEX = rows.current.length - 1;

      if (col == 0) {
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
    },
    [rows]
  );

  const onRowAppended = React.useCallback(() => {
    setIsIngredientOpen(true);
  }, []);

  const onCellActivated = React.useCallback((cell: Item) => {}, []);

  const handleSelected = async (value?: Ingredient) => {
    console.log(value);
    // if (value == undefined || value == null) return;
    // setIsIngredientOpen(false);
    // setIsLoading(true);
    // try {
    //   const newRow: any = {
    //     id: 0,
    //     name: value.name,
    //     value: 0,
    //     price: value.price,
    //     dm: value.dm,
    //   };
    //   const response = await getIngredientNutrients({
    //     id: value.id,
    //     query: {},
    //   }).unwrap();
    //   for (let i = 0; i < response.results.length; i += 1) {
    //     let abbvr: string = (response.results[0].nutrient as Nutrient)
    //       .abbreviation;
    //     newRow[abbvr] = response.results[i].value;
    //     // Ingredient id
    //     newRow["ingredient_id"] = response.results[i].ingredient;
    //   }

    //   pushRow(newRow);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const pushRow = (row: any) => {
    rows.current = [row, ...rows.current];
    refresh();
  };
  const pushcolumn = (col: Column, index?: number) => {
    if (index) {
      columns.current = [
        ...columns.current.slice(0, index),
        col,
        ...columns.current.slice(index, -1),
      ];
    } else {
      columns.current = [...columns.current, col];
    }
    refresh();
  };

  const popAndPushcolumn = (col: Column, index?: number) => {
    if (index) {
      columns.current = [
        ...columns.current.slice(0, index),
        col,
        ...columns.current.slice(index + 1),
      ];
    } else {
      columns.current = [...columns.current, col];
    }
    refresh();
  };

  // Form
  const { handleSubmit, control, setError, getValues } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      weight: 100,
    },
  });

  const useCRUDHook = useCRUD({
    results: [createResult],
    setError: setError,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formula: Partial<Formula> = data;

    const ROW_RATION_INDEX = rows.current.length - 2;
    const ROW_REQUIREMENT_INDEX = rows.current.length - 1;

    const frm_ing: Partial<FormulaIngredient>[] = [];
    const frm_req: Partial<FormulaRequirement>[] = [];
    const frm_rtn: Partial<FormulaRation>[] = [];

    for (let r = 0; r < ROW_RATION_INDEX; r += 1) {
      frm_ing.push({
        ingredient: Number(rows.current[r]["ingredient_id"]),
        ration: Number(rows.current[r]["ration"]),
      });
    }

    // Start from nutrients
    for (let c = 6; c < columns.current.length; c += 1) {
      const col_key: string = columns.current[c].id || "";
      if (Number(rows.current[ROW_REQUIREMENT_INDEX][col_key]) !== 0) {
        frm_req.push({
          nutrient: columns.current[c].nutrient_id,
          value: Number(rows.current[ROW_REQUIREMENT_INDEX][col_key]),
        });
      }

      if (Number(rows.current[ROW_RATION_INDEX][col_key]) !== 0) {
        frm_rtn.push({
          nutrient: columns.current[c].nutrient_id,
          value: Number(rows.current[ROW_RATION_INDEX][col_key]),
        });
      }
    }

    formula.ingredients = frm_ing as any;
    formula.rations = frm_rtn as any;
    formula.requirements = frm_req as any;
    formula.budget = Number(
      rows.current[ROW_REQUIREMENT_INDEX]["ration_price"]
    );
    formula.desired_ratio =
      Number(rows.current[ROW_REQUIREMENT_INDEX]["ration"]) || 0;
    formula.desired_dm = Number(rows.current[ROW_REQUIREMENT_INDEX]["dm"]);
    formula.ration_price = Number(
      rows.current[ROW_RATION_INDEX]["ration_price"]
    );
    formula.ration_ratio = Number(rows.current[ROW_RATION_INDEX]["ration"]);
    formula.ration_dm = Number(rows.current[ROW_RATION_INDEX]["dm"]);

    if (formula.desired_ratio == null || formula.ration_ratio == null) {
      enqueueSnackbar("Please Insert Ingredient", { variant: "warning" });
    }

    const response = await createFormula(formula);
  };

  useImperativeHandle(saveRef, () => ({
    save() {
      handleSubmit(onSubmit)();
    },
  }));

  return (
    <>
      <Loading open={nutrientIsLoading || isLoading} />
      <IngredientSelectDialog
        open={isIngredientOpen}
        onSelected={handleSelected}
        onClose={() => setIsIngredientOpen(false)}
      />
      <Box sx={{ my: 5, border: "1px solid #98AAC4" }}>
        <Accordion elevation={0} defaultExpanded>
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
                          // Update header title of price per kg
                          popAndPushcolumn(
                            {
                              id: "price",
                              title: `Price [${event.target.value}kg]`,
                            },
                            4
                          );
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
      <Stack direction={"row"} sx={{ my: 5 }} gap={2}>
        <Button variant="outlined" onClick={onRowAppended}>
          Add Ingredients
        </Button>
        <Button variant="outlined">Load Requirement</Button>
      </Stack>
      <Sizer>
        <DataEditor
          width="100%"
          experimental={{ strict: true }}
          columns={columns.current}
          rows={rows.current.length}
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
        <AchivementChartComponent data={chartData} />
      </Box>

      <Box sx={{ mt: 5 }}>
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
              onClick={() => handleSubmit(onSubmit)()}
            >
              Save
            </Button>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<CloseIcon />}
              onClick={() => router.push("/formulas")}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Formulation;
