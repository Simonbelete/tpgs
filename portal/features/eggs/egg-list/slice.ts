import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Router from 'next/router';

export interface EggState {
  search: string,
  is_active: boolean 
}

const initialState: EggState = {
  search: "",
  is_active: true
}

export const eggListSlice = createSlice({
  name: "Breed List",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.is_active = action.payload
    },
    reset: (state) => {
      state.search = ""
      state.is_active = true
    }
  }
});

export default eggListSlice.reducer;