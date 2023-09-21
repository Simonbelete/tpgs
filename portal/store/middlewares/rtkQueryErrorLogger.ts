import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { enqueueSnackbar } from "notistack";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {

    if (isRejectedWithValue(action)) {
      if(action.payload.status == 500) {
        enqueueSnackbar("aaa");
      }
      enqueueSnackbar("Please check your network and try again", {variant: "error"})
    }

    return next(action)
}