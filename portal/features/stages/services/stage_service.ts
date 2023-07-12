import { AxiosResponse } from "axios";
import { Response, Stage } from "@/models";
import client from "@/services/client";

const URL = "/stages";

export default {
  get: async (): Promise<AxiosResponse<Response<Stage[]>>> =>
    client.get(`${URL}/`),
  getById: async (id: number): Promise<AxiosResponse<Response<Stage>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Stage>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Stage>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
};
