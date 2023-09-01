import { Config, DriveStep, State } from "driver.js"
import Cookies from 'universal-cookie';
import { OnBoarding } from "@/models";
import { store, } from '@/store';
import { onCloseTour, onDoneTour } from '@/features/onboarding'

const cookies = new Cookies(null);

export const onBoardConfig: Config = {
  // showProgress: true,
  allowClose: false,
  onDestroyed: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => {
    store.dispatch(onDoneTour());
  },
  onCloseClick: (element?: Element, step: DriveStep, options: { config: Config; state: State }) => {
    store.dispatch(onCloseTour());
  }
}
