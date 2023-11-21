import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, City } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/cities";
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const cityApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getCities: build.query<Response<City[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const getCityByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<City>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportCitiesXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportCitiesXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportCitiesCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importCitiesXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importCitiesCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importCitiesXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const { useGetCitiesQuery, useLazyGetCitiesQuery } = cityApi;
