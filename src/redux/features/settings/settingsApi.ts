import { baseApi } from "../api/baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => ({
        url: "/settings/about-us",
        method: "GET",
      }),
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/settings/privacy-policy",
        method: "GET",
      }),
    }),
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/settings/terms-conditions",
        method: "GET",
      }),
    }),
    getReturnPolicy: builder.query({
      query: () => ({
        url: "/settings/return-policy",
        method: "GET",
      }),
    }),
    getAdditionalCharge: builder.query({
      query: () => ({
        url: "/settings/additional-charge",
        method: "GET",
      }),
      transformResponse: (response: any) => response?.data?.attributes,
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsAndConditionsQuery,
  useGetReturnPolicyQuery,
  useGetAdditionalChargeQuery,
} = settingsApi;
