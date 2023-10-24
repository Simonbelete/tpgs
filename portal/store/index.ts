import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tenantReducer } from "@/features/farms";
import { formulaReducer } from "@/features/formula";
import { ingredientFormReducer } from "@/features/ingredients";
import { onBoardingReducer } from "@/features/onboarding";
import { SettingReducer } from "@/features/settings";
import { invitationFilterReducer } from "@/features/invitations";
import { directoryBuilderReducer } from "@/features/directory";
import { countryListReducer } from "@/features/countries";
import { cityListReducer } from "@/features/cities";
import { regionListReducer } from "@/features/regions";
import { chickenListReducer } from "@/features/chickens";
import { filterReducer } from "./slices";
import { requirementFormReducer } from "@/features/requirements";

import { baseApi } from "@/services/baseApi";
import { houseApi } from "@/features/houses/services";
import { breedApi } from "@/features/breeds/services";
import { purposeApi } from "@/features/purposes/services";
import { unitApi } from "@/features/units/services";
import { eggApi } from "@/features/eggs/services";
import { countryApi } from "@/features/countries/services";
import { cityApi } from "@/features/cities/services";
import { regionApi } from "@/features/regions/services";
import { chickenApi } from "@/features/chickens/services";
import { flockApi } from "@/features/flocks/services";
import { feedApi } from "@/features/feeds/services";
import { weightApi } from "@/features/weights/services";
import { nutrientGroupApi } from "@/features/nutrient-group/services";
import { formulaApi } from "@/features/formula/services";
import { reductionReasonApi } from "@/features/reduction-reason/services";
import { notificationApi } from "@/features/notification/services";
import { requirementApi } from "@/features/requirements/services";

import { rtkQueryErrorLogger } from "./middlewares/rtkQueryErrorLogger";
import { urlQueryBuilder } from "./middlewares/urlQueryBuilder";

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    filter: filterReducer,
    ingredientForm: ingredientFormReducer,
    onBoarding: onBoardingReducer,
    setting: SettingReducer,
    invitationFilter: invitationFilterReducer,
    directoryBuilder: directoryBuilderReducer,
    countryList: countryListReducer,
    cityList: cityListReducer,
    regionList: regionListReducer,
    chickenList: chickenListReducer,
    formula: formulaReducer,
    requirementForm: requirementFormReducer,

    // // Apis
    [houseApi.reducerPath]: houseApi.reducer,
    [breedApi.reducerPath]: breedApi.reducer,
    [purposeApi.reducerPath]: purposeApi.reducer,
    [unitApi.reducerPath]: unitApi.reducer,
    [eggApi.reducerPath]: eggApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [regionApi.reducerPath]: regionApi.reducer,
    [chickenApi.reducerPath]: chickenApi.reducer,
    [flockApi.reducerPath]: flockApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [weightApi.reducerPath]: weightApi.reducer,
    [nutrientGroupApi.reducerPath]: nutrientGroupApi.reducer,
    [formulaApi.reducerPath]: formulaApi.reducer,
    [reductionReasonApi.reducerPath]: reductionReasonApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [requirementApi.reducerPath]: requirementApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      rtkQueryErrorLogger,
      urlQueryBuilder.middleware
    ),
});

// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
