import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  EggGuideline,
  EggGuidelineHistory,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/breed-guideline/eggs";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const eggGuidelineApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getEggGuidelines: build.query<Response<EggGuideline[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getEggGuidelineHistory: build.query<
        Response<EggGuidelineHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getEggGuidelineSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createEggGuideline: build.mutation<
        Promise<EggGuideline>,
        Partial<EggGuideline>
      >({
        query: (data: Partial<EggGuideline>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateEggGuideline: build.mutation<
        Promise<EggGuideline>,
        Pick<EggGuideline, "id"> & Partial<EggGuideline>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteEggGuideline: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getEggGuidelineByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<EggGuideline>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportEggGuidelinesXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportEggGuidelinesXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportEggGuidelinesCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importEggGuidelinesXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importEggGuidelinesCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importEggGuidelinesXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetEggGuidelinesQuery,
  useLazyGetEggGuidelinesQuery,
  useGetEggGuidelineHistoryQuery,
  useGetEggGuidelineSummaryQuery,
  useCreateEggGuidelineMutation,
  useUpdateEggGuidelineMutation,
  useDeleteEggGuidelineMutation,
} = eggGuidelineApi;
