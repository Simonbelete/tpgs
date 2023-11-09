import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Unit, UnitHistory } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/units";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const unitApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getUnits: build.query<Response<Unit[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getUnitHistory: build.query<
        Response<UnitHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getUnitSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createUnit: build.mutation<Promise<Unit>, Partial<Unit>>({
        query: (data: Partial<Unit>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateUnit: build.mutation<
        Promise<Unit>,
        Pick<Unit, "id"> & Partial<Unit>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteUnit: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getUnitByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Unit>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportUnitsXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportUnitsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportUnitsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importUnitsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importUnitsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importUnitsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetUnitsQuery,
  useLazyGetUnitsQuery,
  useGetUnitHistoryQuery,
  useGetUnitSummaryQuery,
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = unitApi;
