import { NutrientGroup } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NutrientFilterState {
  search: string,
  nutrient_groups: NutrientGroup[]
}

const initialState: NutrientFilterState = {
  search: "",
  nutrient_groups: []
}

export const nutrientFilter = createSlice({
  name: "Nutrient Slice",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setNutrientGroups: (state, action: PayloadAction<NutrientGroup[]>) => {
      state.nutrient_groups = action.payload;
    },
    removeNutrientGroupById: (state, action: PayloadAction<number>) => {
      state.nutrient_groups = state.nutrient_groups.filter((e) => e.id != action.payload)
    },
    clearAll: (state) => {
      state.search = ""
      state.nutrient_groups = []
    }
  }
});

export const { setSearch, setNutrientGroups, removeNutrientGroupById, clearAll } = nutrientFilter.actions;
export default nutrientFilter.reducer;