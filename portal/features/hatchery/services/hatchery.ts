import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  Hatchery,
  HatcheryEgg,
  Incubation,
} from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/hatchery";
const EGGS_URL = "eggs";
const INCUBATION_URL = "incubations";
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
        providesTags: ["TENANT_AWARE_LIST"],
      }),
      getStage1Hatchery: build.query<Response<Hatchery[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: { ...query, stage__order: 1 },
        }),
        providesTags: ["TENANT_AWARE_LIST"],
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
      createHatchery: build.mutation<Promise<Hatchery>, Partial<Hatchery>>({
        query: (data: Partial<Hatchery>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateHatchery: build.mutation<
        Promise<Hatchery>,
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
      getEggsOfHatchery: build.query<
        Response<HatcheryEgg[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${EGGS_URL}`,
          method: "get",
          params: query,
        }),
      }),
      createEggForHatchery: build.mutation<
        Promise<HatcheryEgg>,
        { id: number; data: Partial<HatcheryEgg> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${EGGS_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateEggOfHatchery: build.mutation<
        Promise<HatcheryEgg>,
        Partial<HatcheryEgg>
      >({
        query: ({ hatchery, id, ...patch }) => ({
          url: `${URL}/${hatchery}/${EGGS_URL}/${id}`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteEggOfHatchery: build.mutation<
        any,
        Pick<HatcheryEgg, "hatchery" | "id">
      >({
        query: ({ hatchery, id }) => ({
          url: `${URL}/${hatchery}/${EGGS_URL}/${id}`,
          method: "delete",
        }),
      }),

      // Incubation
      getIncubationOfHatchery: build.query<
        Response<Incubation[]>,
        { id: number; query?: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${INCUBATION_URL}`,
          method: "get",
          params: query,
        }),
      }),
      createIncubationForHatchery: build.mutation<
        Promise<Incubation>,
        { id: number; data: Partial<HatcheryEgg> }
      >({
        query: ({ id, data }) => ({
          url: `${URL}/${id}/${INCUBATION_URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateIncubationOfHatchery: build.mutation<
        Promise<Incubation>,
        Partial<Incubation>
      >({
        query: ({ hatchery, id, ...patch }) => ({
          url: `${URL}/${hatchery}/${INCUBATION_URL}/${id}`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteIncubationOfHatchery: build.mutation<
        any,
        Pick<HatcheryEgg, "hatchery" | "id">
      >({
        query: ({ hatchery, id }) => ({
          url: `${URL}/${hatchery}/${EGGS_URL}/${id}`,
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
  client.post(`${IMPORT_URL}/csv/`, data, {
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

  // Eggs
  useGetEggsOfHatcheryQuery,
  useLazyGetEggsOfHatcheryQuery,
  useCreateEggForHatcheryMutation,
  useUpdateEggOfHatcheryMutation,
  useDeleteEggOfHatcheryMutation,

  // Incubation
} = hatcheryApi;
