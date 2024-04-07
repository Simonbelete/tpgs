import { baseApi } from "@/services/baseApi";
import { Response, Contact } from "@/models";

export const URL = "/contact";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getContacts: build.query<Response<Contact[]>, Object>({
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

export const { useGetContactsQuery, useLazyGetContactsQuery } = contactApi;
