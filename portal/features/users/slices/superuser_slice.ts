import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SuperUserState {
  mode: boolean;
}

const initialState: SuperUserState = {
  mode: false,
};

export const superUserSlice = createSlice({
  name: "superuser",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = superUserSlice.actions;
export default superUserSlice.reducer;
