import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, Flock } from '@/models';
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/flocks";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const flocAccusationkApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getFlockAccusations: build.query<Response<Flock[]>, Object>({ query: (query?: Object) => ({ url: `${URL}/`, method: 'get', params: query }) }),
      getFlockAccusationHistory: build.query<Response<Flock>, {id: number, query: Object}>({ query: ({id, query}) => ({ url: `${URL}/${id}/${HISTORY_URL}`, method: 'get', params: query }) }),
      getFlockSummary: build.query<AbstractSummary, number>({ query: (id: number) => ({ url: `${URL}/${id}/${SUMMARY_URL}/`, method: 'get' }) }),
      createFlock: build.mutation<Promise<AxiosResponse<Flock>>, Partial<Flock>>({
        query: (data: Partial<Flock>) => ({ url: `${URL}/`, method: 'post', data: data }),
      }),
      updateFlock: build.mutation<Flock, Pick<Flock, 'id'> & Partial<Flock>>({
        query: ({id, ...patch}) => ({ url: `${URL}/${id}/`, method: 'patch', data: patch }),
      }),
      deleteFlock: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: 'delete' }),
      })
    }
  },
  overrideExisting: false,
});



export const { 
  useGetFlockAccusationsQuery,
  useGetFlockAccusationHistoryQuery
} = flocAccusationkApi;