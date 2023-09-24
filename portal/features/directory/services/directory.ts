import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, Directory } from '@/models';

const URL = "/directories";
const REFRESH_URL = `${URL}/refresh`;

export const directoryApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getDdrectories: build.query<Response<Directory[]>, Object>({ query: (query?: Object) => ({ url: `${URL}/`, method: 'get', params: query }) }),
    }
  },
  overrideExisting: false,
});

export const { 
  useGetDdrectoriesQuery,
  useLazyGetDdrectoriesQuery
} = directoryApi;