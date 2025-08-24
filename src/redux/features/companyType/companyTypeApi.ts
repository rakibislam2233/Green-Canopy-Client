import { baseApi } from "../api/baseApi";

const companyTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyTypes: builder.query({
      query: (limit) => ({
        url: "/company-type",
        method: "GET",
        params: { page: 1, limit },
      }),
    }),
  }),
});

export const { useGetCompanyTypesQuery } = companyTypeApi;
