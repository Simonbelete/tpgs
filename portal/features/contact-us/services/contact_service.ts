import { AxiosResponse } from "axios";
import { Response, Contact } from "@/models";
import client from "@/services/client";

export const URL = "/contact";

export default {
  get: async (query?: Object): Promise<AxiosResponse<Response<Contact[]>>> =>
    client.get(`${URL}/?${query}`, { params: query }),
  getById: async (id: number): Promise<AxiosResponse<Response<Contact>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Contact>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Contact>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
};
