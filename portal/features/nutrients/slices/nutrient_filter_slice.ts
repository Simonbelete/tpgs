import { NutrientGroup } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NutrientFilterState {
  nutrient_groups: NutrientGroup[]
}

const initialState: NutrientFilterState = {
  nutrient_groups: []
}

export const nutrientFilter = createSlice({
  name: "Nutrient Slice",
  initialState,
  reducers: {
    setNutrientGroups: (state, action: PayloadAction<NutrientGroup[]>) => {
      state.nutrient_groups = action.payload;
    },
    removeNutrientGroupById: (state, action: PayloadAction<number>) => {
      state.nutrient_groups = state.nutrient_groups.filter((e) => e.id != action.payload)
    }
  }
});

export const { setNutrientGroups, removeNutrientGroupById } = nutrientFilter.actions;
export default nutrientFilter.reducer;