import { AxiosResponse } from "axios";
import { Response, Nutrient } from "@/models";
import client from "@/services/client";

const URL = "/nutrients";

export default {
  get: async (query?: Object): Promise<AxiosResponse<Response<Nutrient[]>>> =>
    client.get(`${URL}/?${query}`, { params: query }),
  getById: async (id: number): Promise<AxiosResponse<Response<Nutrient>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Nutrient>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Nutrient>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
};
