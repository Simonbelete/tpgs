import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    backgroundColor: "#F5F6F8",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 14,
    width: "100%",
    padding: "6px 12px",
    // transition: theme.transitions.create([
    //   "border-color",
    //   "background-color",
    //   "box-shadow",
    // ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Inter", "sans-serif"].join(","),
    "&:focus": {
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: alpha(theme.palette.secondary.dark, 0.3),
    },
  },
}));

const SearchInput = ({
  label,
  error,
  helperText,
  prefix,
  ...props
}: InputBaseProps & any) => {
  return (
    <FormControl variant="standard" fullWidth error={error}>
      <BootstrapInput
        {...props}
        defaultValue=""
        id="bootstrap-input"
        placeholder={label}
        endAdornment={<InputAdornment position="end">{prefix}</InputAdornment>}
        size="small"
      />
    </FormControl>
  );
};

export default SearchInput;
