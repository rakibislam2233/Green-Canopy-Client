import { baseApi } from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
        params: { page: 1, limit: 100 },
      }),
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
