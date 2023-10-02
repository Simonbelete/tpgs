import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Router from 'next/router';

export interface FilterState {
  search: string,
  filters: any,
  is_active: boolean 
}

const initialState: FilterState = {
  search: "",
  filters: {},
  is_active: true,
}

export const filterSlice = createSlice({
  name: "Global Filter",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<FilterState>) => {
      console.log('Updatttings')
      console.log(action.payload);
      state.search = action.payload.search;
      state.is_active = action.payload.is_active;
      state.filters = action.payload.filters;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.is_active = action.payload
    },
    addFilter: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    reset: (state) => {
      state.search = ""
      state.filters = {}
      state.is_active = true
    }
  }
});

export default filterSlice.reducer;