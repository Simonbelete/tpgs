import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box } from "@mui/material";
import { Nutrient } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from '@/components/card';
import SaveIcon from '@mui/icons-material/Save';
import NutrientInfoZone from "./NutrientInfoZone";
import NutrientDangerZone from "./NutrientDangerZone";
import { useCreateNutrientMutation, useUpdateNutrientMutation } from "../services";
import { useCRUD } from "@/hooks";
import { NutrientGroupDropdown } from "@/features/nutrient-group";
import { UnitDropdown } from "@/features/units";

type Inputs = Partial<Nutrient>;

const schema = yup
  .object({
    name: yup.string().required(),
    code: yup.string().nullable(),
    abbreviation: yup.string().required(),
    description: yup.string().nullable(),
    nutrient_group: yup.number().nullable(),
    unit: yup.number().nullable(),
  })
  .transform((currentValue: any) => {
    if (currentValue.nutrient_group != null)
      currentValue.nutrient_group = currentValue.nutrient_group.id;
    if (currentValue.unit != null) currentValue.unit = currentValue.unit.id;
    return currentValue;
  });

const NutrientForm = ({
  nutrient,
  redirect = true,
}: {
  nutrient?: Nutrient;
  redirect?: boolean;
}) => {
  const router = useRouter();

  const [createNutrient, createResult ] = useCreateNutrientMutation();
  const [updateNutrient, updateResult ] = useUpdateNutrientMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...nutrient,
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
    if (nutrient == null) await createNutrient(data);
    else await updateNutrient({...data, id: nutrient.id});
  };

  return (
    <>
    <Grid container spacing={4}>
      <Grid item xs={9}>
        <Card title="Nutrient Form">
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
          {/* abbreviation */}
          <Grid item xs={12} md={6}>
            <Controller
              name={"abbreviation"}
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
                  label={"Abbreviation"}
                  placeholder={"Abbreviation"}
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
                  label={"Description"}
                  placeholder={"Description"}
                />
              )}
            />
          </Grid>
          {/* Dropdown */}
          <Grid item xs={12} md={6}>
            <Controller
              name={"nutrient_group"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <NutrientGroupDropdown
                  onChange={(_, data) => onChange(data)}
                  value={value}
                  error={!!error?.message}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          {/* Unit */}
          <Grid item xs={12} md={6}>
            <Controller
              name={"unit"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <UnitDropdown 
                  onChange={(_, data) => onChange(data)}
                  value={value}
                  error={!!error?.message}
                  helperText={error?.message}
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
          {nutrient && (
            <>
            <NutrientInfoZone id={nutrient?.id} />
            <NutrientDangerZone id={nutrient.id} is_active={nutrient.is_active} />
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
    </>
  );
};

export default NutrientForm;
