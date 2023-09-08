import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InvitationState {
  search: string,
  invitationState: Object[]
}

const initialState: InvitationState = {
  search: "",
  invitationState: []
}

export const invitationFilter = createSlice({
  name: "Invitation Filter",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setInvitationState: (state, action: PayloadAction<Object[]>) => {
      state.invitationState = action.payload;
    },
    removeInvitationState: (state, action: PayloadAction<string>) => {
      console.log('00')
      console.log(action.payload);
      state.invitationState = state.invitationState.filter((e: any) => e.name !== action.payload)
    },
    clearAll: (state) => {
      state.search = ""
    }
  }
});

export const { setSearch, setInvitationState, removeInvitationState, clearAll } = invitationFilter.actions;
export default invitationFilter.reducer;