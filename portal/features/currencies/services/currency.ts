import { baseApi } from "@/services/baseApi";
import { Response, Currency } from "@/models";

const URL = "/currencies";

export const currencyApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getCurrencies: build.query<Response<Currency[]>, Object>({
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

export const { useGetCurrenciesQuery, useLazyGetCurrenciesQuery } = currencyApi;
