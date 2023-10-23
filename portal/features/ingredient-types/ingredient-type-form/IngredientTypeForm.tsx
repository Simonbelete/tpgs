import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box } from "@mui/material";
import { IngredientType } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from "@/components/card";
import SaveIcon from "@mui/icons-material/Save";
import IngredientTypeInfoZone from "./IngredientTypeInfoZone";
import IngredientTypeDangerZone from "./IngredientTypeDangerZone";
import {
  useCreateIngredientTypeMutation,
  useUpdateIngredientTypeMutation,
} from "../services";
import { useCRUD } from "@/hooks";

type Inputs = Partial<IngredientType>;

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

const IngredientTypeForm = ({
  ingredient_type,
  redirect = true,
}: {
  ingredient_type?: IngredientType;
  redirect?: boolean;
}) => {
  const router = useRouter();

  const [createIngredientType, createResult] =
    useCreateIngredientTypeMutation();
  const [updateIngredientType, updateResult] =
    useUpdateIngredientTypeMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...ingredient_type,
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const useCRUDHook = useCRUD({
    results: [createResult, updateResult],
    setError: setError,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (ingredient_type == null)
      await createIngredientType(data).then(
        () => redirect && router.push("/ingredient-types")
      );
    else await updateIngredientType({ ...data, id: ingredient_type.id });
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={9}>
          <Card title="IngredientType Form">
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
                  onClick={() => router.push("/ingredient-types")}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={3}>
            {ingredient_type && (
              <>
                <IngredientTypeInfoZone id={ingredient_type?.id} />
                <IngredientTypeDangerZone
                  id={ingredient_type.id}
                  is_active={ingredient_type.is_active}
                />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default IngredientTypeForm;
