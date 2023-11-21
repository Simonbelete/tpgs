import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  NutrientGroup,
  NutrientGroupHistory,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/nutrient-groups";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const nutrientGroupApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getNutrientGroups: build.query<Response<NutrientGroup[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getNutrientGroupHistory: build.query<
        Response<NutrientGroupHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getNutrientGroupSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createNutrientGroup: build.mutation<
        Promise<NutrientGroup>,
        Partial<NutrientGroup>
      >({
        query: (data: Partial<NutrientGroup>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateNutrientGroup: build.mutation<
        Promise<NutrientGroup>,
        Pick<NutrientGroup, "id"> & Partial<NutrientGroup>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteNutrientGroup: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getNutrientGroupByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<NutrientGroup>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportNutrientGroupsXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportNutrientGroupsXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportNutrientGroupsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importNutrientGroupsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importNutrientGroupsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importNutrientGroupsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetNutrientGroupsQuery,
  useLazyGetNutrientGroupsQuery,
  useGetNutrientGroupHistoryQuery,
  useGetNutrientGroupSummaryQuery,
  useCreateNutrientGroupMutation,
  useUpdateNutrientGroupMutation,
  useDeleteNutrientGroupMutation,
} = nutrientGroupApi;
