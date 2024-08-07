import { baseApi } from "@/services/baseApi";
import { Response } from "@/models";
import { ChickenRanking } from "@/models";

export const URL = "/stages";

export const selectionApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getChickensRanking: build.query<Response<ChickenRanking[]>, Object>({
        query: (query?: Object) => ({
          url: `/analyses/chicken-ranking`,
          method: "get",
          params: query,
        }),
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        merge: (currentCache, newItems) => {
          currentCache.results.push(...newItems.results);
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
      }),
    };
  },
  overrideExisting: false,
});

export const { useGetChickensRankingQuery, useLazyGetChickensRankingQuery } =
  selectionApi;
