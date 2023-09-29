import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box } from "@mui/material";
import { Egg } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from '@/components/card';
import SaveIcon from '@mui/icons-material/Save';
import EggInfoZone from "./EggInfoZone";
import EggDangerZone from "./EggDangerZone";
import { useCreateEggMutation, useUpdateEggMutation } from "../services";
import { useCRUD } from "@/hooks";
import { ChickenDropdown } from "@/features/chickens";
import { FlockDropdown } from "@/features/flocks";

type Inputs = Partial<Egg>;

const schema = yup
  .object({
    flock: yup.number(),
    chicken: yup.number(),
    week: yup.number().typeError("Week must be number").min(0).required("Week is required"),
    eggs: yup.string(),
    weight: yup.string(),
}).transform((currentValue: any) => {
  if (currentValue.chicken != null)
    currentValue.chicken = currentValue.chicken.id;
  if (currentValue.flock != null)
    currentValue.flock = currentValue.flock.id;

  return currentValue;
})

const EggForm = ({
  egg,
  mass
}: {
  egg?: Egg;
  mass?: boolean;
}) => {
  const router = useRouter();

  const [createEgg, createResult ] = useCreateEggMutation();
  const [updateEgg, updateResult ] = useUpdateEggMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...egg,
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
    console.log(data);
    if (egg == null) await createEgg(data);
    else await updateEgg({...data, id: egg.id});
  };

  return (
    <>
    <Grid container spacing={4}>
      <Grid item xs={9}>
        <Card title="Egg Form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            {mass == true ? (
              <>
                {/* Flock */}
                <Grid item xs={12}>
                  <Controller
                    name={"flock"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
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
              </>): (
              <>
                {/* Chicken */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"chicken"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <ChickenDropdown
                        onChange={(_, data) => onChange(data)}
                        value={value}
                        error={!!error?.message}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
              </>)}
              {/* Week */}
             <Grid item xs={12} md={6}>
              <Controller
                name={"week"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <LabeledInput
                    error={!!error?.message}
                    helperText={error?.message}
                    onChange={onChange}
                    fullWidth
                    size="small"
                    value={value ?? ""}
                    label={"Week"}
                    placeholder={"Week"}
                    type={"number"}
                  />
                )}
              />
            </Grid>
              {/* Eggs */}
             <Grid item xs={12} md={6}>
              <Controller
                name={"eggs"}
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
                    label={"No of Eggs"}
                    placeholder={"No of Eggs"}
                  />
                )}
              />
            </Grid>
              {/* total Weight */}
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
                    value={value ?? ""}
                    label={"Total Weight [g]"}
                    placeholder={"Total Weight [g]"}
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
          {egg && (
            <>
            <EggInfoZone id={egg?.id} />
            <EggDangerZone id={egg.id} is_active={egg.is_active} />
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
    </>
  );
};

export default EggForm;
