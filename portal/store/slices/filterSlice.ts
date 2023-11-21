import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Router from "next/router";
import _ from "lodash";

export interface FilterState {
  search: string;
  filters: any;
  is_active: boolean;
}

const initialState: FilterState = {
  search: "",
  /**
   * {state: false, chicken: []}
   */
  filters: {},
  is_active: true,
};

export const filterSlice = createSlice({
  name: "Global Filter",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<FilterState>) => {
      state.search = action.payload.search;
      state.is_active = action.payload.is_active;
      state.filters = action.payload.filters;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.is_active = action.payload;
    },
    pushFilter: (
      state,
      action: PayloadAction<{ key: string; value: string | number }>
    ) => {
      // Append to filter by key eg for __in keys
      state.filters[action.payload.key] = action.payload.value;
    },
    popFilter: (
      state,
      action: PayloadAction<{ key: string; value: string | number }>
    ) => {
      // Append to filter by key eg for __in keys
      state.filters[action.payload.key] = state.filters[
        action.payload.key
      ].filter((e: any) => !_.isEqual(e, action.payload.value));
    },
    setFilter: (state, action: PayloadAction<string>) => {},
    reset: (state) => {
      state.search = "";
      state.filters = {};
      state.is_active = true;
    },
  },
});

export default filterSlice.reducer;
