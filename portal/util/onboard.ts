import { Config, DriveStep, State } from "driver.js"
import Cookies from 'universal-cookie';
import { ONBOARDING_KEY } from '@/providers/OnBoarding';
import { OnBoarding } from "@/models";

const cookies = new Cookies(null);

export const onBoardConfig: Config = {
  // showProgress: true,
  allowClose: false,
  onDestroyed: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => {
    // Done session
    console.log(step);
    const updatedCookie = cookies.get<OnBoarding>(ONBOARDING_KEY);
    updatedCookie.show = false;
    cookies.set(ONBOARDING_KEY, updatedCookie);
  },
  onCloseClick: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => {
    const updatedCookie = cookies.get<OnBoarding>(ONBOARDING_KEY);
    updatedCookie.show = false;
    // updatedCookie.step = step;
    cookies.set(ONBOARDING_KEY, updatedCookie);
  }
}
