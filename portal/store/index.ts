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
import { houseListReducer } from "@/features/houses"; 
import { breedListReducer } from "@/features/breeds";
import { purposeListReducer } from '@/features/purposes';
import { unitListReducer } from '@/features/units';
import { eggListReducer } from "@/features/eggs";
import { countryListReducer } from '@/features/countries';
import { cityListReducer } from '@/features/cities';
import { regionListReducer } from "@/features/regions";

import { baseApi } from '@/services/baseApi';
import { houseApi } from '@/features/houses/services';
import { breedApi } from '@/features/breeds/services';
import { purposeApi } from '@/features/purposes/services';
import { unitApi } from '@/features/units/services';
import { eggApi } from '@/features/eggs/services';
import { countryApi } from "@/features/countries/services";
import { cityApi } from "@/features/cities/services";
import { regionApi } from "@/features/regions/services";

import { rtkQueryErrorLogger } from './middlewares/rtkQueryErrorLogger';

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
    houseList: houseListReducer,
    breedList: breedListReducer,
    purposeList: purposeListReducer,
    unitList: unitListReducer,
    eggList: eggListReducer,
    countryList: countryListReducer,
    cityList: cityListReducer,
    regionList: regionListReducer,

    // // Apis
    [houseApi.reducerPath]: houseApi.reducer,
    [breedApi.reducerPath]: breedApi.reducer,
    [purposeApi.reducerPath]: purposeApi.reducer,
    [unitApi.reducerPath]: unitApi.reducer,
    [eggApi.reducerPath]: eggApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [regionApi.reducerPath]: regionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware, rtkQueryErrorLogger),
});

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
