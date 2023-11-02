import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  WeightGuideline,
  WeightGuidelineHistory,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/breed-guideline/weights";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const weightGuidelineApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getWeightGuidelines: build.query<Response<WeightGuideline[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getWeightGuidelineHistory: build.query<
        Response<WeightGuidelineHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getWeightGuidelineSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createWeightGuideline: build.mutation<
        Promise<WeightGuideline>,
        Partial<WeightGuideline>
      >({
        query: (data: Partial<WeightGuideline>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateWeightGuideline: build.mutation<
        Promise<WeightGuideline>,
        Pick<WeightGuideline, "id"> & Partial<WeightGuideline>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteWeightGuideline: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getWeightGuidelineByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<WeightGuideline>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportWeightGuidelinesXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportWeightGuidelinesXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportWeightGuidelinesCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importWeightGuidelinesXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importWeightGuidelinesCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importWeightGuidelinesXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetWeightGuidelinesQuery,
  useLazyGetWeightGuidelinesQuery,
  useGetWeightGuidelineHistoryQuery,
  useGetWeightGuidelineSummaryQuery,
  useCreateWeightGuidelineMutation,
  useUpdateWeightGuidelineMutation,
  useDeleteWeightGuidelineMutation,
} = weightGuidelineApi;
