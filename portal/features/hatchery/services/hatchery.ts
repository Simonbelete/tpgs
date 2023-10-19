import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Hatchery, HatcheryEgg } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/hatchery";
const EGGS_URL = "eggs";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const hatcheryApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getHatchery: build.query<Response<Hatchery[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getHatcheryHistory: build.query<
        Response<Hatchery>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getHatcherySummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createHatchery: build.mutation<
        Promise<AxiosResponse<Hatchery>>,
        Partial<Hatchery>
      >({
        query: (data: Partial<Hatchery>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateHatchery: build.mutation<
        Hatchery,
        Pick<Hatchery, "id"> & Partial<Hatchery>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteHatchery: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),

      // Eggs
      getHatcheryEggs: build.query<
        Response<HatcheryEgg[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${EGGS_URL}`,
          method: "get",
          params: query,
        }),
      }),
      createHatcheryEgg: build.mutation<
        Promise<AxiosResponse<HatcheryEgg>>,
        { id: number; data: Partial<HatcheryEgg> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${EGGS_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateIngredientNutriet: build.mutation<
        HatcheryEgg,
        Pick<HatcheryEgg, "hatchery">
      >({
        query: ({ hatchery, ...patch }) => ({
          url: `${URL}/${hatchery}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteHatcheryEgg: build.mutation<
        Promise<AxiosResponse<HatcheryEgg>>,
        { id: number; nutrient_id: number }
      >({
        query: ({ id, nutrient_id }) => ({
          url: `${URL}/${id}/${EGGS_URL}/${nutrient_id}`,
          method: "delete",
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const getHatcheryByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Hatchery>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportHatcheryXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportHatcheryXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportHatcheryCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importHatcheryXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importHatcheryCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importHatcheryXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetHatcheryQuery,
  useLazyGetHatcheryQuery,
  useGetHatcheryHistoryQuery,
  useGetHatcherySummaryQuery,
  useCreateHatcheryMutation,
  useUpdateHatcheryMutation,
  useDeleteHatcheryMutation,

  // Nutrients
  useGetHatcheryEggsQuery,
  useLazyGetHatcheryEggsQuery,
  useCreateHatcheryEggMutation,
  useUpdateIngredientNutrietMutation,
  useDeleteHatcheryEggMutation,
} = hatcheryApi;
