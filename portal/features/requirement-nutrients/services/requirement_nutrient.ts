import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  RequirementNutrient,
  RequirementNutrientHistory,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/requirement-nutrients";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const requirementNutrientApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getRequirementNutrients: build.query<
        Response<RequirementNutrient[]>,
        Object
      >({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getRequirementNutrientHistory: build.query<
        Response<RequirementNutrientHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getRequirementNutrientSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createRequirementNutrient: build.mutation<
        Promise<RequirementNutrient>,
        Partial<RequirementNutrient>
      >({
        query: (data: Partial<RequirementNutrient>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateRequirementNutrient: build.mutation<
        Promise<RequirementNutrient>,
        Pick<RequirementNutrient, "id"> & Partial<RequirementNutrient>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteRequirementNutrient: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getRequirementNutrientByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<RequirementNutrient>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportRequirementNutrientsXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportRequirementNutrientsXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportRequirementNutrientsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importRequirementNutrientsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importRequirementNutrientsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importRequirementNutrientsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetRequirementNutrientsQuery,
  useLazyGetRequirementNutrientsQuery,
  useGetRequirementNutrientHistoryQuery,
  useGetRequirementNutrientSummaryQuery,
  useCreateRequirementNutrientMutation,
  useUpdateRequirementNutrientMutation,
  useDeleteRequirementNutrientMutation,
} = requirementNutrientApi;
