import React, { useState } from "react";
import useAutocomplete from "@mui/material/useAutocomplete";
import { styled } from "@mui/system";
import { Grid, Box } from "@mui/material";

const Label = styled("label")({
  display: "block",
});

const Input = styled("input")(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  color: theme.palette.mode === "light" ? "#000" : "#fff",
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

export const ChickenSelect = () => {
  const [options, setOptions] = useState([
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ]);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,

    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "chicken-select",
    options: options,
    multiple: true,
    getOptionLabel: (option) => option.title,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>useAutocomplete</Label>
        <Input {...getInputProps()} />
      </div>

      {
        <Listbox {...getListboxProps()}>
          {options.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.title}</li>
          ))}
        </Listbox>
      }

      {console.log(value)}

      {/* <Grid container direction={"row"}>
        <Grid item xs={6}>
          <Listbox {...getListboxProps()}>
            {options.map((option, index) => (
              <li key={index} {...getOptionProps({ option, index })}>
                {option.title}
              </li>
            ))}
          </Listbox>
        </Grid>
        <Grid item xs={6}>
          {console.log(value)}
          <Box>
            {value.map((option, index: number) => (
              <p key={index}>{option}</p>
            ))}
          </Box>
        </Grid>
      </Grid> */}
    </div>
  );
};
