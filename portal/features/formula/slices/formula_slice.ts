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
      action: PayloadAction<(FormulaIngredient & { isNew?: boolean })[]>
    ) => {
      state.ingredients = action.payload;
    },
    removeIngredientById: (state, action: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter((e) => e.id != action.payload);
    },
    updateIngredient: (state, action: PayloadAction<FormulaIngredient & { isNew?: boolean }>) => {
      const index = state.ingredients.findIndex((e) => e.id == action.payload.id)
      if(index != -1) state.ingredients[index] = action.payload;
    },
    clearAll: (state) => {
      state.ingredients = [];
      state.requirements = [];
    }
  },
});

export const { setRequirements, setIngredient, clearAll, removeIngredientById, updateIngredient } = formulaSlice.actions;
export default formulaSlice.reducer;
