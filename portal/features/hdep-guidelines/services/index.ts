import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  HDEPGuideline,
  HDEPGuidelineHistory,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/breed-guideline/hdep";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const hDEPGuidelineApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getHDEPGuidelines: build.query<Response<HDEPGuideline[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getHDEPGuidelineHistory: build.query<
        Response<HDEPGuidelineHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getHDEPGuidelineSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createHDEPGuideline: build.mutation<
        Promise<HDEPGuideline>,
        Partial<HDEPGuideline>
      >({
        query: (data: Partial<HDEPGuideline>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateHDEPGuideline: build.mutation<
        Promise<HDEPGuideline>,
        Pick<HDEPGuideline, "id"> & Partial<HDEPGuideline>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteHDEPGuideline: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getHDEPGuidelineByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<HDEPGuideline>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportHDEPGuidelinesXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportHDEPGuidelinesXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportHDEPGuidelinesCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importHDEPGuidelinesXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importHDEPGuidelinesCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importHDEPGuidelinesXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetHDEPGuidelinesQuery,
  useLazyGetHDEPGuidelinesQuery,
  useGetHDEPGuidelineHistoryQuery,
  useGetHDEPGuidelineSummaryQuery,
  useCreateHDEPGuidelineMutation,
  useUpdateHDEPGuidelineMutation,
  useDeleteHDEPGuidelineMutation,
} = hDEPGuidelineApi;
