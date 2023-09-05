import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { SETTING_KEY } from "../constants";
import { Setting } from '@/models';

const cookies = new Cookies();

export interface SettingState {
  superUserMode: boolean
}

const initialState: SettingState = {
  ...cookies.get<Setting>(SETTING_KEY)
}

export const settingSlice = createSlice({
  name: "Settings",
  initialState,
  reducers: {
   toggleSuperUserMode: (state) => {
    state.superUserMode = !state.superUserMode;
   }
  }
});

export const { toggleSuperUserMode } = settingSlice.actions;
export default settingSlice.reducer;