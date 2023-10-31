import { baseApi } from "@/services/baseApi";
import { Response, Country } from "@/models";

const URL = "/countries";

export const countryApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getCountries: build.query<Response<Country[]>, Object>({
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

export const { useGetCountriesQuery, useLazyGetCountriesQuery } = countryApi;
