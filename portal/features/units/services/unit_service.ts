import { AxiosResponse } from "axios";
import { Response, Unit } from "@/models";
import client from "@/services/client";

const URL = "/units/";

export default {
  get: async (): Promise<AxiosResponse<Response<Unit[]>>> => client.get(URL),
  getById: async (id: number): Promise<AxiosResponse<Response<Unit>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Unit>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Unit>) =>
    client.patch(`${URL}/${id}/`, data),
};
