import { AxiosResponse } from "axios";
import { Response, Ingredient } from "@/models";
import client from "@/services/client";

const URL = "/ingredients";

export default {
  get: async (): Promise<AxiosResponse<Response<Ingredient[]>>> =>
    client.get(`${URL}/`),
  getById: async (id: number): Promise<AxiosResponse<Response<Ingredient>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Ingredient>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Ingredient>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
};
