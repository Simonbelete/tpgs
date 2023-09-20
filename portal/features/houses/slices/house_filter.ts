import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HouseState {
  search: string,
  active: boolean 
}

const initialState: HouseState = {
  search: "",
  active: true
}

export const houseFilter = createSlice({
  name: "House Filter",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload
    },
    clearAll: (state) => {
      state.search = ""
      state.active = true
    }
  }
});

export const { setSearch, setActive ,clearAll } = houseFilter.actions;
export default houseFilter.reducer;