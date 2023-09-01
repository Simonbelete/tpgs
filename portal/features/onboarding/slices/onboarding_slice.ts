import { OnBoarding } from "@/models";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { ONBOARDING_KEY, START_TEMPLATE } from '../constants'; 

const cookies = new Cookies();

export interface NutrientFilterState extends OnBoarding {
  isFirstTime: boolean;
}

const initialState: NutrientFilterState = {
  ...cookies.get<OnBoarding>(ONBOARDING_KEY),
  isFirstTime: cookies.get<OnBoarding>(ONBOARDING_KEY) == undefined
}

export const onboardingSlice = createSlice({
  name: "On Boarding",
  initialState,
  reducers: {
    updateOnboarding: (state, action: PayloadAction<NutrientFilterState>) => {
      state.show = action.payload.show
      state.template = action.payload.template
      state.step = action.payload.step
      state.isFirstTime = action.payload.isFirstTime
      cookies.set(ONBOARDING_KEY, {...state});
    },
    startFirstTimeOnboarding: (state) => {
      state.isFirstTime = true,
      state.show = true;
      state.template = START_TEMPLATE
      state.step = 0
      cookies.set(ONBOARDING_KEY, {...state});
    },
    isFirstTime: (state) => {
      state.isFirstTime = cookies.get<OnBoarding>(ONBOARDING_KEY) == undefined;
    },
    onDoneTour: (state) => {
      state.show = false
      cookies.set(ONBOARDING_KEY, {...state});
    },
    onCloseTour: (state) => {
      state.show = false
      cookies.set(ONBOARDING_KEY, {...state});
    },
    destory: (state) => {
      cookies.remove(ONBOARDING_KEY);
      state.isFirstTime = false
      state.show = false
      state.step = 0
    } 
  }
});

export const { isFirstTime, onDoneTour, onCloseTour, updateOnboarding, destory, startFirstTimeOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;