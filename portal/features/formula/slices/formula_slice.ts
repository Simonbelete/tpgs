import { Ingredient, Nutrient } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormulaState {
  requirements: (Nutrient & { isNew: boolean })[];
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
    setRequirements: (
      state,
      action: PayloadAction<(Nutrient & { isNew: boolean })[]>
    ) => {
      state.requirements = action.payload;
    },
  },
});

export const { setRequirements } = formulaSlice.actions;
export default formulaSlice.reducer;
