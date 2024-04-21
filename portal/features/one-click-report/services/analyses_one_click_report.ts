import { baseApi } from "@/services/baseApi";
import { Response } from "@/models";

export const URL = "/analyses";

export const analyseOneClickReportApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getChickensSummary: build.query<Response<any[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/chickens-recordset-quality/`,
          method: "get",
          params: query,
        }),
      }),
      getChickensRecordsetQuality: build.query<Response<any[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/chickens-recordset-quality/`,
          method: "get",
          params: query,
        }),
      }),
      getMortalityRate: build.query<Response<any[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/mortality-rate/`,
          method: "get",
          params: query,
        }),
      }),
    };
  },
});

export const {
  useGetChickensSummaryQuery,
  useGetMortalityRateQuery,
  useLazyGetChickensRecordsetQualityQuery,
  useLazyGetChickensSummaryQuery,
  useLazyGetMortalityRateQuery,
  useGetChickensRecordsetQualityQuery,
} = analyseOneClickReportApi;
