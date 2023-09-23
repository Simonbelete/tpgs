import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CountryState {
  search: string,
}

const initialState: CountryState = {
  search: "",
}

export const countryListSlice = createSlice({
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

export default countryListSlice.reducer;