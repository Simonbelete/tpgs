import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Tabs,
  Tab,
  Box,
  tabsClasses,
  InputAdornment,
  Button,
  Chip,
} from "@mui/material";
import { Requirement } from "@/models";
import RequirementInfoZone from "./RequirementInfoZone";
import RequirementDangerZone from "./RequirementDangerZone";
// import RequirementNutrients from "./RequirementNutrients";
import {
  useCreateRequirementMutation,
  useUpdateRequirementMutation,
  useLazyGetRequirementNutrientsQuery,
} from "../services";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LabeledInput } from "@/components/inputs";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from "@/components/card";
import SaveIcon from "@mui/icons-material/Save";
import { useCRUD } from "@/hooks";
import { useRouter } from "next/router";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import RequirementNutrients from "./RequirementNutrients";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type Inputs = Partial<Requirement>;

const schema = yup.object({
  name: yup.string().required(),
  dm: yup.number().nullable(),
  description: yup.string().nullable(),
});

const RequirementForm = ({
  requirement,
  redirect = true,
}: {
  requirement?: Requirement;
  redirect?: boolean;
}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.requirementForm);
  const router = useRouter();
  const [tab, setTab] = useState(0);

  const [
    requirementNutrientTrigger,
    { isLoading: ingredientNutrientIsLoading, data: ingredientNutrient },
  ] = useLazyGetRequirementNutrientsQuery();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const [createRequirement, createResult] = useCreateRequirementMutation();
  const [updateRequirement, updateResult] = useUpdateRequirementMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...requirement,
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
      dm: data.dm,
    };
    if (requirement == null)
      await createRequirement({ ...body, nutrients: selector.nutrients }).then(
        () => redirect && router.push("/requirements")
      );
    else await updateRequirement({ ...body, id: requirement.id });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8.5} xl={9}>
          <Tabs
            scrollButtons
            value={tab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            <Tab label="Detail" {...a11yProps(0)} />
            <Tab
              label="Nutrients"
              iconPosition="end"
              icon={
                <Chip
                  label={
                    selector.nutrients.length || requirement?.nutrient_count
                  }
                  size="small"
                />
              }
              {...a11yProps(1)}
            />
          </Tabs>
          <Box sx={{ pt: 5 }}>
            {tab == 0 && (
              <>
                <Card title="Requirement Form">
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
                              value={value ?? ""}
                              label={"Name"}
                              placeholder={"Name"}
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
                              value={value ?? 0}
                              label={"DM [%]"}
                              placeholder={"DM in %"}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    %
                                  </InputAdornment>
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
                              value={value ?? ""}
                              label={"Description"}
                              placeholder={"Description"}
                              type="string"
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
            )}
            {tab == 1 && <RequirementNutrients id={requirement?.id} />}
          </Box>
        </Grid>
        <Grid item xs={12} lg={0.5} xl={1} />
        <Grid item xs={12} lg={3} xl={2}>
          <Stack spacing={3}>
            {requirement && (
              <>
                <RequirementInfoZone id={requirement?.id} />
                <RequirementDangerZone
                  id={requirement.id}
                  is_active={requirement.is_active}
                />
              </>
            )}
          </Stack>
        </Grid>
        <Grid xs={12}></Grid>
      </Grid>
    </>
  );
};

export default RequirementForm;
