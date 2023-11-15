import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, House, HouseHistory } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/houses";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const houseApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getHouses: build.query<Response<House[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getHouseHistory: build.query<
        Response<HouseHistory[]>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getHouseSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createHouse: build.mutation<Promise<House>, Partial<House>>({
        query: (data: Partial<House>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateHouse: build.mutation<
        Promise<House>,
        Pick<House, "id"> & Partial<House>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteHouse: build.mutation<any, number>({
        query: (id: number) => ({ url: `${URL}/${id}/`, method: "delete" }),
      }),
    };
  },
  overrideExisting: false,
});

export const getHouseByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<House>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportHousesXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportHousesXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportHousesCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importHousesXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importHousesCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importHousesXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const {
  useGetHousesQuery,
  useLazyGetHousesQuery,
  useGetHouseHistoryQuery,
  useGetHouseSummaryQuery,
  useCreateHouseMutation,
  useUpdateHouseMutation,
  useDeleteHouseMutation,
} = houseApi;
