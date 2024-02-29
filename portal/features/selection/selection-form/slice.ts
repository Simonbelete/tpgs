import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Hatchery, Stage, ReductionReason } from "@/models";
import _ from "lodash";

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
      state.name = _.map(action.payload, (e) => `${e.name}`).join(" & ");
    },
    addSelectedChicken: (state, action: PayloadAction<number>) => {
      state.selected_chickens = [
        ...((state?.selected_chickens || []) as number[]),
        action.payload,
      ];
    },
    removeSelectedChicken: (state, action: PayloadAction<number>) => {
      // @ts-ignore
      state.selected_chickens = (state?.selected_chickens || []).filter(
        // @ts-ignore
        (e) => e != action.payload
      ) as number[];
    },
    setReductionReason: (state, action: PayloadAction<ReductionReason>) => {
      state.reduction_reason = action.payload;
    },
    setReductionDate: (state, action: PayloadAction<string>) => {
      state.reduction_date = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const {
  setStage,
  setSelectedFrom,
  addSelectedChicken,
  removeSelectedChicken,
  setReductionReason,
  setReductionDate,
  setName,
} = selectionSlice.actions;

export const selectionReducer = selectionSlice.reducer;
