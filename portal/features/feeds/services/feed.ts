import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Feed, FeedHistory } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/feeds";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const feedApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getFeeds: build.query<Response<Feed[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: { chicken__isnull: false, ...query },
        }),
      }),
      getBatchFeeds: build.query<Response<Feed[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: { chicken__isnull: true, ...query },
        }),
      }),
      getBatchChildrenFeeds: build.query<
        Response<Feed[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/`,
          method: "get",
          params: { parent: id, ...query },
        }),
      }),
      getFeedHistory: build.query<
        Response<FeedHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getFeedSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createFeed: build.mutation<Promise<Feed>, Partial<Feed>>({
        query: (data: Partial<Feed>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateFeed: build.mutation<
        Promise<Feed>,
        Pick<Feed, "id"> & Partial<Feed>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteFeed: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getFeedByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Feed>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportFeedsXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportFeedsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportFeedsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importFeedsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importFeedsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importFeedsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetFeedsQuery,
  useGetFeedHistoryQuery,
  useGetFeedSummaryQuery,
  useCreateFeedMutation,
  useUpdateFeedMutation,
  useDeleteFeedMutation,
} = feedApi;
