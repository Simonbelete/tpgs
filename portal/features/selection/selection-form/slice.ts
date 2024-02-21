import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Hatchery, Stage } from "@/models";

export interface SelectionState extends Partial<Hatchery> {}

const initialState: SelectionState = {};

export const selectionSlice = createSlice({
  name: "Selection",
  initialState,
  reducers: {
    setStage: (state, action: PayloadAction<Stage>) => {
      state.stage = action.payload;
    },
  },
});

export const { setStage } = selectionSlice.actions;

export const selectionReducer = selectionSlice.reducer;
