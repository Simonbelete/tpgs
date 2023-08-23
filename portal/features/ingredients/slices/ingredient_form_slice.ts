import { Ingredient, IngredientNutrient } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IngredientFormState {
  nutrients: (IngredientNutrient & { isNew?: boolean })[];
}

const initialState: IngredientFormState = {
  nutrients: [],
};

export const ingredientFormSlice = createSlice({
  name: "Ingredient",
  initialState,
  reducers: {
    setNutrients: (
      state,
      action: PayloadAction<(IngredientNutrient & { isNew?: boolean })[]>
    ) => {
      state.nutrients = action.payload;
    },
    updateNutrient: (state, action: PayloadAction<IngredientNutrient & { isNew?: boolean }>) => {
      const index = state.nutrients.findIndex((e) => e.id == action.payload.id)
      if(index != -1) state.nutrients[index] = action.payload;
    },
    removeNutrientById: (state, action: PayloadAction<number>) => {
      state.nutrients = state.nutrients.filter((e) => e.id != action.payload)
    },
  },
});

export const { setNutrients, removeNutrientById, updateNutrient } = ingredientFormSlice.actions;
export default ingredientFormSlice.reducer;
