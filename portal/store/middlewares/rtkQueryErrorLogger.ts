import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { enqueueSnackbar } from "notistack";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {

    if (isRejectedWithValue(action)) {
      console.log('Middleware');
      console.log(action);
      if(action.payload.status == 500) {
        enqueueSnackbar("aaa");
      }
    }

    return next(action)
}