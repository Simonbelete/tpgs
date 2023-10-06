import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, Farm } from '@/models';
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/farms";

export const farmApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getFarms: build.query<Response<Farm[]>, Object>({ query: (query?: Object) => ({ url: `${URL}/`, method: 'get', params: query }) }),
    }
  },
  overrideExisting: false,
});

export const { 
  useGetFarmsQuery,
  useLazyGetFarmsQuery,
} = farmApi;