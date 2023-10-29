import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Candling } from "@/models";
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
      getCandlingList: build.query<Response<Candling[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getCandlingHistory: build.query<
        Response<Candling>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getCandlingSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createCandling: build.mutation<
        Promise<AxiosResponse<Candling>>,
        Partial<Candling>
      >({
        query: (data: Partial<Candling>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateCandling: build.mutation<
        Candling,
        Pick<Candling, "id"> & Partial<Candling>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteCandling: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getCandlingByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Candling>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportCandlingsXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportCandlingsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportCandlingsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importCandlingsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importCandlingsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importCandlingsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetCandlingListQuery,
  useLazyGetCandlingListQuery,
  useGetCandlingHistoryQuery,
  useGetCandlingSummaryQuery,
  useCreateCandlingMutation,
  useUpdateCandlingMutation,
  useDeleteCandlingMutation,
} = penApi;
