import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NutrientGroupState {
  search: string,
}

const initialState: NutrientGroupState = {
  search: ""
}

export const nutrientGroupFilter = createSlice({
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

export const { setSearch, clearAll } = nutrientGroupFilter.actions;
export default nutrientGroupFilter.reducer;