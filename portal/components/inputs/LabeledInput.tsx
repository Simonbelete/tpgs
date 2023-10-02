import {
  FormControl,
  InputLabel,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import React from "react";

const LabeledInput = (props: TextFieldProps) => {
  return (
    <Stack gap={1}>
      {props.label && (
        <Typography variant="body2" fontWeight={700}>
          {props.label}
        </Typography>
      )}
      <TextField
        {...props}
        label={String(props.value).length !== 0 ? "" : props.label}
        InputLabelProps={{ shrink: false }}
      />
    </Stack>
  );
};

export default LabeledInput;
