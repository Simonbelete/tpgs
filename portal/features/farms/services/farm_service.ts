import { AxiosResponse } from "axios";
import { Response, Farm } from "@/models";
import client from "@/services/client";

const URL = "/farms";

export default {
  get: async (query?: Object): Promise<AxiosResponse<Response<Farm[]>>> =>
    client.get(`${URL}/`, { params: query }),
  getById: async (id: number): Promise<AxiosResponse<Response<Farm>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Farm>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Farm>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
};
