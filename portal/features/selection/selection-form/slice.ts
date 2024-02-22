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
    setSelectedFrom: (state, action: PayloadAction<Hatchery[]>) => {
      state.selected_from = action.payload;
    },
    addSelectedChicken: (state, action: PayloadAction<number>) => {
      state.selected_chickens = [
        ...((state?.selected_chickens || []) as number[]),
        action.payload,
      ];
    },
    removeSelectedChicken: (state, action: PayloadAction<number>) => {
      state.selected_chickens = (state?.selected_chickens || []).filter(
        (e) => e != action.payload
      ) as number[];
    },
  },
});

export const {
  setStage,
  setSelectedFrom,
  addSelectedChicken,
  removeSelectedChicken,
} = selectionSlice.actions;

export const selectionReducer = selectionSlice.reducer;
