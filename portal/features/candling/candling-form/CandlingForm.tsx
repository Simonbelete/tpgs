import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Grid, Button, Paper, Stack, Box } from "@mui/material";
import { HatcheryEgg } from "@/models";
import { LabeledInput } from "@/components/inputs";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Card } from "@/components/card";
import SaveIcon from "@mui/icons-material/Save";
import CandlingInfoZone from "./CandlingInfoZone";
import CandlingDangerZone from "./CandlingDangerZone";
import {
  useCreateCandlingMutation,
  useUpdateCandlingMutation,
} from "../services";
import { useCRUD } from "@/hooks";

type Inputs = Partial<HatcheryEgg>;

const schema = yup.object({
  name: yup.string().required(),
  house: yup.object().required(),
});

const CandlingForm = ({
  hatcher_egg,
  redirect = true,
}: {
  Candling?: Candling;
  redirect?: boolean;
}) => {
  const router = useRouter();

  const [createCandling, createResult] = useCreateCandlingMutation();
  const [updateCandling, updateResult] = useUpdateCandlingMutation();

  const { handleSubmit, control, setError } = useForm<Inputs>({
    defaultValues: {
      ...Candling,
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
      house: (data.house as House).id || 0,
    };

    if (Candling == null)
      await createCandling(body).then(
        () => redirect && router.push("/Candling")
      );
    else await updateCandling({ ...body, id: Candling.id });
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={9}>
          <Card title="Candling Form">
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
                {/* House */}
                <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={3}>
            {Candling && (
              <>
                <CandlingInfoZone id={Candling?.id} />
                <CandlingDangerZone
                  id={Candling.id}
                  is_active={Candling.is_active}
                />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default CandlingForm;
