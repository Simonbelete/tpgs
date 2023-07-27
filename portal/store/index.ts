import { configureStore } from "@reduxjs/toolkit";
import { tenantReducer } from "@/features/farms";
import { formulaReducer } from "@/features/formula";

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    formula: formulaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
