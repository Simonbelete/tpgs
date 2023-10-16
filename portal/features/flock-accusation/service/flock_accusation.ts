import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, FlockAccusation } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/FlockAccusations";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const FlockAccusationApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getFlockAccusations: build.query<Response<FlockAccusation[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getFlockAccusationHistory: build.query<
        Response<FlockAccusation>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getFlockAccusationsummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createFlockAccusation: build.mutation<
        Promise<AxiosResponse<FlockAccusation>>,
        Partial<FlockAccusation>
      >({
        query: (data: Partial<FlockAccusation>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateFlockAccusation: build.mutation<
        FlockAccusation,
        Pick<FlockAccusation, "id"> & Partial<FlockAccusation>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteFlockAccusation: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getFlockAccusationByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<FlockAccusation>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportFlockAccusationsXLSX = async () =>
  client.get(`${EXPORT_URL}/xlsx`);
export const exportFlockAccusationsXLS = async () =>
  client.get(`${EXPORT_URL}/xls`);
export const exportFlockAccusationsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importFlockAccusationsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importFlockAccusationsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importFlockAccusationsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetFlockAccusationsQuery,
  useLazyGetFlockAccusationsQuery,
  useGetFlockAccusationHistoryQuery,
  useGetFlockAccusationsummaryQuery,
  useCreateFlockAccusationMutation,
  useUpdateFlockAccusationMutation,
  useDeleteFlockAccusationMutation,
} = FlockAccusationApi;
