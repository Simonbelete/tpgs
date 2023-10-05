import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box, InputAdornment } from "@mui/material";
import { Ingredient } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from '@/components/card';
import SaveIcon from '@mui/icons-material/Save';
import IngredientInfoZone from "./IngredientInfoZone";
import IngredientDangerZone from "./IngredientDangerZone";
import { useCreateIngredientMutation, useUpdateIngredientMutation } from "../services";
import { useCRUD } from "@/hooks";

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
  house,
  redirect = true,
}: {
  house?: Ingredient;
  redirect?: boolean;
}) => {
  const router = useRouter();

  const [createIngredient, createResult ] = useCreateIngredientMutation();
  const [updateIngredient, updateResult ] = useUpdateIngredientMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...house,
    },
    // @ts-ignore 
    resolver: yupResolver(schema),
  });

  const useCRUDHook = useCRUD({
    results: [
      createResult,
      updateResult
    ],
    setError: setError
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (house == null) await createIngredient(data);
    else await updateIngredient({...data, id: house.id});
  };

  return (
    <>
    <Grid container spacing={4}>
      <Grid item xs={9}>
        <Card title="Ingredient Form">
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
          </Grid>
          </form>
        </Card>
        <Box sx={{mt: 5}}>
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
          {house && (
            <>
            <IngredientInfoZone id={house?.id} />
            <IngredientDangerZone id={house.id} is_active={house.is_active} />
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
    </>
  );
};

export default IngredientForm;
