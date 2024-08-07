import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box } from "@mui/material";
import { Flock } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from "@/components/card";
import SaveIcon from "@mui/icons-material/Save";
import { useCreateFlockMutation, useUpdateFlockMutation } from "../services";
import { useCRUD } from "@/hooks";
import { BreedDropdown } from "@/features/breeds";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type Inputs = Partial<Flock>;

const schema = yup
  .object({
    name: yup.string().required(),
    breed: yup.number(),
    hatch_date: yup.string(),
  })
  .transform((currentValue: any) => {
    if (currentValue.breed != null) currentValue.breed = currentValue.breed.id;

    return currentValue;
  });

const FlockDetailForm = ({ flock }: { flock?: Flock }) => {
  const router = useRouter();

  const [createFlock, createResult] = useCreateFlockMutation();
  const [updateFlock, updateResult] = useUpdateFlockMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...flock,
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const useCRUDHook = useCRUD({
    results: [createResult, updateResult],
    setError: setError,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    data.hatch_date = dayjs(data.hatch_date).format(
      process.env.NEXT_PUBLIC_API_DATE_FORMAT
    );

    if (flock == null) await createFlock(data);
    else await updateFlock({ ...data, id: flock.id });
  };

  return (
    <>
      <Card title="Flock Form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            {/* Name */}
            <Grid item xs={12}>
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
            {/* Name */}
            <Grid item xs={12}>
              <Controller
                name={"breed"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <BreedDropdown
                    error={!!error?.message}
                    helperText={error?.message}
                    onChange={onChange}
                    value={value ?? ""}
                  />
                )}
              />
            </Grid>
            {/* Name */}
            <Grid item xs={12}>
              <Controller
                name={"hatch_date"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => <DatePicker onChange={onChange} value={value ?? ""} />}
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
    </>
  );
};

export default FlockDetailForm;
