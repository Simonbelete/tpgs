import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, City } from '@/models';

const URL = "/cities";

export const cityApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getCities: build.query<Response<City>, Object>({ query: (query?: Object) => ({ url: `${URL}/`, method: 'get', params: query }) }),
    }
  },
  overrideExisting: false,
});

export const { 
  useGetCitiesQuery,
} = cityApi;