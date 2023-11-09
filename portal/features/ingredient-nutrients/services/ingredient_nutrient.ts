import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  IngredientNutrient,
  IngredientNutrientHistory,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/ingredient-nutrients";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const ingredientNutrientApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getIngredientNutrients: build.query<
        Response<IngredientNutrient[]>,
        Object
      >({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getIngredientNutrientHistory: build.query<
        Response<IngredientNutrientHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getIngredientNutrientSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createIngredientNutrient: build.mutation<
        Promise<IngredientNutrient>,
        Partial<IngredientNutrient>
      >({
        query: (data: Partial<IngredientNutrient>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateIngredientNutrient: build.mutation<
        Promise<IngredientNutrient>,
        Pick<IngredientNutrient, "id"> & Partial<IngredientNutrient>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteIngredientNutrient: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getIngredientNutrientByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<IngredientNutrient>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportIngredientNutrientsXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportIngredientNutrientsXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportIngredientNutrientsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importIngredientNutrientsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importIngredientNutrientsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importIngredientNutrientsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetIngredientNutrientsQuery,
  useLazyGetIngredientNutrientsQuery,
  useGetIngredientNutrientHistoryQuery,
  useGetIngredientNutrientSummaryQuery,
  useCreateIngredientNutrientMutation,
  useUpdateIngredientNutrientMutation,
  useDeleteIngredientNutrientMutation,
} = ingredientNutrientApi;
