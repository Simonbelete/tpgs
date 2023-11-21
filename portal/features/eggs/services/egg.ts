import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Egg, EggHistory } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/eggs";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const eggApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getEggs: build.query<Response<Egg[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getEggHistory: build.query<
        Response<EggHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getEggSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createEgg: build.mutation<Promise<Egg>, Partial<Egg>>({
        query: (data: Partial<Egg>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateEgg: build.mutation<Promise<Egg>, Pick<Egg, "id"> & Partial<Egg>>({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteEgg: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getEggByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Egg>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportEggsXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportEggsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportEggsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importEggsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importEggsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importEggsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetEggsQuery,
  useGetEggHistoryQuery,
  useGetEggSummaryQuery,
  useCreateEggMutation,
  useUpdateEggMutation,
  useDeleteEggMutation,
} = eggApi;
