import React, { useState } from "react";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, TextField, Button, Card, Paper, Stack } from "@mui/material";
import { Ingredient, Nutrient, IngredientNutrient } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { AsyncDropdown } from "@/components/dropdowns";

type Inputs = Partial<Ingredient>;

const schema = object({
  name: string().required(),
}).required();

const IngredientForm = () => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {};

  const [nutrients, setNutrients] = useState<IngredientNutrient[]>([]);

  const handleAddNewNutrient = () => {
    const empty_nutrient: Partial<IngredientNutrient> = {
      nutrient: 0,
      ingredient: 0,
      value: 0,
    };
    setNutrients([...nutrients, empty_nutrient]);
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
          </Grid>
        </form>
      </Paper>
      <Paper
        sx={{ px: 5, py: 5, mt: 10 }}
        elevation={6}
        variant="outlined"
        square
      >
        <Button onClick={handleAddNewNutrient}>Add New</Button>

        <Stack spacing={2}>
          {nutrients.map((e, key) => (
            <Grid container key={key}>
              <Grid item xs={6}>
                <AsyncDropdown url="/nutrients/" key="name" />
              </Grid>
              <Grid item xs={6}>
                <LabeledInput type="number" />
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Paper>
    </>
  );
};

export default IngredientForm;
