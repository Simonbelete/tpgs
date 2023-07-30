import { configureStore } from "@reduxjs/toolkit";
import { tenantReducer } from "@/features/farms";
import { formulaReducer } from "@/features/formula";
import { ingredientReducer } from "@/features/ingredients";

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    formula: formulaReducer,
    ingredient: ingredientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
