import { baseApi } from "../api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon/apply-coupon",
        method: "PoST",
        body: data,
      }),
    }),
  }),
});

export const { useApplyCouponMutation } = couponApi;
