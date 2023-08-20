import { AxiosResponse } from "axios";
import { Response, Nutrient } from "@/models";
import client from "@/services/client";

const URL = "/nutrients";
const HISTORY_URL = `histories`;
const EXPORT_URL = `${URL}/export`;
const IMPORT_URL = `${URL}/import`;

export default {
  get: async (query?: Object): Promise<AxiosResponse<Response<Nutrient[]>>> =>
    client.get(`${URL}/?${query}`, { params: query }),
  getById: async (id: number): Promise<AxiosResponse<Response<Nutrient>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Nutrient>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Nutrient>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
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
