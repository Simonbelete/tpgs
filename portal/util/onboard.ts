import { Config, DriveStep, State } from "driver.js";
import Cookies from "universal-cookie";
import { OnBoarding } from "@/models";
import { store } from "@/store";
import { onCloseTour, onDoneTour } from "@/features/onboarding";

const cookies = new Cookies(null);

export const onBoardConfig: Config = {
  showButtons: ["next", "previous", "close"],
  // showProgress: true,
  // allowClose: false,
  onDestroyed: (
    element?: Element,
    // @ts-ignore
    step: DriveStep,
    options: { config: Config; state: State }
  ) => {
    let indx = 0;
    if (step.popover?.progressText !== undefined)
      indx = Number(step.popover.progressText[0]);
    // @ts-ignore
    store.dispatch(onDoneTour(null));
  },
  onCloseClick: (
    element?: Element,
    // @ts-ignore
    step: DriveStep,
    options: { config: Config; state: State }
  ) => {
    let indx = 0;
    if (step.popover?.progressText !== undefined)
      indx = Number(step.popover.progressText[0]);
    store.dispatch(onCloseTour(indx));
  },
};
