import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Stage, StageHistory } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/stages";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;

export const stageApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      listChickens: build.query<string[], number>({
        query: (query?: Object) => ({
          url: `/`,
          method: "get",
          params: query,
        }),
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        merge: (currentCache, newItems) => {
          currentCache.push(...newItems);
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
      }),
    };
  },
  overrideExisting: false,
});

export const {} = stageApi;
