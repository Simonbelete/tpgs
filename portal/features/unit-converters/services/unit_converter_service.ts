import { AxiosResponse } from "axios";
import { Response, UnitConverter } from "@/models";
import client from "@/services/client";

const URL = "/unit-converters";

export default {
  get: async (): Promise<AxiosResponse<Response<UnitConverter[]>>> =>
    client.get(`${URL}/`),
  getById: async (
    id: number
  ): Promise<AxiosResponse<Response<UnitConverter>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<UnitConverter>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<UnitConverter>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
};
