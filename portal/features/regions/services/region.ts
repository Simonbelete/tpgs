import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, Breed, Region } from '@/models';

const URL = "/regions";

export const regionApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getRegions: build.query<Response<Region>, Object>({ query: (query?: Object) => ({ url: `${URL}/`, method: 'get', params: query }) }),
    }
  },
  overrideExisting: false,
});

export const { 
  useGetRegionsQuery,
} = regionApi;