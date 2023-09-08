import { AxiosResponse } from "axios";
import { Response, Invitation, VerifyInvitation } from "@/models";
import client from "@/services/client";

const URL = "/invitations";
const VERIFY_URL = 'verify-invitation';

export default {
  get: async (): Promise<AxiosResponse<Response<Invitation[]>>> =>
    client.get(`${URL}/`),
  getById: async (id: number): Promise<AxiosResponse<Response<Invitation>>> =>
    client.get(`${URL}/${id}`),
  create: async (data: Partial<Invitation>) => client.post(`${URL}/`, data),
  update: async (id: number, data: Partial<Invitation>) =>
    client.patch(`${URL}/${id}/`, data),
  delete: async (id: number) => client.delete(`${URL}/${id}/`),
  verify: async (data: VerifyInvitation) => client.post(`${VERIFY_URL}/`, data),
};
