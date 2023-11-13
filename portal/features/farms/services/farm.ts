import { baseApi } from "@/services/baseApi";
import { Response, Farm } from "@/models";
import { AxiosResponse } from "axios";
import clientSSR from "@/services/client_ssr";
import client from "@/services/client";
import { NextPageContext } from "next";

const URL = "/farms";

export const farmApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getFarms: build.query<Response<Farm[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
      updateFarm: build.mutation<
        Promise<Farm>,
        Pick<Farm, "id"> & Partial<Farm>
      >({
        query: ({ id, ...patch }) => ({
          url: `${URL}/${id}/`,
          method: "patch",
          data: patch,
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const getFarmByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Farm>>> =>
  clientSSR(context).get(`${URL}/${id}`);

export const { useGetFarmsQuery, useLazyGetFarmsQuery } = farmApi;
