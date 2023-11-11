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
import { useRouter } from "next/router";
import { FarmDropdown } from "@/features/farms";
import { useCreateInvitationMutation } from "../services";
import { useCRUD } from "@/hooks";

type Inputs = Partial<Invitation>;

const schema = yup.object({
  email: yup.string().required(),
  farms: yup.array().of(yup.object()).required(),
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

  const { handleSubmit, control, setError } = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const [createInvitation, createResult] = useCreateInvitationMutation();

  const useCRUDHook = useCRUD({
    results: [createResult],
    setError: setError,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    data.farms = data.farms?.map((e: any) => {
      if (e !== undefined) return e.id;
    });
    await createInvitation(data);
    onClose();
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
                  id="invitation-form-modal-email-input"
                  error={!!error?.message}
                  helperText={error?.message}
                  onChange={onChange}
                  fullWidth
                  size="small"
                  value={value ?? ""}
                  label={"Email Address"}
                  placeholder={"Email Address"}
                />
              )}
            />
          </Grid>
          {/* Farms */}
          <Grid item xs={12}>
            <Controller
              name={"farms"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FarmDropdown
                  multiple
                  onChange={(_, data) => onChange(data)}
                  value={value ?? []}
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
