import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  Requirement,
  RequirementNutrient,
  RequirementAnalyses,
  RequirementHistory,
  RequirementIngredient,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";
import { Query, CreateFormData } from "@/types";

export const URL = "/requirements";
const HISTORY_URL = `histories`;
const NUTRIENT_URL = "nutrients";
const INGREDIENT_URL = "ingredients";
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const requirementApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getRequirements: build.query<Response<Requirement[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getRequirementHistory: build.query<
        Response<RequirementHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getRequirementSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createRequirement: build.mutation<
        Promise<Requirement>,
        Partial<Requirement>
      >({
        query: (data: Partial<Requirement>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateRequirement: build.mutation<
        Promise<Requirement>,
        Pick<Requirement, "id"> & Partial<Requirement>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteRequirement: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
      getRequirementAnalyses: build.query<RequirementAnalyses, number>({
        query: (id) => ({
          url: `${URL}/${id}/analyses`,
          method: "get",
        }),
      }),
      // Nutrients
      getNutrientsOfRequirement: build.query<
        Response<RequirementNutrient[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${NUTRIENT_URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getAllNutrientsOfRequirement: build.query<
        Response<RequirementNutrient[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${NUTRIENT_URL}/all/`,
          method: "get",
          params: query,
        }),
      }),
      createNutrientForRequirement: build.mutation<
        Promise<RequirementNutrient>,
        { id: number; data: Partial<RequirementNutrient> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${NUTRIENT_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateNutrientOfRequirement: build.mutation<
        Promise<RequirementNutrient>,
        Partial<RequirementNutrient>
      >({
        query: ({ requirement, id, ...patch }) => ({
          url: `${URL}/${requirement}/${NUTRIENT_URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteNutrientOfRequirement: build.mutation<
        any,
        Pick<RequirementNutrient, "requirement" | "id">
      >({
        query: ({ requirement, id }) => ({
          url: `${URL}/${requirement}/${NUTRIENT_URL}/${id}`,
          method: "delete",
        }),
      }),

      // Ingredient
      getIngredientsOfRequirement: build.query<
        Response<RequirementIngredient[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${INGREDIENT_URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getAllIngredientsOfRequirement: build.query<
        Response<RequirementIngredient[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${INGREDIENT_URL}/all/`,
          method: "get",
          params: query,
        }),
      }),
      createIngredientForRequirement: build.mutation<
        Promise<RequirementIngredient>,
        { id: number; data: Partial<RequirementIngredient> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${INGREDIENT_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateIngredientOfRequirement: build.mutation<
        Promise<RequirementIngredient>,
        Partial<RequirementIngredient>
      >({
        query: ({ requirement, id, ...patch }) => ({
          url: `${URL}/${requirement}/${INGREDIENT_URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteIngredientOfRequirement: build.mutation<
        any,
        Pick<RequirementIngredient, "requirement" | "id">
      >({
        query: ({ requirement, id }) => ({
          url: `${URL}/${requirement}/${INGREDIENT_URL}/${id}`,
          method: "delete",
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const getRequirementByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Requirement>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportRequirementsXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportRequirementsXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportRequirementsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importRequirementsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importRequirementsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importRequirementsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetRequirementsQuery,
  useLazyGetRequirementsQuery,
  useGetRequirementHistoryQuery,
  useGetRequirementSummaryQuery,
  useCreateRequirementMutation,
  useUpdateRequirementMutation,
  useDeleteRequirementMutation,
  useGetRequirementAnalysesQuery,

  // Nutrients
  useGetNutrientsOfRequirementQuery,
  useLazyGetNutrientsOfRequirementQuery,
  useCreateNutrientForRequirementMutation,
  useUpdateNutrientOfRequirementMutation,
  useDeleteNutrientOfRequirementMutation,
  useGetAllNutrientsOfRequirementQuery,
  useLazyGetAllNutrientsOfRequirementQuery,

  // Ingredient
  useGetIngredientsOfRequirementQuery,
  useLazyGetIngredientsOfRequirementQuery,
  useCreateIngredientForRequirementMutation,
  useUpdateIngredientOfRequirementMutation,
  useDeleteIngredientOfRequirementMutation,
  useGetAllIngredientsOfRequirementQuery,
  useLazyGetAllIngredientsOfRequirementQuery,
} = requirementApi;
