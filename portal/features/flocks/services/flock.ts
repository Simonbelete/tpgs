import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Flock } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/flocks";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const flockApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getFlocks: build.query<Response<Flock[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getFlockHistory: build.query<
        Response<Flock>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getFlockSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createFlock: build.mutation<
        Promise<AxiosResponse<Flock>>,
        Partial<Flock>
      >({
        query: (data: Partial<Flock>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateFlock: build.mutation<Flock, Pick<Flock, "id"> & Partial<Flock>>({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteFlock: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getFlockByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Flock>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportFlocksXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportFlocksXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportFlocksCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importFlocksXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importFlocksCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importFlocksXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetFlocksQuery,
  useLazyGetFlocksQuery,
  useGetFlockHistoryQuery,
  useGetFlockSummaryQuery,
  useCreateFlockMutation,
  useUpdateFlockMutation,
  useDeleteFlockMutation,
} = flockApi;
