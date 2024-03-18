import { baseApi } from "@/services/baseApi";
import { Activity } from "@/models";
import { AxiosResponse } from "axios";
import { NextPageContext } from "next";
import clientSSR from "@/services/client_ssr";

export const URL = "activities";

export const activityApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getActivities: build.query<Response<Activity[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/`,
          method: "get",
          params: query,
        }),
      }),
    };
  },
  overrideExisting: false,
});

// export const getNotificationByIdSSR = async (
//   context: NextPageContext,
//   id: number
// ): Promise<AxiosResponse<Response<Activity>>> =>
//   clientSSR(context).get(`${URL}/all/${id}`);

export const { useGetActivitiesQuery, useLazyGetActivitiesQuery } = activityApi;
