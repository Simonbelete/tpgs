import { baseApi } from "@/services/baseApi";
import {
  AbstractSummary,
  Response,
  Notification,
  NotificationList,
} from "@/models";

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
    };
  },
  overrideExisting: false,
});

export const {
  useGetUnreadCountQuery,
  useGetUnreadListQuery,
  useLazyGetUnreadListQuery,
} = notificationApi;
