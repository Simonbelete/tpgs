import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, House } from '@/models';
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import { NextPageContext } from "next";

const URL = "/houses";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const houseApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getHouses: build.query<Response<House>, Object>({ query: (query?: Object) => ({ url: `${URL}/`, method: 'get', params: query }) }),
      getHouseHistory: build.query<Response<House>, {id: number, query: Object}>({ query: ({id, query}) => ({ url: `${URL}/${id}/${HISTORY_URL}`, method: 'get', params: query }) }),
      getSummary: build.query<AbstractSummary, number>({ query: (id: number) => ({ url: `${URL}/${id}/${SUMMARY_URL}/`, method: 'get' }) }),
      createHouse: build.mutation<Promise<AxiosResponse<House>>, Partial<House>>({
        query: (data: Partial<House>) => ({ url: `${URL}/`, method: 'post', data: data }),
      }),
      updateHouse: build.mutation<House, Pick<House, 'id'> & Partial<House>>({
        query: ({id, ...patch}) => ({ url: `${URL}/${id}/`, method: 'patch', data: patch }),
      }),
      deleteHouse: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: 'delete' }),
      })
    }
  },
  overrideExisting: false,
});

export const houseEndpoints = {
  getHouseByIdSSR: async (
    context: NextPageContext,
    id: number
  ): Promise<AxiosResponse<Response<House>>> =>
    clientSSR(context).get(`${URL}/${id}`),
}

export const { 
  useGetHousesQuery,
  useGetHouseHistoryQuery,
  useGetSummaryQuery, 
  useCreateHouseMutation,
  useUpdateHouseMutation,
  useDeleteHouseMutation,
} = houseApi;