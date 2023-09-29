import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FlockAccusationState {
  search: string,
  is_active: boolean 
}

const initialState: FlockAccusationState = {
  search: "",
  is_active: true
}

export const flockAccusationListSlice = createSlice({
  name: "Flock Accusation List",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.is_active = action.payload
    },
    reset: (state) => {
      state.search = ""
      state.is_active = true
    }
  }
});

export default flockAccusationListSlice.reducer;