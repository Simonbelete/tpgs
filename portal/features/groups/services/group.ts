import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Group } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/groups";
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export const groupApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getGroups: build.query<Response<Group[]>, Object>({
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

export const getGroupByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Group>>> =>
  clientSSR(context).get(`${URL}/${id}`);
export const exportGroupsXLSX = async () => client.get(`${EXPORT_URL}/xlsx`);
export const exportGroupsXLS = async () => client.get(`${EXPORT_URL}/xls`);
export const exportGroupsCSV = async () =>
  client.get(`${EXPORT_URL}/csv`, { responseType: "blob" });
export const importGroupsXLSX = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xlsx`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importGroupsCSV = async (data: FormData) =>
  client.post(`${IMPORT_URL}/csv/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const importGroupsXLS = async (data: FormData) =>
  client.post(`${IMPORT_URL}/xls`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const { useGetGroupsQuery, useLazyGetGroupsQuery } = groupApi;
