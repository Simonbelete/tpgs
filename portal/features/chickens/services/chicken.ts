import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, Chicken } from '@/models';
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/chickens";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const breedApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getChickens: build.query<Response<Chicken>, Object>({ query: (query?: Object) => ({ url: `${URL}/`, method: 'get', params: query }) }),
      getChickenHistory: build.query<Response<Chicken>, {id: number, query: Object}>({ query: ({id, query}) => ({ url: `${URL}/${id}/${HISTORY_URL}`, method: 'get', params: query }) }),
      getChickenSummary: build.query<AbstractSummary, number>({ query: (id: number) => ({ url: `${URL}/${id}/${SUMMARY_URL}/`, method: 'get' }) }),
      createChicken: build.mutation<Promise<AxiosResponse<Chicken>>, Partial<Chicken>>({
        query: (data: Partial<Chicken>) => ({ url: `${URL}/`, method: 'post', data: data }),
      }),
      updateChicken: build.mutation<Chicken, Pick<Chicken, 'id'> & Partial<Chicken>>({
        query: ({id, ...patch}) => ({ url: `${URL}/${id}/`, method: 'patch', data: patch }),
      }),
      deleteChicken: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: 'delete' }),
      })
    }
  },
  overrideExisting: false,
});

export const getChickenByIdSSR = async (
    context: NextPageContext,
    id: number
  ): Promise<AxiosResponse<Response<Chicken>>> =>
    clientSSR(context).get(`${URL}/${id}`);
export const exportChickensXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportChickensXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportChickensCSV = async () => client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const  importChickensXLSX = async (data: FormData) =>
    client.post(`${IMPORT_URL}/xlsx`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
export const importChickensCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importChickensXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
});


export const { 
  useGetChickensQuery,
  useGetChickenHistoryQuery,
  useGetChickenSummaryQuery, 
  useCreateChickenMutation,
  useUpdateChickenMutation,
  useDeleteChickenMutation,
} = breedApi;