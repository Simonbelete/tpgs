import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  HHEPGuideline,
  HHEPGuidelineHistory,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/breed-guideline/hhep";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const hHEPGuidelineApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getHHEPGuidelines: build.query<Response<HHEPGuideline[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getHHEPGuidelineHistory: build.query<
        Response<HHEPGuidelineHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getHHEPGuidelineSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createHHEPGuideline: build.mutation<
        Promise<HHEPGuideline>,
        Partial<HHEPGuideline>
      >({
        query: (data: Partial<HHEPGuideline>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateHHEPGuideline: build.mutation<
        Promise<HHEPGuideline>,
        Pick<HHEPGuideline, "id"> & Partial<HHEPGuideline>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteHHEPGuideline: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getHHEPGuidelineByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<HHEPGuideline>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportHHEPGuidelinesXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportHHEPGuidelinesXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportHHEPGuidelinesCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importHHEPGuidelinesXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importHHEPGuidelinesCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importHHEPGuidelinesXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetHHEPGuidelinesQuery,
  useLazyGetHHEPGuidelinesQuery,
  useGetHHEPGuidelineHistoryQuery,
  useGetHHEPGuidelineSummaryQuery,
  useCreateHHEPGuidelineMutation,
  useUpdateHHEPGuidelineMutation,
  useDeleteHHEPGuidelineMutation,
} = hHEPGuidelineApi;
