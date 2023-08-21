import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import SearchIcon from '@mui/icons-material/Search';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    position: "relative",
    backgroundColor: "white",
    border: "1px solid",
    borderLeft: 0,
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 14,
    width: "100%",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingLeft: "4px",
    paddingRight: "12px",
    fontFamily: ["Inter", "sans-serif"].join(","),
    // "&:focus": {
    //   borderColor: alpha(theme.palette.secondary.dark, 0.3),
    // },
  },
  "& .MuiInputAdornment-positionStart" : {
    borderRadius: 4,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    position: "relative",
    backgroundColor: "white",
    border: "1px solid",
    borderRight: 0,
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 14,
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "10px",
    paddingRight: "2px",
    fontFamily: ["Inter", "sans-serif"].join(","),
    margin: 0,
    height: 'auto',
    maxHeight: 'auto'
  }
}));

const SearchInputIcon = ({
  label,
  error,
  helperText,
  prefix,
  ...props
}: InputBaseProps & any) => {
  return (
    <FormControl variant="standard" fullWidth error={error}>
      <BootstrapInput
        id="bootstrap-input"
        placeholder={label}
        // endAdornment={<InputAdornment position="end">{prefix}</InputAdornment>}
        startAdornment={<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>}
        size="small"
        {...props}
      />
    </FormControl>
  );
};

export default SearchInputIcon;
