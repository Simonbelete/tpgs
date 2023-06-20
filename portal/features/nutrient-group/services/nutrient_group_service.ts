import { AxiosResponse } from "axios";
import { Response, NutrientGroup } from "@/models";
import client from "@/services/client";

const URL = "/nutrient-groups";

export default {
  get: async (): Promise<AxiosResponse<Response<NutrientGroup[]>>> =>
    client.get(`${URL}/`),
  getById: async (
    id: number
  ): Promise<AxiosResponse<Response<NutrientGroup>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<NutrientGroup>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<NutrientGroup>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
};
