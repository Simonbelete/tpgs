import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RegionState {
  search: string,
}

const initialState: RegionState = {
  search: "",
}

export const regionListSlice = createSlice({
  name: "Region List",
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

export default regionListSlice.reducer;