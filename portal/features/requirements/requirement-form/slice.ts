import { RequirementNutrient, Requirement } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RequirementFormState extends Partial<Requirement> {
  nutrients: (RequirementNutrient & { isNew?: boolean })[];
}

const initialState: RequirementFormState = {
  nutrients: [],
};

export const requirementFormSlice = createSlice({
  name: "Requirement Form",
  initialState,
  reducers: {
    setNutrients: (
      state,
      action: PayloadAction<
        (RequirementNutrient & Partial<{ isNew?: boolean }>)[]
      >
    ) => {
      state.nutrients = action.payload;
    },
    updateNutrient: (
      state,
      action: PayloadAction<RequirementNutrient & { isNew?: boolean }>
    ) => {
      const index = state.nutrients.findIndex((e) => e.id == action.payload.id);
      if (index != -1) state.nutrients[index] = action.payload;
    },
    removeNutrientById: (state, action: PayloadAction<number>) => {
      state.nutrients = state.nutrients.filter((e) => e.id != action.payload);
    },
    clearAll: (state) => {
      state = initialState;
    },
  },
});

export const { setNutrients, removeNutrientById, updateNutrient, clearAll } =
  requirementFormSlice.actions;
export default requirementFormSlice.reducer;
