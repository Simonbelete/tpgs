import { baseApi } from "@/services/baseApi";
import { Response } from "@/models";
import { ChickenRanking } from "@/models";

export const chickenRecordSetApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getChickensRecordSetMerged: build.query<Response<ChickenRanking[]>, Object>({
        query: (query?: Object) => ({
          url: `/analyses/chicken-record-set`,
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
        providesTags: ["CHICKEN_RECORD_SET"],
      }),
      getChickensRecordSet: build.query<Response<ChickenRanking[]>, Object>({
        query: (query?: Object) => ({
          url: `/analyses/chicken-record-set/`,
          method: "get",
          params: query,
        })
      }),
    };
  },
  overrideExisting: false,
});

export const {
  useGetChickensRecordSetQuery,
  useLazyGetChickensRecordSetQuery,
  useGetChickensRecordSetMergedQuery,
  useLazyGetChickensRecordSetMergedQuery
} = chickenRecordSetApi;
