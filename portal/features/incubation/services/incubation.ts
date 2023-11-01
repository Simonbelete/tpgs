import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  Incubation,
  IncubationAnalyses,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/incubations";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const incubationApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getIncubations: build.query<Response<Incubation[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getIncubationHistory: build.query<
        Response<Incubation>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getIncubationSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createIncubation: build.mutation<
        Promise<Incubation>,
        Partial<Incubation>
      >({
        query: (data: Partial<Incubation>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateIncubation: build.mutation<
        Promise<Incubation>,
        Pick<Incubation, "id"> & Partial<Incubation>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteIncubation: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
      getIncubationAnalyses: build.query<IncubationAnalyses, number>({
        query: (id) => ({
          url: `${URL}/${id}/analyses`,
          method: "get",
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const getIncubationByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Incubation>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportIncubationsXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportIncubationsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportIncubationsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importIncubationsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importIncubationsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importIncubationsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetIncubationsQuery,
  useLazyGetIncubationsQuery,
  useGetIncubationHistoryQuery,
  useGetIncubationSummaryQuery,
  useCreateIncubationMutation,
  useUpdateIncubationMutation,
  useDeleteIncubationMutation,
  useGetIncubationAnalysesQuery,
} = incubationApi;
