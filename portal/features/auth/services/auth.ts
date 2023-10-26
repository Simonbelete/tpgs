import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, ChangePassword } from "@/models";
import { AxiosResponse } from "axios";

const URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      changePassword: build.mutation<
        Promise<AxiosResponse<ChangePassword>>,
        any
      >({
        query: (data: ChangePassword) => ({
          url: `${URL}/change-password/`,
          method: "post",
          data: data,
        }),
      }),
      deactivateAccount: build.mutation<
        Promise<AxiosResponse<ChangePassword>>,
        null
      >({
        query: () => ({
          url: `${URL}/deactivate/`,
          method: "post",
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const { useChangePasswordMutation, useDeactivateAccountMutation } =
  authApi;
