import { configureStore } from "@reduxjs/toolkit";
import { tenantReducer } from "@/features/farms";
import { formulaReducer } from "@/features/formula";
import { ingredientReducer } from "@/features/ingredients";
import { nutrientFilterReducer } from "@/features/nutrients"; 

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    formula: formulaReducer,
    ingredient: ingredientReducer,
    nutrientFilter: nutrientFilterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
