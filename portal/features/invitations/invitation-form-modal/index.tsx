import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Modal, Box, Button, Grid } from "@mui/material";
import { PlainModal } from "@/components/modals";
import { LabeledInput } from "@/components/inputs";
import { Invitation } from "@/models";
import { useSnackbar } from "notistack";
import SendIcon from "@mui/icons-material/Send";
import { AsyncDropdown } from "@/components/dropdowns";
import invitation_service from "../services/invitation_service";
import { useRouter } from "next/router";

type Inputs = Partial<Invitation>;

const schema = yup
  .object({
    email: yup.string().required(),
    farms: yup.array().of(yup.number()),
  })
  .transform((currentValue: any) => {
    if (currentValue.farms.length != 0) {
      const fids = currentValue.farms.map((e: any) => e.id);
      currentValue.farms = fids;
    }
    return currentValue;
  });

const InvitationFormModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await invitation_service.create(data);
      if (response.status == 201) {
        enqueueSnackbar("Successfully send invitation", { variant: "success" });
        router.push("/invitations");
      } else {
        enqueueSnackbar(
          "Failed to send invitation, please check you inputs and try again",
          { variant: "error" }
        );
      }
    } catch (ex) {
      enqueueSnackbar(
        "Failed to send invitation, please check your network and try again!",
        { variant: "error" }
      );
    }
  };

  return (
    <PlainModal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          {/* Name */}
          <Grid item xs={12}>
            <Controller
              name={"email"}
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
                  label={"Email Address"}
                  placeholder={"Email Address"}
                />
              )}
            />
          </Grid>
          {/* Unit */}
          <Grid item xs={12}>
            <Controller
              name={"farms"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <AsyncDropdown
                  multiple
                  url="/farms/"
                  key="name"
                  onChange={(_, data) => onChange(data)}
                  value={value}
                  label="Farm"
                  error={!!error?.message}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              startIcon={<SendIcon />}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </PlainModal>
  );
};

export default InvitationFormModal;
