import { AxiosResponse } from "axios";
import { Response, IngredientType } from "@/models";
import client from "@/services/client";

const URL = "/ingredient-types";

export default {
  get: async (): Promise<AxiosResponse<Response<IngredientType[]>>> =>
    client.get(`${URL}/`),
  getById: async (
    id: number
  ): Promise<AxiosResponse<Response<IngredientType>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<IngredientType>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<IngredientType>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
};
