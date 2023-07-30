import React, { useState } from "react";
import _ from "lodash";
import {
  Paper,
  Tabs,
  Box,
  Tab,
  Button,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  OutlinedInput,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IngredientSelectDialog } from "@/features/ingredients";
import { Formula, Ingredient, Nutrient } from "@/models";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { setRequirements } from "../slices";
import { RootState } from "@/store";
import { LabeledInput } from "@/components/inputs";
import { AsyncDropdown } from "@/components/dropdowns";
import { PurposeForm } from "@/features/purposes";
import FormulaRequirements from "../formula-requirements";
import FormulaIngredients from "../formula-ingredients";
import errorToForm from "@/util/errorToForm";
import formula_service from "../services/formula_service";
import { useRouter } from "next/router";

type Inputs = Partial<Formula>;

const schema = yup.object({
  name: yup.string().required(),
});

function a11yProps(index: number) {
  return {
    id: `formula-form-${index}`,
    "aria-controls": `formula-form-${index}`,
  };
}

const FormulaForm = ({
  redirect = true,
  formula,
}: {
  redirect?: boolean;
  formula?: Formula;
}) => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // States
  const formulaState = useSelector((state: RootState) => state.formula);

  const handleOnFormulate = () => {
    console.log("---------");
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("submited");
    try {
      if (formula == null)
        await create({
          ...data,
          requirements: formulaState.requirements,
          ingredients: formulaState.ingredients,
        });
      else await update(data);
    } catch (ex: any) {
      if (ex.status == 400) {
        errorToForm(ex.data, setError);
      } else {
        enqueueSnackbar("Server Error!", { variant: "error" });
      }
    }
  };

  const create = async (data: Partial<Formula>) => {
    const response = await formula_service.create(data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully created!", { variant: "success" });
      if (redirect) router.push("/formulation/formulas");
    }
  };

  const update = async (data: Partial<Formula>) => {
    delete data.id;
    const response = await formula_service.update(formula?.id || 0, data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully updated!", { variant: "success" });
      router.push("/formulation/formulas/" + formula?.id);
    }
  };

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Paper sx={{ p: 2 }} elevation={0} variant="outlined" square>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={handleOnFormulate}
            >
              Formulate
            </Button>
            <Button
              variant="outlined"
              size="small"
              disableElevation
              onClick={handleOnFormulate}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              size="small"
              disableElevation
              onClick={handleOnFormulate}
            >
              Print
            </Button>
          </Stack>
        </Paper>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Ingredients" {...a11yProps(1)} />
          <Tab label="Requirements" {...a11yProps(2)} />
        </Tabs>
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
                        value={value}
                        label={"Name"}
                        placeholder={"Name"}
                      />
                    )}
                  />
                </Grid>
                {/* purpose */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"purpose"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <AsyncDropdown
                        multiple
                        url="/purposes/"
                        key="name"
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        label="Production Purpose"
                        error={!!error?.message}
                        helperText={error?.message}
                        createForm={<PurposeForm redirect={false} />}
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
                        label={"Weight"}
                        placeholder={"Weight"}
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
              </Grid>
            </Paper>
          )}
          {tabIndex == 1 && <FormulaIngredients id={formula?.id} />}
          {tabIndex == 2 && <FormulaRequirements id={formula?.id} />}
        </Box>
        <Box>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default FormulaForm;
