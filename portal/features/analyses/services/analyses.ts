import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Egg, EggHistory } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/analyses";

export const analyseApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getEggProduction: build.query<Response<any[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/egg-production/`,
          method: "get",
          params: query,
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const { useGetEggProductionQuery, useLazyGetEggProductionQuery } =
  analyseApi;
