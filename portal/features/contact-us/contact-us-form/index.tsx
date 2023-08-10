import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Contact } from "@/models";
import { object, string } from "yup";
import { LabeledInput } from "@/components/inputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import contact_service from "../services/contact_service";

type Inputs = Contact;

const schema = object({
  name: string().required(),
  email: string().email().required(),
  message: string().required(),
}).required();

const ContactUsForm = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await contact_service.create(data);
      if (response.status) {
        enqueueSnackbar("Message Sent", { variant: "success" });
      } else {
        enqueueSnackbar(
          "Failed to send message, please check your connection and try again",
          { variant: "error" }
        );
      }
    } catch (ex) {
      enqueueSnackbar(
        "Failed to send message, please check your connection and try again",
        { variant: "error" }
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography
          variant="h3"
          color={"primary.main"}
          align="center"
          sx={{ fontWeight: 700 }}
          mb={3}
        >
          Contact Us
        </Typography>
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
            {/* Email */}
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
                    type="email"
                  />
                )}
              />
            </Grid>
            {/* Message */}
            <Grid item xs={12}>
              <Controller
                name={"message"}
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
                    label={"Message"}
                    placeholder={"Message"}
                    multiline
                    rows={4}
                  />
                )}
              />
            </Grid>
            {/* <TextField
              fullWidth
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              margin="normal"
              required
              multiline
              rows={4}
            /> */}
            <Grid item xs={12}>
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default ContactUsForm;
