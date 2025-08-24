import { baseApi } from "../api/baseApi";

const companyApi = baseApi.injectEndpoints({
  overrideExisting:true,
  endpoints: (build) => ({
    addCompany: build.mutation({
      query: (data) => ({
        url: "/company",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["company"],
    }),
    getAllCompany: build.query({
      query: ({
        page,
        searchTerm,
        companyType,
        city,
        state,
        zipCode,
        country,
        latitude,
        longitude,
        radius
      }) => {
        let params: Record<string, string> = {};
        if (page) {
          params.page = page;
        }
        if (searchTerm) {
          params.searchTerm = searchTerm;
        }
        if (companyType) {
          params.companyType = companyType;
        }
        if (city) {
          params.city = city;
        }
        if (state) {
          params.state = state;
        }
        if (zipCode) {
          params.zipCode = zipCode;
        }
        if (country) {
          params.country = country;
        }
        if (latitude) {
          params.latitude = latitude;
        }
        if (longitude) {
          params.longitude = longitude;
        }
        if (radius) {
          params.radius = radius;
        }
        return {
          url: "/company",
          method: "GET",
          params,
        };
      },
      providesTags: ["company"],
    }),
    getSingleCompany: build.query({
      query: (slug) => ({
        url: `/company/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["company"],
    }),
    getSingleCompanyById: build.query({
      query: (id) => ({
        url: `/company/${id}`,
        method: "GET",
      }),
      providesTags: ["company"],
    }),
    getMyCompany: build.query({
      query: () => ({
        url: "/company/my-company",
        method: "GET",
      }),
      providesTags: ["company"],
    }),
    updateMyCompany: build.mutation({
      query: ({ id, data }) => ({
        url: `/company/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["company"],
    }),
    deleteMyCompany: build.mutation({
      query: (id) => ({
        url: `/company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
    deleteCompanyImage: build.mutation({
      query: ({ companyId, imageId }) => ({
        url: `/company/delete-image?id=${companyId}&imageId=${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
    addCompanyReview: build.mutation({
      query: (data: {
        rating: number;
        comment: string;
        companyId: string;
      }) => ({
        url: "/companyReview",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["company"],
    }),
    updateCompanyReview: build.mutation({
      query: ({ id, data }) => ({
        url: `/companyReview/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["company"],
    }),
    deleteCompanyReview: build.mutation({
      query: (reviewId: string) => ({
        url: `/companyReview/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
  }),
});

export const {
  useAddCompanyMutation,
  useGetAllCompanyQuery,
  useGetSingleCompanyQuery,
  useGetSingleCompanyByIdQuery,
  useAddCompanyReviewMutation,
  useGetMyCompanyQuery,
  useUpdateMyCompanyMutation,
  useDeleteMyCompanyMutation,
  useDeleteCompanyImageMutation,
  useUpdateCompanyReviewMutation,
  useDeleteCompanyReviewMutation,
} = companyApi;
