import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  Notification,
  NotificationList,
} from "@/models";
import { AxiosResponse } from "axios";

const URL = "inbox/notifications";

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

export const {
  useGetUnreadCountQuery,
  useGetUnreadListQuery,
  useLazyGetUnreadListQuery,
  useMarkAllAsReadMutation,
  useGetNotificationsQuery,
} = notificationApi;
