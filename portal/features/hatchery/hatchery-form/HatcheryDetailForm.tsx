import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box, Typography } from "@mui/material";
import { Hatchery } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from "@/components/card";
import SaveIcon from "@mui/icons-material/Save";
import {
  useCreateHatcheryMutation,
  useUpdateHatcheryMutation,
} from "../services";
import { useCRUD } from "@/hooks";
import { DatePicker } from "@mui/x-date-pickers";
import { BreedDropdown } from "@/features/breeds";
import dayjs from "dayjs";

type Inputs = Partial<Hatchery>;

const schema = yup.object({
  name: yup.string().required(),
  incubation_moved_date: yup.string().nullable(),
  hatch_date: yup.string().nullable(),
  breed: yup.object().required("Select breed type"),
  note: yup.string().nullable(),
});

const HatcheryDetailForm = ({
  hatchery,
  redirect = true,
}: {
  hatchery?: Hatchery;
  redirect?: boolean;
}) => {
  const router = useRouter();

  const [createHatchery, createResult] = useCreateHatcheryMutation();
  const [updateHatchery, updateResult] = useUpdateHatcheryMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...hatchery,
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
      name: data.name,
      incubation_moved_date: dayjs(data.incubation_moved_date).format(
        process.env.NEXT_PUBLIC_API_DATE_FORMAT
      ),
      hatch_date: dayjs(data.hatch_date).format(
        process.env.NEXT_PUBLIC_API_DATE_FORMAT
      ),
      breed: (data.breed as any).id || null,
      note: data.note,
    };

    if (hatchery == null)
      await createHatchery(body).then(
        () => redirect && router.push("/hatchery")
      );
    else await updateHatchery({ ...body, id: hatchery.id });
  };

  console.log("00000000000000");
  console.log(hatchery);

  return (
    <>
      <Card title="Hatchery Form">
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
                    value={value ?? ""}
                    label={"Name"}
                    placeholder={"Name"}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name={"incubation_moved_date"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Stack gap={1}>
                    <Typography variant="body2" fontWeight={700}>
                      Incubation Date
                    </Typography>
                    <DatePicker
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          error: !!error?.message,
                          helperText: error?.message,
                        },
                      }}
                      onChange={onChange}
                      value={dayjs(value)}
                    />
                  </Stack>
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name={"hatch_date"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Stack gap={1}>
                    <Typography variant="body2" fontWeight={700}>
                      Hatch Date
                    </Typography>
                    <DatePicker
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          error: !!error?.message,
                          helperText: error?.message,
                        },
                      }}
                      onChange={onChange}
                      value={dayjs(value)}
                    />
                  </Stack>
                )}
              />
            </Grid>
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
                    onChange={(_, data) => onChange(data)}
                    value={value ?? ""}
                  />
                )}
              />
            </Grid>
            {/* Note */}
            <Grid item xs={12}>
              <Controller
                name={"note"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <LabeledInput
                    multiline
                    error={!!error?.message}
                    helperText={error?.message}
                    onChange={onChange}
                    fullWidth
                    size="small"
                    value={value}
                    label={"Remark"}
                    placeholder={"Remark"}
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
    </>
  );
};

export default HatcheryDetailForm;
