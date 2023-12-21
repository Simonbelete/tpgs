import { baseApi } from "@/services/baseApi";
import { Response } from "@/models";

export const URL = "/analyses";

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
      getHdep: build.query<Response<any[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/hdep/`,
          method: "get",
          params: query,
        }),
      }),
      getEggMass: build.query<Response<any[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/egg-mass/`,
          method: "get",
          params: query,
        }),
      }),
      getPedigree: build.query<Response<any[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/pedigree/`,
          method: "get",
          params: query,
        }),
      }),
      getGenderDistribution: build.query<Response<any>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/gender-distribution/`,
          method: "get",
          params: query,
        }),
      }),
      getBreedDistribution: build.query<Response<any>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/breed-distribution/`,
          method: "get",
          params: query,
        }),
      }),
      getChickenAgeGroupDistribution: build.query<Response<any>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/chicken-age-group/`,
          method: "get",
          params: query,
        }),
      }),
      getGrowthPreformance: build.query<Response<any>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/growth-performance/`,
          method: "get",
          params: query,
        }),
      }),
      getFeedByWeight: build.query<Response<any>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/feed-by-weight/`,
          method: "get",
          params: query,
        }),
      }),
      getEggsAnalyse: build.query<Response<any>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/eggs/`,
          method: "get",
          params: query,
        }),
      }),
      getEggGradingAnalyse: build.query<Response<any>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/egg-grading/`,
          method: "get",
          params: query,
        }),
      }),
      getWeightAnalyse: build.query<Response<any>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/weights/`,
          method: "get",
          params: query,
        }),
      }),
      getFeedAnalyse: build.query<Response<any>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/feeds/`,
          method: "get",
          params: query,
        }),
      }),
      getCountAnalyse: build.query<Response<any>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/count/`,
          method: "get",
          params: query,
        }),
      }),
      getMortality: build.query<Response<any[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/mortality/`,
          method: "get",
          params: query,
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const {
  useGetEggProductionQuery,
  useLazyGetEggProductionQuery,
  useGetHdepQuery,
  useLazyGetHdepQuery,
  useGetEggMassQuery,
  useLazyGetEggMassQuery,
  useGetGenderDistributionQuery,
  useLazyGetGenderDistributionQuery,
  useGetBreedDistributionQuery,
  useLazyGetBreedDistributionQuery,
  useGetChickenAgeGroupDistributionQuery,
  useLazyGetChickenAgeGroupDistributionQuery,
  useGetGrowthPreformanceQuery,
  useLazyGetGrowthPreformanceQuery,
  useGetFeedByWeightQuery,
  useLazyGetFeedByWeightQuery,
  useGetEggsAnalyseQuery,
  useLazyGetEggsAnalyseQuery,
  useGetEggGradingAnalyseQuery,
  useLazyGetEggGradingAnalyseQuery,
  useLazyGetFeedAnalyseQuery,
  useLazyGetWeightAnalyseQuery,
  useGetCountAnalyseQuery,
  useGetPedigreeQuery,
  useLazyGetPedigreeQuery,
  useLazyGetMortalityQuery,
} = analyseApi;
