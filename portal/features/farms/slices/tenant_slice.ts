import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const COOKIE_KEY = "REQUEST_ID";

export interface TenantState {
  name: string;
}

const initialState: TenantState = {
  name: cookies.get(COOKIE_KEY) ?? "public",
};

export const tenantSlice = createSlice({
  name: "Tenant",
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<string>) => {
      cookies.set(COOKIE_KEY, action.payload, { path: "/" });
      state.name = action.payload;
    },
  },
});

export const { setTenant } = tenantSlice.actions;

export default tenantSlice.reducer;
