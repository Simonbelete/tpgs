import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HouseState {
  search: string,
}

const initialState: HouseState = {
  search: "",
}

export const houseFilter = createSlice({
  name: "House Filter",
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

export const { setSearch, clearAll } = houseFilter.actions;
export default houseFilter.reducer;