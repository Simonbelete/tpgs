import { Ingredient, Nutrient } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormulaState {
  requirements: Nutrient[];
  ingredients: Ingredient[];
}

const initialState: FormulaState = {
  requirements: [],
  ingredients: [],
};

export const formulaSlice = createSlice({
  name: "Formula",
  initialState,
  reducers: {
    setRequirements: (state, action: PayloadAction<Nutrient[]>) => {},
  },
});

export const { setRequirements } = formulaSlice.actions;
export default formulaSlice.reducer;
