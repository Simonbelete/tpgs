import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Nutrient, NutrientHistory } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/nutrients";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const nutrientApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getNutrients: build.query<Response<Nutrient[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getAllNutrients: build.query<
        Response<Pick<Nutrient, "id" | "display_name" | "abbreviation">[]>,
        Object
      >({
        query: (query?: Object) => ({
          url: `${URL}/all/`,
          method: "get",
          params: query,
        }),
      }),
      getNutrientHistory: build.query<
        Response<NutrientHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getNutrientSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createNutrient: build.mutation<Promise<Nutrient>, Partial<Nutrient>>({
        query: (data: Partial<Nutrient>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateNutrient: build.mutation<
        Promise<Nutrient>,
        Pick<Nutrient, "id"> & Partial<Nutrient>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteNutrient: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getNutrientByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Nutrient>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportNutrientsXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportNutrientsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportNutrientsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importNutrientsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importNutrientsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importNutrientsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetNutrientsQuery,
  useLazyGetNutrientsQuery,
  useGetNutrientHistoryQuery,
  useGetNutrientSummaryQuery,
  useCreateNutrientMutation,
  useUpdateNutrientMutation,
  useDeleteNutrientMutation,

  useGetAllNutrientsQuery,
  useLazyGetAllNutrientsQuery,
} = nutrientApi;
