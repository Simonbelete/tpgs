import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  Button,
  Card,
  Paper,
  Stack,
  Typography,
  Box,
  InputAdornment
} from "@mui/material";
import { Ingredient } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import ingredient_service from "../services/ingredient_service";
import errorToForm from "@/util/errorToForm";
import { AsyncDropdown } from "@/components/dropdowns";
import { IngredientTypeForm } from "@/features/ingredient-types";
import IngredientNutrients from "../ingredient-nutrients";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type Inputs = Partial<Ingredient>;

const schema = yup.object({
  name: yup.string().required(),
  code: yup.string().nullable(),
  ingredient_type: yup.number().nullable(),
  dm: yup.number(),
  price: yup.number(),
  description: yup.string().nullable()
}).transform((currentValue: any) => {
  if (currentValue.ingredient_type != null)
    currentValue.ingredient_type = currentValue.ingredient_type.id;
  return currentValue;
});

const IngredientForm = ({
  redirect = true,
  ingredient,
}: {
  redirect?: boolean;
  ingredient?: Ingredient;
}) => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const ingredientFormState = useSelector(
    (state: RootState) => state.ingredientForm
  );

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: ingredient?.name,
      code: ingredient?.code,
      ingredient_type: ingredient?.ingredient_type,
      dm: ingredient?.dm,
      price: ingredient?.price,
      description: ingredient?.description
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (ingredient == null) { 
        await create({ ...data, ...{nutrients: ingredientFormState.nutrients} }); 
      }else await update(data);
    } catch (ex: any) {
      if (ex.status == 400) {
        errorToForm(ex.data, setError);
      } else {
        enqueueSnackbar("Server Error!", { variant: "error" });
      }
    }
  };

  const create = async (data: Partial<Ingredient>) => {
    const response = await ingredient_service.create(data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully created!", { variant: "success" });
      if (redirect) router.push("/ingredients");
    }
  };

  const update = async (data: Partial<Ingredient>) => {   
    const response = await ingredient_service.update(ingredient?.id || 0, data);
    if ((response.status = 201)) {
      enqueueSnackbar("Successfully updated!", { variant: "success" });
      router.push("/ingredients/");
    }
  };

  return (
    <>
      <Paper sx={{ px: 5, py: 5 }} elevation={6} variant="outlined" square>
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
            {/* Code */}
            <Grid item xs={12} md={6}>
              <Controller
                name={"code"}
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
                    label={"Code"}
                    placeholder={"Code"}
                  />
                )}
              />
            </Grid>
            {/* Ingredient Type */}
            <Grid item xs={12} md={6}>
              <Controller
                name={"ingredient_type"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <AsyncDropdown
                    multiple
                    url="/ingredient-types/"
                    key="name"
                    onChange={(_, data) => onChange(data)}
                    value={value}
                    label="Ingredient Types"
                    error={!!error?.message}
                    helperText={error?.message}
                    createForm={<IngredientTypeForm redirect={false} />}
                  />
                )}
              />
            </Grid>
            {/* Price */}
            <Grid item xs={12} md={6}>
              <Controller
                name={"price"}
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
                    label={"Price [Kg]"}
                    placeholder={"Price per Kg"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">Kg</InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            {/* dry material */}
            <Grid item xs={12} md={6}>
              <Controller
                name={"dm"}
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
                    label={"DM [%]"}
                    placeholder={"DM in %"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            {/* description */}
            <Grid item xs={12} md={6}>
              <Controller
                name={"description"}
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
                    label={"Description [%]"}
                    placeholder={"Description in %"}
                    type="string"
          
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Nutrients</Typography>
      </Box>
      <Box sx={{ minHeight: "50px" }}>
        <IngredientNutrients id={ingredient?.id} />
      </Box>
    </>
  );
};

export default IngredientForm;
