import { Farm } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const COOKIE_KEY = "REQUEST_ID";

export interface TenantState {
  id: number | null;
  name: string | null;
}

const initialState: TenantState = {
  id: cookies.get(COOKIE_KEY) ? cookies.get(COOKIE_KEY)["id"] : "public",
  name: cookies.get(COOKIE_KEY) ? cookies.get(COOKIE_KEY)["name"] : "public",
};

export const tenantSlice = createSlice({
  name: "Tenant",
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<Partial<Farm>>) => {
      cookies.set(
        COOKIE_KEY,
        { id: action.payload.id, name: action.payload.name },
        { path: "/" }
      );
      state.id = action.payload.id || null;
      state.name = action.payload.name || null;
    },
  },
});

export const { setTenant } = tenantSlice.actions;

export default tenantSlice.reducer;
