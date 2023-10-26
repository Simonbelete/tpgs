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
    };
  },
  overrideExisting: false,
});

export const { useChangePasswordMutation } = authApi;
