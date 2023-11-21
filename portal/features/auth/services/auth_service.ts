import { AxiosResponse } from "axios";
import { Response, ResetPassword, ResetPasswordConfirm } from "@/models";
import client from "@/services/client";

export const URL = "/auth";
const RESET_PASSWORD_URL = `${URL}/reset-password`;
const RESET_PASSWORD_CONFIRM_URL = `${URL}/reset-password`;

export default {
  reset_password: async (data: ResetPassword) =>
    client.post(`${RESET_PASSWORD_URL}/`, data),
  reset_password_confirm: async (data: ResetPasswordConfirm) =>
    client.post(`${RESET_PASSWORD_CONFIRM_URL}/`, data),
};
