import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { tenantReducer } from "@/features/farms";
import { formulaReducer } from "@/features/formula";
import { ingredientFormReducer, ingredientFilterReducer } from "@/features/ingredients";
import { nutrientFilterReducer } from "@/features/nutrients"; 
import { onBoardingReducer } from "@/features/onboarding";
import { SettingReducer } from "@/features/settings";
import { NutrientGroupFilterReducer } from '@/features/nutrient-group';
import { invitationFilterReducer } from "@/features/invitations";
import { directoryBuilderReducer } from '@/features/directory';

import { baseApi } from '@/services/baseApi';
import { houseApi } from '@/features/houses/services';

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    formula: formulaReducer,
    ingredientForm: ingredientFormReducer,
    ingredientFilter: ingredientFilterReducer,
    nutrientFilter: nutrientFilterReducer,
    onBoarding: onBoardingReducer,
    setting: SettingReducer,
    nutrientGroupFilter: NutrientGroupFilterReducer,
    invitationFilter: invitationFilterReducer,
    directoryBuilder: directoryBuilderReducer,

    // Apis
    [houseApi.reducerPath]: houseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
});

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
