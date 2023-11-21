import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  Formula,
  FormulaIngredient,
  FormulaRequirement,
  FormulaNutrient,
  FormulaRation,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/formulas";
const INGREDIENT_URL = "ingredients";
const REQUIREMENT_URL = "requirements";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const formulaApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      formulate: build.query<Formula, number>({
        query: (id) => ({ url: `${URL}/${id}/formulate/`, method: "post" }),
      }),
      getFormulas: build.query<Response<Formula[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getFormulaById: build.query<Formula, number>({
        query: (id) => ({
          url: `${URL}/${id}/`,
          method: "get",
        }),
      }),
      getFormulaMatrix: build.query<Response<any[]>, number>({
        query: (id) => ({
          url: `${URL}/${id}/matrix`,
          method: "get",
        }),
      }),
      getFormulaHistory: build.query<
        Response<Formula>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getFormulaSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createFormula: build.mutation<Promise<Formula>, Partial<Formula>>({
        query: (data: Partial<Formula>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateFormula: build.mutation<
        Promise<Formula>,
        Pick<Formula, "id"> & Partial<Formula>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteFormula: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
      // Accusations
      getFormulaAccusations: build.query<
        Response<Formula>,
        { formula_id: number; query: Object }
      >({
        query: ({ formula_id, query }) => ({
          url: `${URL}/${formula_id}/${INGREDIENT_URL}`,
          method: "get",
          params: query,
        }),
      }),
      // Ingredients
      getIngredientsOfFormula: build.query<
        Response<FormulaIngredient[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${INGREDIENT_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getAllIngredientsOfFormula: build.query<
        Response<Partial<FormulaIngredient>[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${INGREDIENT_URL}/all`,
          method: "get",
          params: query,
        }),
      }),
      createIngredientForFormula: build.mutation<
        Promise<FormulaIngredient>,
        { id: number; data: Partial<FormulaIngredient> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${INGREDIENT_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateIngredientOfFormula: build.mutation<
        Promise<FormulaIngredient>,
        Partial<FormulaIngredient>
      >({
        query: ({ formula, id, ...patch }) => ({
          url: `${URL}/${formula}/${INGREDIENT_URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteIngredientOfFormula: build.mutation<
        any,
        Pick<FormulaIngredient, "ingredient" | "id">
      >({
        query: ({ ingredient, id }) => ({
          url: `${URL}/${ingredient}/${INGREDIENT_URL}/${id}/`,
          method: "delete",
        }),
      }),
      // Requirements
      getRequirementsOfFormula: build.query<
        Response<FormulaRequirement[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${REQUIREMENT_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getAllRequirementsOfFormula: build.query<
        Response<Partial<FormulaRequirement>[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${REQUIREMENT_URL}/all`,
          method: "get",
          params: query,
        }),
      }),
      createRequirementForFormula: build.mutation<
        Promise<FormulaRequirement>,
        { id: number; data: Partial<FormulaIngredient> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${REQUIREMENT_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateRequirementOfFormula: build.mutation<
        Promise<FormulaRequirement>,
        Partial<FormulaIngredient>
      >({
        query: ({ formula, id, ...patch }) => ({
          url: `${URL}/${formula}/${REQUIREMENT_URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteRequirementOfFormula: build.mutation<
        any,
        Pick<FormulaRequirement, "formula" | "id">
      >({
        query: ({ formula, id }) => ({
          url: `${URL}/${formula}/${REQUIREMENT_URL}/${id}/`,
          method: "delete",
        }),
      }),
      // Rations
      getRationsOfFormula: build.query<
        Response<FormulaRation[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/rations`,
          method: "get",
          params: query,
        }),
      }),
      createRationForFormula: build.mutation<
        Promise<FormulaRation>,
        { id: number; data: Partial<FormulaRation> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/rations/`,
          method: "post",
          data: data,
        }),
      }),
      getAllRationsOfFormula: build.query<
        Response<Partial<FormulaRation>[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/rations/all`,
          method: "get",
          params: query,
        }),
      }),
      // Nutrients
      getFormulaNutrients: build.query<Response<FormulaNutrient[]>, number>({
        query: (id) => ({ url: `${URL}/${id}/nutrients`, method: "get" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getFormulaByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Formula>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportFormulasXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportFormulasXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportFormulasCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importFormulasXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importFormulasCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importFormulasXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const printFormulaPdf = async (id: number) =>
  client.post(`${URL}/${id}/print/pdf/`);

export const {
  useFormulateQuery,
  useLazyFormulateQuery,
  useGetFormulasQuery,
  useGetFormulaByIdQuery,
  useLazyGetFormulasQuery,
  useGetFormulaHistoryQuery,
  useGetFormulaSummaryQuery,
  useCreateFormulaMutation,
  useUpdateFormulaMutation,
  useDeleteFormulaMutation,
  useGetFormulaAccusationsQuery,
  useGetFormulaMatrixQuery,

  // Ingredients
  useGetIngredientsOfFormulaQuery,
  useLazyGetIngredientsOfFormulaQuery,
  useCreateIngredientForFormulaMutation,
  useUpdateIngredientOfFormulaMutation,
  useDeleteIngredientOfFormulaMutation,
  useGetAllIngredientsOfFormulaQuery,
  useLazyGetAllIngredientsOfFormulaQuery,

  // Requirements
  useGetRequirementsOfFormulaQuery,
  useLazyGetRequirementsOfFormulaQuery,
  useCreateRequirementForFormulaMutation,
  useUpdateRequirementOfFormulaMutation,
  useDeleteRequirementOfFormulaMutation,
  useLazyGetAllRequirementsOfFormulaQuery,

  // Rations
  useGetRationsOfFormulaQuery,
  useLazyGetRationsOfFormulaQuery,
  useLazyGetAllRationsOfFormulaQuery,
  useCreateRationForFormulaMutation,

  // Nutrients
  useGetFormulaNutrientsQuery,
  useLazyGetFormulaNutrientsQuery,
} = formulaApi;
