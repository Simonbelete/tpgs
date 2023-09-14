import { Directory } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DirectoryBuilderState {
  directories: Directory[]
}

const initialState: DirectoryBuilderState = {
  directories: []
}

export const nutrientFilter = createSlice({
  name: "Nutrient Slice",
  initialState,
  reducers: {
    addDirectory: (state, action: PayloadAction<Directory>) => {
      state.directories = [...state.directories, action.payload];
    },
    removeDirectoryById: (state, action: PayloadAction<string>) => {
      state.directories = state.directories.filter((e) => e.unique_id != action.payload)
    },
    clearAll: (state) => {
      state.directories = [];
   }
  }
});

export const { addDirectory, removeDirectoryById, clearAll } = nutrientFilter.actions;
export default nutrientFilter.reducer;