import { Ingredient, Nutrient } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IngredientState {
  nutrients: (Nutrient & { isNew: boolean })[];
}

const initialState: IngredientState = {
  nutrients: [],
};

export const ingredientSlice = createSlice({
  name: "Ingredient",
  initialState,
  reducers: {
    setNutrients: (
      state,
      action: PayloadAction<(Nutrient & { isNew: boolean })[]>
    ) => {
      state.nutrients = action.payload;
    },
  },
});

export const { setNutrients } = ingredientSlice.actions;
export default ingredientSlice.reducer;
