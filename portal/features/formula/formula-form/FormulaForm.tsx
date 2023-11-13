import React, { useState, useImperativeHandle, useEffect } from "react";
import _ from "lodash";
import {
  Paper,
  Tabs,
  Box,
  Tab,
  Button,
  Grid,
  Typography,
  Tooltip,
  InputAdornment,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formula } from "@/models";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { clearAll, setIngredients, setRequirements } from "./slice";
import { RootState } from "@/store";
import { LabeledInput } from "@/components/inputs";
import { Dropdown } from "@/components/dropdowns";
import { PurposeDropdown } from "@/features/purposes";
import { FormulaRequirementForm } from "./FormulaRequirements";
import { FormulaIngredientForm } from "./FormulaIngredients";
import errorToForm from "@/util/errorToForm";
import { useRouter } from "next/router";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { CountryDropdown } from "@/features/countries";
import {
  useLazyFormulateQuery,
  useCreateFormulaMutation,
  useUpdateFormulaMutation,
  useLazyGetIngredientsOfFormulaQuery,
  useLazyGetRequirementsOfFormulaQuery,
} from "../services";
import { useCRUD } from "@/hooks";

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
    desired_dm: yup.string().nullable(),
    budget: yup.number().required(),
    desired_ratio: yup.number().required(),
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

function a11yProps(index: number) {
  return {
    id: `formula-form-${index}`,
    "aria-controls": `formula-form-${index}`,
  };
}

function resultA11yProps(index: number) {
  return {
    id: `formula-form-result-${index}`,
    "aria-controls": `formula-form-result-${index}`,
  };
}

