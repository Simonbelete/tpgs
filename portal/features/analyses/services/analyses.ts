import { baseApi } from "@/services/baseApi";
import { Response } from "@/models";

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
} = analyseApi;
