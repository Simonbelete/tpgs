import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, Directory } from "@/models";
import client from "@/services/client";
import { AxiosResponse } from "axios";

const URL = "/directories";
const REFRESH_URL = `${URL}/refresh`;

export const directoryApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getDdrectories: build.query<Response<Directory[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getBatchDdrectories: build.query<Response<Directory[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/batch/`,
          method: "get",
          params: query,
        }),
      }),
      refreshDirectory: build.mutation<Promise<AxiosResponse<any>>, null>({
        query: () => ({ url: `${URL}/refresh/`, method: "post" }),
      }),
    };
  },
  overrideExisting: false,
});

export const {
  useGetDdrectoriesQuery,
  useLazyGetDdrectoriesQuery,
  useRefreshDirectoryMutation,
} = directoryApi;
