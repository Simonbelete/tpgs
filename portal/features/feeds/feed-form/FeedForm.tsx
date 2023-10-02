import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box } from "@mui/material";
import { Feed } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from '@/components/card';
import SaveIcon from '@mui/icons-material/Save';
import FeedInfoZone from "./FeedInfoZone";
import FeedDangerZone from "./FeedDangerZone";
import { useCreateFeedMutation, useUpdateFeedMutation } from "../services";
import { useCRUD } from "@/hooks";
import { ChickenDropdown } from "@/features/chickens";
import { FlockDropdown } from "@/features/flocks";
import { FormulaDropdown } from "@/features/formula";

type Inputs = Partial<Feed>;

const schema = yup
  .object({
    flock: yup.number().nullable(),
    chicken: yup.number().nullable(),
    formula: yup.number().nullable(),
    week: yup.number().typeError("Week must be number").min(0).required("Week is required"),
    weight: yup.number(),
}).transform((currentValue: any) => {
  if (currentValue.chicken != null)
    currentValue.chicken = currentValue.chicken.id;
  if (currentValue.flock != null)
    currentValue.flock = currentValue.flock.id;
  if (currentValue.formula != null)
    currentValue.formula = currentValue.formula.id;

  return currentValue;
})

const FeedForm = ({
  feed,
  redirect = true,
  mass
}: {
  feed?: Feed;
  redirect?: boolean;
  mass?: boolean;
}) => {
  const router = useRouter();

  const [createFeed, createResult ] = useCreateFeedMutation();
  const [updateFeed, updateResult ] = useUpdateFeedMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...feed,
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
    if (feed == null) await createFeed(data);
    else await updateFeed({...data, id: feed.id});
  };

  return (
    <>
    <Grid container spacing={4}>
      <Grid item xs={9}>
        <Card title="Feed Form">
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
                  fieldState: { invalid, isTouched, isDirty, error },
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
                      fieldState: { invalid, isTouched, isDirty, error },
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
