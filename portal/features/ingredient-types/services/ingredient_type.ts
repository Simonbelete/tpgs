import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  IngredientType,
  IngredientTypeHistory,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/ingredient-types";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const ingredientTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getIngredientTypes: build.query<Response<IngredientType[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getIngredientTypeHistory: build.query<
        Response<IngredientTypeHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getIngredientTypeSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createIngredientType: build.mutation<
        Promise<IngredientType>,
        Partial<IngredientType>
      >({
        query: (data: Partial<IngredientType>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateIngredientType: build.mutation<
        Promise<IngredientType>,
        Pick<IngredientType, "id"> & Partial<IngredientType>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteIngredientType: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getIngredientTypeByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<IngredientType>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportIngredientTypesXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportIngredientTypesXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportIngredientTypesCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importIngredientTypesXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importIngredientTypesCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importIngredientTypesXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetIngredientTypesQuery,
  useLazyGetIngredientTypesQuery,
  useGetIngredientTypeHistoryQuery,
  useGetIngredientTypeSummaryQuery,
  useCreateIngredientTypeMutation,
  useUpdateIngredientTypeMutation,
  useDeleteIngredientTypeMutation,
} = ingredientTypeApi;
