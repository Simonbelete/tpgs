import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box } from "@mui/material";
import { Ingredient, IngredientNutrient, Nutrient } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from "@/components/card";
import SaveIcon from "@mui/icons-material/Save";
import IngredientNutrientInfoZone from "./IngredientNutrientInfoZone";
import IngredientNutrientDangerZone from "./IngredientNutrientDangerZone";
import {
  useCreateIngredientNutrientMutation,
  useUpdateIngredientNutrientMutation,
} from "../services";
import { useCRUD } from "@/hooks";
import { NutrientDropdown } from "@/features/nutrients";
import { IngredientDropdown } from "@/features/ingredients";

type Inputs = Partial<IngredientNutrient>;

const schema = yup.object({
  ingredient: yup.object().required(),
  nutrient: yup.object().required(),
  value: yup.number().min(0).required(),
});

const IngredientNutrientForm = ({
  pen,
  redirect = true,
}: {
  pen?: IngredientNutrient;
  redirect?: boolean;
}) => {
  const router = useRouter();

  const [createIngredientNutrient, createResult] =
    useCreateIngredientNutrientMutation();
  const [updateIngredientNutrient, updateResult] =
    useUpdateIngredientNutrientMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...pen,
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const useCRUDHook = useCRUD({
    results: [createResult, updateResult],
    setError: setError,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body = {
      value: data.value,
      ingredient: (data.ingredient as Ingredient).id || 0,
      nutrient: (data.nutrient as Nutrient).id || 0,
    };

    if (pen == null)
      await createIngredientNutrient(body).then(
        () => redirect && router.push("/pen")
      );
    else await updateIngredientNutrient({ ...body, id: pen.id });
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={9}>
          <Card title="IngredientNutrient Form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Controller
                    name={"ingredient"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <IngredientDropdown
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name={"ingredient"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <NutrientDropdown
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name={"value"}
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
                        label={"Value"}
                        placeholder={"Value"}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </Card>
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
                  onClick={() => router.push("/houses")}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={3}>
            {pen && (
              <>
                <IngredientNutrientInfoZone id={pen?.id} />
                <IngredientNutrientDangerZone
                  id={pen.id}
                  is_active={pen.is_active}
                />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default IngredientNutrientForm;
