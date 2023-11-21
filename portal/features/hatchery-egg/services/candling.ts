import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  HatcheryEgg,
  HatcheryEggAnalyses,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/hatchery-eggs";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const hatcheryEggApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getHatcheryEggs: build.query<Response<HatcheryEgg[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getHatcheryEggHistory: build.query<
        Response<HatcheryEgg>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getHatcheryEggSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createHatcheryEgg: build.mutation<
        Promise<HatcheryEgg>,
        Partial<HatcheryEgg>
      >({
        query: (data: Partial<HatcheryEgg>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateHatcheryEgg: build.mutation<
        Promise<HatcheryEgg>,
        Pick<HatcheryEgg, "id"> & Partial<HatcheryEgg>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteHatcheryEgg: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
      getHatcheryEggAnalyses: build.query<HatcheryEggAnalyses, number>({
        query: (id) => ({
          url: `${URL}/${id}/analyses`,
          method: "get",
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const getHatcheryEggByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<HatcheryEgg>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportHatcheryEggsXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportHatcheryEggsXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportHatcheryEggsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importHatcheryEggsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importHatcheryEggsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importHatcheryEggsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetHatcheryEggsQuery,
  useLazyGetHatcheryEggsQuery,
  useGetHatcheryEggHistoryQuery,
  useGetHatcheryEggSummaryQuery,
  useCreateHatcheryEggMutation,
  useUpdateHatcheryEggMutation,
  useDeleteHatcheryEggMutation,
  useGetHatcheryEggAnalysesQuery,
} = hatcheryEggApi;
