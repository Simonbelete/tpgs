import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import Router from 'next/router';
import { filterSlice } from '@/store/slices';
import buildURLParams from '@/util/buildURLParams';
import { RootState } from "@/store";

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: isAnyOf(
    filterSlice.actions.setSearch,
    filterSlice.actions.setIsActive,
    filterSlice.actions.addFilter,
    filterSlice.actions.reset,
    // ...Object.values(filterSlice.actions)
  ),
  effect: async (action, listenerApi) => {
    const state: RootState = listenerApi.getState() as RootState;

    if(String(action.type).includes(filterSlice.name)) {
      Router.push({
        pathname: Router.pathname,
        query: buildURLParams({
          search: state.filter.search,
          is_active: state.filter.is_active,
          ...state.filter.filters,
        }),
      }, undefined, {shallow: true}); 
    }
  }
})

export const urlQueryBuilder = listenerMiddleware;