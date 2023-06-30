import { AxiosResponse } from "axios";
import { Response, User } from "@/models";
import client from "@/services/client";

const URL = "/users";

export default {
  get: async (): Promise<AxiosResponse<Response<User[]>>> =>
    client.get(`${URL}/`),
  getById: async (id: number): Promise<AxiosResponse<Response<User>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<User>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<User>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
};
