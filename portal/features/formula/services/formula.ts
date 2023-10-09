import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, Formula, FormulaIngredient } from '@/models';
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/formulas";
const ACCUSATION_URL = "/accusations";
const INGREDIENT_URL = "ingredients"
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const formulaApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getFormulas: build.query<Response<Formula[]>, Object>({ query: (query?: Object) => ({ url: `${URL}/`, method: 'get', params: query }) }),
      getFormulaHistory: build.query<Response<Formula>, {id: number, query: Object}>({ query: ({id, query}) => ({ url: `${URL}/${id}/${HISTORY_URL}`, method: 'get', params: query }) }),
      getFormulaSummary: build.query<AbstractSummary, number>({ query: (id: number) => ({ url: `${URL}/${id}/${SUMMARY_URL}/`, method: 'get' }) }),
      createFormula: build.mutation<Promise<AxiosResponse<Formula>>, Partial<Formula>>({
        query: (data: Partial<Formula>) => ({ url: `${URL}/`, method: 'post', data: data }),
      }),
      updateFormula: build.mutation<Formula, Pick<Formula, 'id'> & Partial<Formula>>({
        query: ({id, ...patch}) => ({ url: `${URL}/${id}/`, method: 'patch', data: patch }),
      }),
      deleteFormula: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: 'delete' }),
      }),
      // Accusations
      getFormulaAccusations: build.query<Response<Formula>, {formula_id: number, query: Object}>({ query: ({formula_id, query}) => ({ url: `${URL}/${formula_id}/${ACCUSATION_URL}`, method: 'get', params: query }) }),
      // Ingredients
      getFormulaIngredients: build.query<Response<Formula>, {id: number, query: Object}>({ query: ({id, query}) => ({ url: `${URL}/${id}/${ACCUSATION_URL}`, method: 'get', params: query }) }),
      createFormulaIngredient: build.mutation<Promise<AxiosResponse<FormulaIngredient>>, {id: number, data: Partial<FormulaIngredient>}>({
        query: ({id, data}) => ({ url: `${URL}/${id}/${INGREDIENT_URL}`, method: 'post', data: data }),
      }),
      updateIngredientNutriet: build.mutation<FormulaIngredient, Pick<FormulaIngredient, 'ingredient'> & Partial<FormulaIngredient>>({
        query: ({ingredient, ...patch}) => ({ url: `${URL}/${ingredient}/`, method: 'patch', data: patch }),
      }),
      deleteFormulaIngredient: build.mutation<Promise<AxiosResponse<FormulaIngredient>>, {id: number, ingredient_id: number}>({
        query: ({id, ingredient_id}) => ({ url: `${URL}/${id}/${INGREDIENT_URL}/${ingredient_id}`, method: 'delete' }),
      }),
    }
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
export const exportFormulasCSV = async () => client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const  importFormulasXLSX = async (data: FormData) =>
    client.post(`${IMPORT_URL}/xlsx`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
export const importFormulasCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
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


export const { 
  useGetFormulasQuery,
  useLazyGetFormulasQuery,
  useGetFormulaHistoryQuery,
  useGetFormulaSummaryQuery, 
  useCreateFormulaMutation,
  useUpdateFormulaMutation,
  useDeleteFormulaMutation,
  useGetFormulaAccusationsQuery,

  // Ingredients
  useGetFormulaIngredientsQuery,
  useLazyGetFormulaIngredientsQuery,
  useCreateFormulaIngredientMutation,
  useUpdateIngredientNutrietMutation,
  useDeleteFormulaIngredientMutation,
} = formulaApi;