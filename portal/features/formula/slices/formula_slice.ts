import {
  FormulaIngredient,
  FormulaRequirement,
  Ingredient,
  Nutrient,
} from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormulaState {
  requirements: (FormulaRequirement & Partial<{ isNew: boolean }>)[];
  ingredients: (FormulaIngredient & Partial<{ isNew: boolean }>)[];
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
      action: PayloadAction<(FormulaRequirement & { isNew: boolean })[]>
    ) => {
      state.requirements = action.payload;
    },
    setIngredient: (
      state,
      action: PayloadAction<(FormulaIngredient & { isNew: boolean })[]>
    ) => {
      state.ingredients = action.payload;
    },
  },
});

export const { setRequirements, setIngredient } = formulaSlice.actions;
export default formulaSlice.reducer;
