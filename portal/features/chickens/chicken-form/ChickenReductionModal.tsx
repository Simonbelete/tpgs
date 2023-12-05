import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Chicken } from "@/models";
import { useUpdateChickenMutation } from "../services";
import { ReductionReasonDropdown } from "@/features/reduction-reason";
import { DatePicker } from "@mui/x-date-pickers";
import { useCRUD } from "@/hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import dayjs from "dayjs";
import _ from "lodash";

type Inputs = Partial<Chicken>;

const schema = yup.object({
  reduction_reason: yup.object().required(),
  reduction_date: yup.string().required(),
});

const ChickenReductionSelectDialog = ({ chicken }: { chicken: Chicken }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [updateChicken, updateResult] = useUpdateChickenMutation();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { handleSubmit, control, setError } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const useCRUDHook = useCRUD({
    results: [updateResult],
    setError: setError,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body = {
      reduction_reason: (data.reduction_reason as any)?.id || null,
      reduction_date: dayjs(data.reduction_date).format(
        process.env.NEXT_PUBLIC_API_DATE_FORMAT
      ),
    };

    setIsOpen(false);
    updateChicken({ ...body, id: chicken.id });
  };

  const handleRestore = async () => {
    const body = {
      reduction_reason: null,
      reduction_date: null,
    };

    // @ts-ignore
    await updateChicken({ ...body, id: chicken.id });
  };

  return (
    <>
      <Stack direction={"row"} justifyContent="space-between">
        {(_.get(updateResult.data, "reduction_date", null) ||
          chicken.reduction_date) != null ? (
          <>
            <Typography component="span" gutterBottom={true}>
              <Typography variant="body2" fontWeight={600}>
                Restore
              </Typography>
              <Typography
                variant="caption"
                color="text.light"
                sx={{ lineHeight: 0 }}
              >
                Restore Chicken
              </Typography>
            </Typography>
            <Box>
              <LoadingButton
                loading={updateResult.isLoading}
                loadingPosition="start"
                startIcon={<></>}
                variant="outlined"
                color="info"
                size="small"
                onClick={handleRestore}
              >
                Restore
              </LoadingButton>
            </Box>
          </>
        ) : (
          <>
            <Typography component="span" gutterBottom={true}>
              <Typography variant="body2" fontWeight={600}>
                Remove
              </Typography>
              <Typography
                variant="caption"
                color="text.light"
                sx={{ lineHeight: 0 }}
              >
                Remove Chicken
              </Typography>
            </Typography>
            <Box>
              <LoadingButton
                loading={updateResult.isLoading}
                loadingPosition="start"
                startIcon={<></>}
                variant="outlined"
                color="error"
                size="small"
                onClick={handleOpen}
              >
                Remove
              </LoadingButton>
            </Box>
          </>
        )}
      </Stack>
      <Dialog
        onSubmit={handleSubmit(onSubmit)}
        open={isOpen}
        disableEscapeKeyDown
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Remove Chicken {chicken.name}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container rowSpacing={4} columnSpacing={10}>
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
                  }) => <DatePicker onChange={onChange} value={value ?? ""} />}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit(onSubmit)()} variant="outlined">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChickenReductionSelectDialog;
