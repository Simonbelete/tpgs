import { baseApi } from '@/services/baseApi';
import { AbstractSummary, Response, NotificationList } from '@/models';

const URL = "inbox/notifications";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getUnreadCount: build.query<NotificationList, null>({ query: () => ({ url: `${URL}/unread_count/`, method: 'get' }) }),
      getUnreadList: build.query<NotificationList, null>({ query: () => ({ url: `${URL}/unread_list/`, method: 'get' }) }),
    }
  },
  overrideExisting: false,
});

export const { 
  useGetUnreadCountQuery,
  useGetUnreadListQuery,
  useLazyGetUnreadListQuery,
} = notificationApi;