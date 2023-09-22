import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HouseState {
  search: string,
  is_active: boolean 
}

const initialState: HouseState = {
  search: "",
  is_active: true
}

export const houseListSlice = createSlice({
  name: "House List",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setIsActive: (state, action: PayloadAction<boolean>) => {
      console.log('aaaa')
      console.log(action.payload);
      state.is_active = action.payload
    },
    reset: (state) => {
      state.search = ""
      state.is_active = true
    }
  }
});

export default houseListSlice.reducer;