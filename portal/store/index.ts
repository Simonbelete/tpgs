import { configureStore } from "@reduxjs/toolkit";
import { tenantReducer } from "@/features/farms";
import { formulaReducer } from "@/features/formula";
import { ingredientFormReducer, ingredientFilterReducer } from "@/features/ingredients";
import { nutrientFilterReducer } from "@/features/nutrients"; 
import { onBoardingReducer } from "@/features/onboarding";
import { SettingReducer } from "@/features/settings";
import { NutrientGroupFilterReducer } from '@/features/nutrient-group';
import { invitationFilterReducer } from "@/features/invitations";

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
    invitationFilter: invitationFilterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
