import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, Purpose } from '@/models';
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/purposes";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const purposeApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getPurposes: build.query<Response<Purpose>, Object>({ query: (query?: Object) => ({ url: `${URL}/`, method: 'get', params: query }) }),
      getPurposeHistory: build.query<Response<Purpose>, {id: number, query: Object}>({ query: ({id, query}) => ({ url: `${URL}/${id}/${HISTORY_URL}`, method: 'get', params: query }) }),
      getPurposeSummary: build.query<AbstractSummary, number>({ query: (id: number) => ({ url: `${URL}/${id}/${SUMMARY_URL}/`, method: 'get' }) }),
      createPurpose: build.mutation<Promise<AxiosResponse<Purpose>>, Partial<Purpose>>({
        query: (data: Partial<Purpose>) => ({ url: `${URL}/`, method: 'post', data: data }),
      }),
      updatePurpose: build.mutation<Purpose, Pick<Purpose, 'id'> & Partial<Purpose>>({
        query: ({id, ...patch}) => ({ url: `${URL}/${id}/`, method: 'patch', data: patch }),
      }),
      deletePurpose: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: 'delete' }),
      })
    }
  },
  overrideExisting: false,
});

export const getPurposeByIdSSR = async (
    context: NextPageContext,
    id: number
  ): Promise<AxiosResponse<Response<Purpose>>> =>
    clientSSR(context).get(`${URL}/${id}`);
export const exportPurposesXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportPurposesXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportPurposesCSV = async () => client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const  importPurposesXLSX = async (data: FormData) =>
    client.post(`${IMPORT_URL}/xlsx`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
export const importPurposesCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importPurposesXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
});


export const { 
  useGetPurposesQuery,
  useGetPurposeHistoryQuery,
  useGetPurposeSummaryQuery, 
  useCreatePurposeMutation,
  useUpdatePurposeMutation,
  useDeletePurposeMutation,
} = purposeApi;