import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box } from "@mui/material";
import { Feed } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from "@/components/card";
import SaveIcon from "@mui/icons-material/Save";
import FeedInfoZone from "./FeedInfoZone";
import FeedDangerZone from "./FeedDangerZone";
import { useCreateFeedMutation, useUpdateFeedMutation } from "../services";
import { useCRUD } from "@/hooks";
import { ChickenDropdown } from "@/features/chickens";
import { FormulaDropdown } from "@/features/formula";
import { DirectoryDropdown } from "@/features/directory";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type Inputs = Partial<Feed>;

const schema = yup.object({
  batch: yup.object().nullable(),
  flock: yup.object().nullable(),
  chicken: yup.number().nullable(),
  formula: yup.number().nullable(),
  week: yup
    .number()
    .typeError("Week must be number")
    .min(0)
    .required("Week is required"),
  weight: yup.number(),
});
// .transform((currentValue: any) => {
//   if (currentValue.chicken != null)
//     currentValue.chicken = currentValue.chicken.id;
//   if (currentValue.flock != null) currentValue.flock = currentValue.flock.id;
//   if (currentValue.formula != null)
//     currentValue.formula = currentValue.formula.id;

//   return currentValue;
// });

const FeedForm = ({
  feed,
  redirect = true,
  batch,
}: {
  feed?: Feed;
  redirect?: boolean;
  batch?: boolean;
}) => {
  const router = useRouter();

  const tenant = useSelector((state: RootState) => state.tenant);

  const [createFeed, createResult] = useCreateFeedMutation();
  const [updateFeed, updateResult] = useUpdateFeedMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...feed,
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  console.log("00000000");
  console.log(feed);

  const useCRUDHook = useCRUD({
    results: [createResult, updateResult],
    setError: setError,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body: Inputs = {
      week: data.week,
      weight: data.weight,
      formula: (data.formula as any).id || null,
    };

    if (batch) {
      body.flock = data.batch?.flock_id;
      body.pen = data.batch?.pen_id;
    } else {
      body.chicken = (data.chicken as any).id;
    }

    if (feed == null) await createFeed(data);
    else await updateFeed({ ...data, id: feed.id });
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={9}>
          <Card title="Feed Form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                {batch == true ? (
                  <>
                    {/* Flock */}
                    <Grid item xs={12}>
                      <Controller
                        name={"batch"}
                        control={control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <DirectoryDropdown
                            label="Batch"
                            query={{ farm_name: tenant.name }}
                            dataKey="batch_name"
                            onChange={(_, data) => onChange(data)}
                            value={value ?? ""}
                            error={!!error?.message}
                            helperText={error?.message}
                          />
                        )}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    {/* Chicken */}
                    <Grid item xs={12} md={6}>
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
                  </>
                )}
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
                {/* Weight */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"weight"}
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
                        label={"Feed Weight [g]"}
                        placeholder={"Feed Weight [g]"}
                      />
                    )}
                  />
                </Grid>
                {/* Formula */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name={"formula"}
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <FormulaDropdown
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
                  onClick={() => router.push("/feeds")}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={3}>
            {feed && (
              <>
                <FeedInfoZone id={feed?.id} />
                <FeedDangerZone id={feed.id} is_active={feed.is_active} />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default FeedForm;
