import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PurposeState {
  search: string,
  is_active: boolean 
}

const initialState: PurposeState = {
  search: "",
  is_active: true
}

export const purposeListSlice = createSlice({
  name: "Purpose List",
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

export default purposeListSlice.reducer;