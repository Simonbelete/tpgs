import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  Notification,
  NotificationList,
} from "@/models";
import { AxiosResponse } from "axios";
import { NextPageContext } from "next";
import clientSSR from "@/services/client_ssr";

export const URL = "/inbox/notifications";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getUnreadCount: build.query<NotificationList, null>({
        query: () => ({ url: `${URL}/unread_count/`, method: "get" }),
      }),
      getUnreadList: build.query<Response<Notification[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/unread/`,
          method: "get",
          params: query,
        }),
      }),
      getNotifications: build.query<Response<Notification[]>, Object>({
        query: (query?: Object) => ({
          url: `${URL}/all/`,
          method: "get",
          params: query,
        }),
      }),
      markAsRead: build.mutation<Promise<AxiosResponse>, number>({
        query: (id) => ({
          url: `${URL}/${id}/mark-as-read/`,
          method: "post",
        }),
      }),
      markAllAsRead: build.mutation<Promise<AxiosResponse>, null>({
        query: () => ({
          url: `${URL}/mark-all-as-read/`,
          method: "post",
        }),
      }),
    };
  },
  overrideExisting: false,
});

export const getNotificationByIdSSR = async (
  context: NextPageContext,
  id: number
): Promise<AxiosResponse<Response<Notification>>> =>
  clientSSR(context).get(`${URL}/all/${id}`);

export const {
  useGetUnreadCountQuery,
  useGetUnreadListQuery,
  useLazyGetUnreadListQuery,
  useMarkAllAsReadMutation,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} = notificationApi;
