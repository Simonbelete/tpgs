import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Pen } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/pen";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const penApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getPens: build.query<Response<Pen[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getPenHistory: build.query<Response<Pen>, { id: number; query: Object }>({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getPenSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createPen: build.mutation<Promise<AxiosResponse<Pen>>, Partial<Pen>>({
        query: (data: Partial<Pen>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updatePen: build.mutation<
        Promise<AxiosResponse<Pen>>,
        Pick<Pen, "id"> & Partial<Pen>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deletePen: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getPenByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Pen>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportPensXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportPensXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportPensCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importPensXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importPensCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importPensXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetPensQuery,
  useLazyGetPensQuery,
  useGetPenHistoryQuery,
  useGetPenSummaryQuery,
  useCreatePenMutation,
  useUpdatePenMutation,
  useDeletePenMutation,
} = penApi;
