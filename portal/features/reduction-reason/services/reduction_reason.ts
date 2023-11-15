import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  ReductionReason,
  ReductionReasonHistory,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/reduction-reasons";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const reductionReasonApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getReductionReasons: build.query<Response<ReductionReason[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getReductionReasonHistory: build.query<
        Response<ReductionReasonHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getReductionReasonSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createReductionReason: build.mutation<
        Promise<ReductionReason>,
        Partial<ReductionReason>
      >({
        query: (data: Partial<ReductionReason>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateReductionReason: build.mutation<
        Promise<ReductionReason>,
        Pick<ReductionReason, "id"> & Partial<ReductionReason>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteReductionReason: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getReductionReasonByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<ReductionReason>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportReductionReasonsXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportReductionReasonsXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportReductionReasonsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importReductionReasonsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importReductionReasonsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importReductionReasonsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetReductionReasonsQuery,
  useLazyGetReductionReasonsQuery,
  useGetReductionReasonHistoryQuery,
  useGetReductionReasonSummaryQuery,
  useCreateReductionReasonMutation,
  useUpdateReductionReasonMutation,
  useDeleteReductionReasonMutation,
} = reductionReasonApi;
