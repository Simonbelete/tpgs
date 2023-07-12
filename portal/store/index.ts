import { configureStore } from "@reduxjs/toolkit";
import { tenantReducer } from "@/features/farms";

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;