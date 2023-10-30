import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Region } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/regions";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const regionApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getRegions: build.query<Response<Region[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getRegionHistory: build.query<
        Response<Region>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getRegionSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createRegion: build.mutation<
        Promise<AxiosResponse<Region>>,
        Partial<Region>
      >({
        query: (data: Partial<Region>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateRegion: build.mutation<
        Promise<AxiosResponse<Region>>,
        Pick<Region, "id"> & Partial<Region>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteRegion: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getRegionByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Region>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportRegionsXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportRegionsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportRegionsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importRegionsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importRegionsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importRegionsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetRegionsQuery,
  useLazyGetRegionsQuery,
  useGetRegionHistoryQuery,
  useGetRegionSummaryQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} = regionApi;
