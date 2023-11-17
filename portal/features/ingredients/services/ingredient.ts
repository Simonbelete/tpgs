import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  Ingredient,
  IngredientNutrient,
  IngredientAnalyses,
  IngredientHistory,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/ingredients";
const NUTRIENT_URL = "nutrients";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const ingredientApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getIngredients: build.query<Response<Ingredient[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getIngredientHistory: build.query<
        Response<IngredientHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getIngredientSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createIngredient: build.mutation<
        Promise<Ingredient>,
        Partial<Ingredient>
      >({
        query: (data: Partial<Ingredient>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateIngredient: build.mutation<
        Promise<Ingredient>,
        Pick<Ingredient, "id"> & Partial<Ingredient>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteIngredient: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
      getIngredientAnalyses: build.query<IngredientAnalyses, number>({
        query: (id) => ({
          url: `${URL}/${id}/analyses`,
          method: "get",
        }),
      }),
      // Nutrients
      getNutrientsOfIngredient: build.query<
        Response<IngredientNutrient[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${NUTRIENT_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getAllNutrientsOfIngredient: build.query<
        Response<IngredientNutrient[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${NUTRIENT_URL}/all/`,
          method: "get",
          params: query,
        }),
      }),
      createNutrientForIngredient: build.mutation<
        Promise<IngredientNutrient>,
        { id: number; data: Partial<Ingredient> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${NUTRIENT_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateNutrietOfIngredient: build.mutation<
        Promise<IngredientNutrient>,
        Partial<IngredientNutrient>
      >({
        query: ({ ingredient, id, ...patch }) => ({
          url: `${URL}/${ingredient}/${NUTRIENT_URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteNutrientOfIngredient: build.mutation<
        any,
        Pick<IngredientNutrient, "ingredient" | "id">
      >({
        query: ({ ingredient, id }) => ({
          url: `${URL}/${ingredient}/${NUTRIENT_URL}/${id}`,
          method: "delete",
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const getIngredientByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Ingredient>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportIngredientsXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportIngredientsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportIngredientsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importIngredientsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importIngredientsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importIngredientsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetIngredientsQuery,
  useLazyGetIngredientsQuery,
  useGetIngredientHistoryQuery,
  useGetIngredientSummaryQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
  useGetIngredientAnalysesQuery,

  // Nutrients
  useGetNutrientsOfIngredientQuery,
  useLazyGetNutrientsOfIngredientQuery,
  useCreateNutrientForIngredientMutation,
  useUpdateNutrietOfIngredientMutation,
  useDeleteNutrientOfIngredientMutation,
  useGetAllNutrientsOfIngredientQuery,
  useLazyGetAllNutrientsOfIngredientQuery,
} = ingredientApi;
