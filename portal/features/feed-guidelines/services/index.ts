import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  FeedGuideline,
  FeedGuidelineHistory,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/breed-guideline/feeds";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const feedGuidelineApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getFeedGuidelines: build.query<Response<FeedGuideline[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getFeedGuidelineHistory: build.query<
        Response<FeedGuidelineHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getFeedGuidelineSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createFeedGuideline: build.mutation<
        Promise<FeedGuideline>,
        Partial<FeedGuideline>
      >({
        query: (data: Partial<FeedGuideline>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateFeedGuideline: build.mutation<
        Promise<FeedGuideline>,
        Pick<FeedGuideline, "id"> & Partial<FeedGuideline>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteFeedGuideline: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getFeedGuidelineByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<FeedGuideline>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportFeedGuidelinesXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportFeedGuidelinesXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportFeedGuidelinesCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importFeedGuidelinesXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importFeedGuidelinesCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importFeedGuidelinesXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetFeedGuidelinesQuery,
  useLazyGetFeedGuidelinesQuery,
  useGetFeedGuidelineHistoryQuery,
  useGetFeedGuidelineSummaryQuery,
  useCreateFeedGuidelineMutation,
  useUpdateFeedGuidelineMutation,
  useDeleteFeedGuidelineMutation,
} = feedGuidelineApi;
