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
} from "@mui/material";
import { Ingredient } from "@/models";
import IngredientInfoZone from "./IngredientInfoZone";
import IngredientDangerZone from "./IngredientDangerZone";
import IngredientNutrients from "./IngredientNutrients";
import {
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
} from "../services";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LabeledInput } from "@/components/inputs";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from "@/components/card";
import SaveIcon from "@mui/icons-material/Save";
import { useCRUD } from "@/hooks";
import { IngredientTypeDropdown } from "@/features/ingredient-types";
import { useRouter } from "next/router";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type Inputs = Partial<Ingredient>;

const schema = yup
  .object({
    name: yup.string().required(),
    code: yup.string().nullable(),
    ingredient_type: yup.number().nullable(),
    dm: yup.number(),
    price: yup.number(),
    description: yup.string().nullable(),
  })
  .transform((currentValue: any) => {
    if (currentValue.ingredient_type != null)
      currentValue.ingredient_type = currentValue.ingredient_type.id;
    return currentValue;
  });

const IngredientForm = ({ ingredient }: { ingredient?: Ingredient }) => {
  const selector = useSelector((state: RootState) => state.ingredientForm);
  const router = useRouter();
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const [createIngredient, createResult] = useCreateIngredientMutation();
  const [updateIngredient, updateResult] = useUpdateIngredientMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...ingredient,
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const useCRUDHook = useCRUD({
    results: [createResult, updateResult],
    setError: setError,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (ingredient == null)
      await createIngredient({ ...data, nutrients: selector.nutrients });
    else await updateIngredient({ ...data, id: ingredient.id });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={9} xl={9.5}>
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
            <Tab label="Nutrients" {...a11yProps(1)} />
          </Tabs>
          <Box sx={{ pt: 5 }}>
            {tab == 0 && (
              <>
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
                              value={value ?? ""}
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
                              value={value ?? ""}
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
                            <IngredientTypeDropdown
                              multiple
                              onChange={(_, data) => onChange(data)}
                              value={value ?? []}
                              error={!!error?.message}
                              helperText={error?.message}
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
                              value={value ?? 0}
                              label={"Price [Kg]"}
                              placeholder={"Price per Kg"}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    Kg
                                  </InputAdornment>
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
              </>
            )}
            {tab == 1 && <IngredientNutrients id={ingredient?.id} />}
          </Box>
        </Grid>
        <Grid item xs={12} lg={3} xl={2.5}>
          <Stack spacing={3}>
            {ingredient && (
              <>
                <IngredientInfoZone id={ingredient?.id} />
                <IngredientDangerZone
                  id={ingredient.id}
                  is_active={ingredient.is_active}
                />
              </>
            )}
          </Stack>
        </Grid>
        <Grid xs={12}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default IngredientForm;
