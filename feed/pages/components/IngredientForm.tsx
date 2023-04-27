import React, { useState } from "react";
import { InputLabel, FormControl, Input, TextField } from "@mui/material";

const IngredientForm = () => {
  return (
    <FormControl>
      <TextField id="filled-basic" label="Filled" variant="filled" />
    </FormControl>
  );
};

export default IngredientForm;
