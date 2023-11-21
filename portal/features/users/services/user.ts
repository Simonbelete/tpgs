import { baseApi } from "@/services/baseApi";
import { AbstractSummary, Response, User } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

export const URL = "/users";
const HISTORY_URL = `histories`;
const SUMMARY_URL = `summary`;

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getUsers: build.query<Response<User[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      getUserHistory: build.query<
        Response<User>,
        { id: number; query: Object }
      >({
        query: ({ id, query }) => ({
          url: `${URL}/${id}/${HISTORY_URL}`,
          method: "get",
          params: query,
        }),
      }),
      getUserSummary: build.query<AbstractSummary, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/${SUMMARY_URL}/`,
          method: "get",
        }),
      }),
      createUser: build.mutation<Promise<User>, Partial<User>>({
        query: (data: Partial<User>) => ({
          url: `${URL}/`,
          method: "post",
          data: data,
        }),
      }),
      updateUser: build.mutation<
        Promise<User>,
        Pick<User, "id"> & Partial<User>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
      deleteUser: build.mutation<any, number>({
        query: (id: number) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: { is_active: false },
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const getUserByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<User>>> =>
  clientSSR(context).get(`${URL}/${id}`);

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserHistoryQuery,
  useGetUserSummaryQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
