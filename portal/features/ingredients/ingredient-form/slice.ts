import { Ingredient, IngredientNutrient } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IngredientFormState extends Partial<Ingredient> {
  nutrients: (IngredientNutrient & { isNew?: boolean })[];
}

const initialState: IngredientFormState = {
  name: "",
  code: "",
  price: 0,
  nutrients: [],
};

export const ingredientFormSlice = createSlice({
  name: "Ingredient Form",
  initialState,
  reducers: {
    setNutrients: (
      state,
      action: PayloadAction<
        (IngredientNutrient & Partial<{ isNew?: boolean }>)[]
      >
    ) => {
      state.nutrients = action.payload;
    },
    updateNutrient: (
      state,
      action: PayloadAction<IngredientNutrient & { isNew?: boolean }>
    ) => {
      const index = state.nutrients.findIndex((e) => e.id == action.payload.id);
      if (index != -1) state.nutrients[index] = action.payload;
    },
    removeNutrientById: (state, action: PayloadAction<number>) => {
      state.nutrients = state.nutrients.filter((e) => e.id != action.payload);
    },
    clearAll: (state) => {
      state = initialState;
    },
  },
});

export const { setNutrients, removeNutrientById, updateNutrient, clearAll } =
  ingredientFormSlice.actions;
export default ingredientFormSlice.reducer;
