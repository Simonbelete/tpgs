import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HouseState {
  search: string,
  isActive: boolean 
}

const initialState: HouseState = {
  search: "",
  isActive: true
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
      state.isActive = action.payload
    },
    reset: (state) => {
      state.search = ""
      state.isActive = true
    }
  }
});

export default houseListSlice.reducer;