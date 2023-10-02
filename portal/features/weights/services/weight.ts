import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, Weight } from '@/models';
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/weights";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const weightApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getWeights: build.query<Response<Weight>, Object>({ query: (query?: Object) => ({ url: `${URL}/`, method: 'get', params: query }) }),
      getWeightHistory: build.query<Response<Weight>, {id: number, query: Object}>({ query: ({id, query}) => ({ url: `${URL}/${id}/${HISTORY_URL}`, method: 'get', params: query }) }),
      getWeightSummary: build.query<AbstractSummary, number>({ query: (id: number) => ({ url: `${URL}/${id}/${SUMMARY_URL}/`, method: 'get' }) }),
      createWeight: build.mutation<Promise<AxiosResponse<Weight>>, Partial<Weight>>({
        query: (data: Partial<Weight>) => ({ url: `${URL}/`, method: 'post', data: data }),
      }),
      updateWeight: build.mutation<Weight, Pick<Weight, 'id'> & Partial<Weight>>({
        query: ({id, ...patch}) => ({ url: `${URL}/${id}/`, method: 'patch', data: patch }),
      }),
      deleteWeight: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: 'delete' }),
      })
    }
  },
  overrideExisting: false,
});

export const getWeightByIdSSR = async (
    context: NextPageContext,
    id: number
  ): Promise<AxiosResponse<Response<Weight>>> =>
    clientSSR(context).get(`${URL}/${id}`);
export const exportWeightsXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportWeightsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportWeightsCSV = async () => client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const  importWeightsXLSX = async (data: FormData) =>
    client.post(`${IMPORT_URL}/xlsx`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
export const importWeightsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importWeightsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
});


export const { 
  useGetWeightsQuery,
  useGetWeightHistoryQuery,
  useGetWeightSummaryQuery, 
  useCreateWeightMutation,
  useUpdateWeightMutation,
  useDeleteWeightMutation,
} = weightApi;