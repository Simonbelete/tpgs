import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, House } from '@/models';
import { AxiosResponse } from "axios";
import client from "@/services/client";
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
      getSummary: build.query<AbstractSummary, number>({ query: (id: number) => ({ url: `${URL}/${id}/${SUMMARY_URL}/`, method: 'get' }) }),
      createHouse: build.mutation({
        query: () => ({ url: `${URL}/`, method: 'post' }),
      }),
      updateHouse: build.mutation<House, {id: number, data: Partial<House>}>({
        query: ({id, data}) => ({ url: `${URL}/${id}/`, method: 'patch', data: data }),
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
  useGetSummaryQuery, 
  useCreateHouseMutation,
  useUpdateHouseMutation,
  useDeleteHouseMutation,
} = houseApi;