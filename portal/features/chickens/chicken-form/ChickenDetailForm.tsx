import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box } from "@mui/material";
import { Chicken } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from '@/components/card';
import SaveIcon from '@mui/icons-material/Save';
import ChickenInfoZone from "./ChickenInfoZone";
import ChickenDangerZone from "./ChickenDangerZone";
import { useCreateChickenMutation, useUpdateChickenMutation } from "../services";
import { useCRUD } from "@/hooks";
import { AsyncDropdown, Dropdown } from "@/components/dropdowns";
import { ChickenDropdown } from "../chicken-dropdown";
import { FlockDropdown } from "@/features/flocks";
import { HouseDropdown } from "@/features/houses";

type Inputs = Partial<Chicken>;

const sexOptions = [
  { value: null, name: "---" },
  { value: "M", name: "Male" },
  { value: "F", name: "Female" },
]

const schema = yup
  .object({
    tag: yup.string().required(),
    sex: yup.string().nullable(),
    sire: yup.number().nullable(),
    dam: yup.number().nullable(),
    flock: yup.number().nullable(),
    house: yup.number().nullable(),
    pen: yup.string().nullable(),
    reduction_date: yup.string().nullable(),
    reduction_reason: yup.string().nullable(),
}).transform((currentValue: any) => {
  if (currentValue.sire != null)
    currentValue.sire = currentValue.sire.id;
  if (currentValue.dam != null)
    currentValue.dam = currentValue.dam.id;
  if (currentValue.flock != null)
    currentValue.flock = currentValue.flock.id;
  if (currentValue.house != null)
    currentValue.house = currentValue.house.id;
  if (currentValue.sex != null)
    currentValue.sex = currentValue.sex.value;

  return currentValue;
});


const ChickenDetailForm = ({chicken}: {chicken?: Chicken}) => {
  const router = useRouter();

  const [createChicken, createResult ] = useCreateChickenMutation();
  const [updateChicken, updateResult ] = useUpdateChickenMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...chicken,
      // TODO: Create a separate sex dropdown
      // @ts-ignore
      sex: sexOptions.find((o) => o.value == chicken?.sex) 
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
    if (chicken == null) await createChicken(data);
    else await updateChicken({...data, id: chicken.id});
  };

  return (
    <>
      <Card title="Chicken Form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={4} columnSpacing={10}>
            {/* Name */}
            <Grid item xs={12} md={6}>
              <Controller
                name={"tag"}
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
                    label={"Tag"}
                    placeholder={"Tag"}
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
                        options={sexOptions}
                        dataKey="name"
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        label="Sex"
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
            </Grid>
            {/* Sire */}
            <Grid item xs={12} md={6}>
              <Controller
                name={"sire"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <ChickenDropdown
                    sex={'M'}
                    onChange={(_, data) => onChange(data)}
                    value={value}
                    label="Sire"
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            {/* Dam */}
            <Grid item xs={12} md={6}>
              <Controller
                name={"dam"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <ChickenDropdown
                    sex={'F'}
                    onChange={(_, data) => onChange(data)}
                    value={value}
                    label="Dam"
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            {/* Flock */}
            <Grid item xs={12} md={6}>
              <Controller
                name={"flock"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FlockDropdown
                    onChange={(_, data) => onChange(data)}
                    value={value}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            {/* House */}
            <Grid item xs={12} md={6}>
              <Controller
                name={"house"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <HouseDropdown
                    onChange={(_, data) => onChange(data)}
                    value={value}
                    label="House"
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
             {/* Pen */}
             <Grid item xs={12} md={6}>
              <Controller
                name={"pen"}
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
                    value={value ?? ""}
                    label={"Pen"}
                    placeholder={"Pen"}
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
    </>
  )
}

export default ChickenDetailForm;