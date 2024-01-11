import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  Chicken,
  ChickenHistory,
  ChickenGrid,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/chickens";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const chickenApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getChickens: build.query<Response<Chicken[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getMaleChickens: build.query<Response<Chicken[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: { ...query, sex: "M" },
        }),
      }),
      getFeMaleChickens: build.query<Response<Chicken[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: { ...query, sex: "F" },
        }),
      }),
      getGenerations: build.query<
        Response<Pick<Chicken, "generation">[]>,
        Object
      >({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getChickenHistory: build.query<
        Response<ChickenHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getChickenSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      getChickenOffspring: build.query<
        Response<Chicken[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/offspring/`,
          method: "get",
          params: query,
        }),
      }),
      getChickenAncestors: build.query<
        Response<Chicken[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/ancestors/`,
          method: "get",
          params: query,
        }),
      }),
      getChickenSiblings: build.query<
        Response<Chicken[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/siblings/`,
          method: "get",
          params: query,
        }),
      }),
      createChicken: build.mutation<Promise<Chicken>, Partial<Chicken>>({
        query: (data: Partial<Chicken>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateChicken: build.mutation<
        Promise<Chicken>,
        Pick<Chicken, "id"> & Partial<Chicken>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteChicken: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
      getChickenGrid: build.query<Response<ChickenGrid[]>, number>({
        query: (id?: Object) => ({
          url: `/chicken-grid/${id}/`,
          method: "get",
        }),
      }),
      createChickenGrid: build.mutation<
        Promise<{ results: ChickenGrid[] }>,
        { id: number; data: any }
      >({
        query: (data: { id: number; data: any }) => ({
          url: `/chicken-grid/${data.id}/`,
          method: "post",
          data: data,
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const getChickenByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Chicken>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportChickensXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportChickensXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportChickensCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importChickensXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importChickensCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importChickensXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetChickensQuery,
  useLazyGetChickensQuery,
  useGetChickenHistoryQuery,
  useGetChickenSummaryQuery,
  useGetChickenOffspringQuery,
  useGetChickenAncestorsQuery,
  useGetChickenSiblingsQuery,
  useCreateChickenMutation,
  useUpdateChickenMutation,
  useDeleteChickenMutation,
  useGetChickenGridQuery,
  useLazyGetChickenGridQuery,
  useCreateChickenGridMutation,
} = chickenApi;
