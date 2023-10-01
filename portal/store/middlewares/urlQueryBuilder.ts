import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { eggListSlice } from "@/features/eggs";
import Router from 'next/router';

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: isAnyOf(
    ...Object.values(eggListSlice.actions)
  ),
  effect: async (action, listenerApi) => {
    Router.push({
      pathname: Router.pathname,
      query: {a: 'b'}
    }, undefined, {shallow: true});
  }
})

export const urlQueryBuilder = listenerMiddleware;