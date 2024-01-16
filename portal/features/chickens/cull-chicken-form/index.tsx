import React, { useEffect } from "react";
import * as yup from "yup";
import { Egg, Chicken } from "@/models";
import { chickenApi } from "@/features/chickens/services";
import { ChickenDropdown } from "../chicken-dropdown";
import { Grid, Box, Button, Stack } from "@mui/material";
import { ReductionReasonDropdown } from "@/features/reduction-reason";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useUpdateChickenMutation } from "../services";
import _ from "lodash";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card } from "@/components";
import { useCRUD } from "@/hooks";
import { useRouter } from "next/router";

type Inputs = Partial<Chicken> & { chicken: Chicken };

const schema = yup.object({
  reduction_reason: yup.object().required(),
  reduction_date: yup.string().required(),
});

export const CullChickenForm = ({
  data,
  shallowRoute = true,
}: {
  data?: Egg;
  shallowRoute?: boolean;
}) => {
  const [updateChicken, updateResult] = useUpdateChickenMutation();
  const router = useRouter();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body: any = {
      id: _.get(data.chicken, "id", 0),
      reduction_reason: (data.reduction_reason as any)?.id || null,
      reduction_date: dayjs(data.reduction_date).format(
        process.env.NEXT_PUBLIC_API_DATE_FORMAT
      ),
    };

    await updateChicken(body);
    router.push(`/chickens/${body.id}/edit`);
  };

  const useCRUDHook = useCRUD({
    results: [updateResult],
    setError: setError,
  });

  const submitAndNew = async () => {
    await handleSubmit(onSubmit)();
    router.push("/chickens/cull");
  };

  return (
    <Card title="Cull chicken">
      <form>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <Grid container rowSpacing={4} columnSpacing={10}>
            <Grid item xs={12}>
              <Controller
                name={"chicken"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <ChickenDropdown
                    onChange={(_, data) => onChange(data)}
                    value={value ?? ""}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={"reduction_reason"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <ReductionReasonDropdown
                    onChange={(_, data) => onChange(data)}
                    value={value ?? ""}
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={"reduction_date"}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, isTouched, isDirty, error },
                }) => (
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
                    value={dayjs(value as string)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Stack spacing={2} direction={"row"} sx={{ mt: 3 }}>
          <Button
            onClick={() => handleSubmit(onSubmit)()}
            variant="text"
            size="small"
          >
            Cull & new
          </Button>
          <Button
            onClick={() => handleSubmit(onSubmit)()}
            variant="contained"
            size="small"
            disableElevation
          >
            Cull Chicken
          </Button>
        </Stack>
      </form>
    </Card>
  );
};
