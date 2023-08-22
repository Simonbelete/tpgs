import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IngredientState {
  search: string,
}

const initialState: IngredientState = {
  search: ""
}

export const ingredientFilter = createSlice({
  name: "Ingredient Slice",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    clearAll: (state) => {
      state.search = ""
    }
  }
});

export const { setSearch, clearAll } = ingredientFilter.actions;
export default ingredientFilter.reducer;