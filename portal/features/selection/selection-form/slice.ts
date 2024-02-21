import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Hatchery, Stage } from "@/models";

export interface SelectionState extends Partial<Hatchery> {}

const initialState: SelectionState = {};

export const selectionSlice = createSlice({
  name: "Selection",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<Stage>) => {
      state.s;
    },
  },
});
