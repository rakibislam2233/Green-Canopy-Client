import { baseApi } from "../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, limit, searchTerm, categoryName }) => {
        let params: Record<string, string> = {};
        if (searchTerm) {
          params.searchTerm = searchTerm;
        }
        if (categoryName) {
          params.categoryName = categoryName;
        }
        if (page) {
          params.page = page;
        }
        if (limit) {
          params.limit = limit;
        }
        return {
          url: "/product",
          method: "GET",
          params,
        };
      },
    }),
    getSingleProduct: builder.query({
      query: (slug) => `/product/slug/${slug}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = productsApi;
