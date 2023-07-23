import { AxiosResponse } from "axios";
import { Response, Chicken, ChickenHistory } from "@/models";
import client from "@/services/client";
import clientSSR from "@/services/client_ssr";
import { NextPageContext } from "next";

const URL = "/chickens";
const HISTORY_URL = `histories`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export default {
  get: async (): Promise<AxiosResponse<Response<Chicken[]>>> =>
    client.get(`${URL}/`),
  getById: async (id: number): Promise<AxiosResponse<Response<Chicken>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Chicken>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Chicken>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
  getByIdSSR: async (
    context: NextPageContext,
    id: number
  ): Promise<AxiosResponse<Response<Chicken>>> =>
    clientSSR(context).get(`${URL}/${id}`),
  history: {
    get: async (
      id: number
    ): Promise<AxiosResponse<Response<ChickenHistory[]>>> =>
      client.get(`${URL}/${id}/${HISTORY_URL}/`),
  },
  export: {
    xlsx: async () => client.get(`${EXPORT_URL}/xlsx`),
    xls: async () => client.get(`${EXPORT_URL}/xls`),
    csv: async () => client.get(`${EXPORT_URL}/csv`, { responseType: "blob" }),
  },
  import: {
    xlsx: async (data: FormData) =>
      client.post(`${IMPORT_URL}/xlsx`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    xls: async (data: FormData) =>
      client.post(`${IMPORT_URL}/xls`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    csv: async (data: FormData) =>
      client.post(`${IMPORT_URL}/csv`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
  },
};
