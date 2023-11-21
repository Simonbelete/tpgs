import { AxiosResponse } from "axios";
import { Response, Nutrient } from "@/models";
import client from "@/services/client";

export const URL = "/nutrients";

export default {
  get: async (): Promise<AxiosResponse<Response<Nutrient[]>>> =>
    client.get(`${URL}/`),
  getById: async (id: number): Promise<AxiosResponse<Response<Nutrient>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Nutrient>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Nutrient>) =>
    client.patch(`${URL}/${id}/`, data),
};
