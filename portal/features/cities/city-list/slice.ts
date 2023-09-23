import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CityState {
  search: string,
}

const initialState: CityState = {
  search: "",
}

export const cityListSlice = createSlice({
  name: "Country List",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    reset: (state) => {
      state.search = ""
    }
  }
});

export default cityListSlice.reducer;