const FormulaForm = ({
  redirect = true,
  formula,
  actionRef,
}: {
  redirect?: boolean;
  formula?: Formula;
  actionRef?: React.Ref<unknown>;
}) => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [tabIndex, setTabIndex] = useState(0);
  const [resultTabIndex, setResultTabIndex] = useState(0);
  const dispatch = useDispatch();

  const [
    formulateTrigger,
    { isLoading: formulateIsLoading, data: formulated },
  ] = useLazyFormulateQuery();
  const [createFormula, createResult] = useCreateFormulaMutation();
  const [updateFormula, updateResult] = useUpdateFormulaMutation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleResultTabIndexChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setResultTabIndex(newValue);
  };

  // States
  const formulaState = useSelector((state: RootState) => state.formula);

  const handleOnFormulate = () => {
    handleSubmit(onSubmit)();
  };

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ...formula,
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const useCRUDHook = useCRUD({
    results: [createResult, updateResult],
    setError: setError,
  });

  useImperativeHandle(actionRef, () => ({
    formulate() {
      startFormulating();
    },

    createAndNew() {
      handleSubmit(onSubmit)();
    },
  }));

  const startFormulating = async () => {
    if (formula !== undefined) await formulateTrigger(formula?.id);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (formula === undefined) {
      await createFormula({
        ...data,
        requirements: formulaState.requirements,
        ingredients: formulaState.ingredients,
      });
    } else {
      await updateFormula({
        ...data,
        requirements: formulaState.requirements,
        ingredients: formulaState.ingredients,
        id: formula.id,
      });
    }
  };

  const [goalAchivements, setGoalAchivements] = useState({
    total_cost: 0,
    total_ratio: 0,
    total_weight: 0,
    total_dm: 0,
  });

  const [formulaIngredientTrigger] = useLazyGetIngredientsOfFormulaQuery();
  const [formulaRequirementTrigger] = useLazyGetRequirementsOfFormulaQuery();

  useEffect(() => {
    if (formula !== undefined) {
      formulaIngredientTrigger({ id: formula?.id, query: {} }).then(
        (response) => {
          dispatch(setIngredients(response.data?.results || []));
        }
      );

      formulaRequirementTrigger({ id: formula.id, query: {} }).then((res) => {
        // @ts-ignore
        dispatch(setRequirements(res.data?.results || []));
      });
    }
  }, []);

  useEffect(() => {
    const cost_achived: number =
      (formulated == null
        ? formula?.ration_price
        : formulated.results.ration_price) || 0;
    const cost_goal: number =
      (formulated == null ? formula?.budget : formulated.results.budget) || 0;

    const ratio_achived: number =
      (formulated == null
        ? formula?.ration_ratio
        : formulated.results.ration_ratio) || 0;
    const ratio_goal: number =
      (formulated == null
        ? formula?.desired_ratio
        : formulated.results.desired_ratio) || 0;

    const weight_achived: number =
      (formulated == null
        ? formula?.ration_weight
        : formulated.results.ration_weight) || 0;
    const weight_goal: number =
      (formulated == null ? formula?.weight : formulated.results.weight) || 0;

    const dm_achived: number =
      (formulated == null
        ? formula?.ration_dm
        : formulated.results.ration_dm) || 0;
    const dm_goal: number =
      (formulated == null
        ? formula?.desired_dm
        : formulated.results.desired_dm) || 0;

    setGoalAchivements({
      total_cost: Number(
        ((cost_achived / (cost_goal == 0 ? 1 : cost_goal)) * 100).toFixed(3)
      ),
      total_ratio: Number(
        ((ratio_achived / (ratio_goal == 0 ? 1 : ratio_goal)) * 100).toFixed(3)
      ),
      total_weight: Number(
        ((weight_achived / (weight_goal == 0 ? 1 : weight_goal)) * 100).toFixed(
          3
        )
      ),
      total_dm: Number(
        ((dm_achived / (dm_goal == 0 ? 1 : dm_goal)) * 100).toFixed(3)
      ),
    });
  }, [formula, formulated]);

  const computeAchivementGradeLabel = (achived: number) => {
    if (achived <= 0 || achived > 100) return "error";
    else if (achived >= 90 && achived <= 100) return "success";
    return "warning";
  };

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Paper sx={{ py: 1, px: 5 }} elevation={0} variant="outlined" square>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "left", lg: "center" }}
            spacing={{ xs: 2, lg: 0 }}
            divider={
              <Divider
                // @ts-ignore
                orientation={{ xs: "horizontal", lg: "vertical" }}
                flexItem
              />
            }
          >
            <Stack>
              <Typography variant="caption" color="text.secondary">
                TOTAL COST
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Tooltip title="Achived Cost">
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="secondary"
                  >
                    {formulated == null
                      ? formula?.ration_price
                      : formulated.results.ration_price}
                  </Typography>
                </Tooltip>
                <Tooltip title="Achivement">
                  <Chip
                    size="small"
                    variant="outlined"
                    color={computeAchivementGradeLabel(
                      goalAchivements.total_cost
                    )}
                    label={`${goalAchivements.total_cost} %`}
                  />
                </Tooltip>
              </Stack>
              <Tooltip title="Desired Cost">
                <Typography variant="caption" color="text.secondary">
                  {formulated == null
                    ? formula?.budget
                    : formulated.results.budget}
                </Typography>
              </Tooltip>
            </Stack>

            <Stack>
              <Typography variant="caption" color="text.secondary">
                TOTAL Ratio [%]
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Tooltip title="Achived Ration">
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="secondary"
                  >
                    {formulated == null
                      ? formula?.ration_ratio
                      : formulated.results.ration_ratio}
                  </Typography>
                </Tooltip>
                <Tooltip title="Achivement">
                  <Chip
                    size="small"
                    variant="outlined"
                    color={computeAchivementGradeLabel(
                      goalAchivements.total_ratio
                    )}
                    label={`${goalAchivements.total_ratio} %`}
                  />
                </Tooltip>
              </Stack>
              <Tooltip title="Desired Cost">
                <Typography variant="caption" color="text.secondary">
                  {formulated == null
                    ? formula?.desired_ratio
                    : formulated.results.desired_ratio}
                </Typography>
              </Tooltip>
            </Stack>

            <Stack>
              <Typography variant="caption" color="text.secondary">
                TOTAL WEIGHT [kg]
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Tooltip title="Achived Weight">
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="secondary"
                  >
                    {formulated == null
                      ? formula?.ration_weight
                      : formulated.results.ration_weight}
                  </Typography>
                </Tooltip>
                <Tooltip title="Achivement">
                  <Chip
                    size="small"
                    variant="outlined"
                    color={computeAchivementGradeLabel(
                      goalAchivements.total_weight
                    )}
                    label={`${goalAchivements.total_weight} %`}
                  />
                </Tooltip>
              </Stack>
              <Tooltip title="Desired Cost">
                <Typography variant="caption" color="text.secondary">
                  {formulated == null
                    ? formula?.weight
                    : formulated.results.weight}
                </Typography>
              </Tooltip>
            </Stack>

            <Stack>
              <Typography variant="caption" color="text.secondary">
                TOTAL DM [%]
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Tooltip title="Achived DM">
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="secondary"
                  >
                    {formulated == null
                      ? formula?.ration_dm
                      : formulated.results.ration_dm}
                  </Typography>
                </Tooltip>
                <Tooltip title="Achivement">
                  <Chip
                    size="small"
                    variant="outlined"
                    color={computeAchivementGradeLabel(
                      goalAchivements.total_dm
                    )}
                    label={`${goalAchivements.total_dm} %`}
                  />
                </Tooltip>
              </Stack>
              <Tooltip title="Desired Cost">
                <Typography variant="caption" color="text.secondary">
                  {formulated == null
                    ? formula?.desired_dm
                    : formulated.results.desired_dm}
                </Typography>
              </Tooltip>
            </Stack>
          </Stack>
        </Paper>
      </Box>

      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="General" {...a11yProps(0)} />
        <Tab
          label="Ingredients"
          icon={
            <Chip label={formulaState.ingredients.length || 0} size="small" />
          }
          iconPosition="end"
          {...a11yProps(1)}
        />
        <Tab
          label="Requirements"
          icon={
            <Chip label={formulaState.requirements.length || 0} size="small" />
          }
          iconPosition="end"
          {...a11yProps(2)}
        />
      </Tabs>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mx={2} my={4} pb={4}>
          {tabIndex == 0 && (
            <Paper
              sx={{ px: 5, py: 5 }}
              elevation={6}
              variant="outlined"
              square
            >
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
                        value={value || ""}
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
                {/* Weight Requirement */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"weight"}
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
                        label={"Weight [Kg]"}
                        placeholder={"Weight"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">Kg</InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                {/* Requirement budget */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"budget"}
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
                        label={"Requirement Price [Kg]"}
                        placeholder={"Requirement Price [Kg]"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">Kg</InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
                {/* Requirement Ratio */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"desired_ratio"}
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
                        label={"Requirement Ratio [Kg]"}
                        placeholder={"Requirement Ratio [Kg]"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">%</InputAdornment>
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
                        label={"Note"}
                        placeholder={"Note"}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"desired_dm"}
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
                        label={"Dry Material"}
                        placeholder={"Dry Material"}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Paper>
          )}
          {tabIndex == 1 && <FormulaIngredientForm data={formula} />}
          {tabIndex == 2 && <FormulaRequirementForm data={formula} />}
        </Box>
      </form>
      <Box>
        <Stack
          spacing={2}
          direction={"row"}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              size="small"
              onClick={startFormulating}
            >
              Formulate
            </Button>
          </Box>
          <Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LibraryAddIcon />}
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
              onClick={() => router.push("/formulation/formulas")}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default FormulaForm;
