import { RootState } from "@/redux/store";
import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

// Define a base query that accesses the Redux state for the token
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Enhanced base query with token refresh logic
const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle various error statuses
  if (result?.error?.status === 404) {
    toast.error(
      (result.error.data as { message: string })?.message || "Not Found"
    );
  }
  if (result?.error?.status === 403) {
    toast.error(
      (result.error.data as { message: string })?.message || "Forbidden"
    );
  }
  if (result?.error?.status === 409) {
    toast.error(
      (result.error.data as { message: string })?.message || "Conflict"
    );
  }
  if (result?.error?.status === 401) {
    window.location.href = "/login?logout=true";
    //i want to dispatch logout action
  }

  return result;
};

// Create the base API
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["company"],
  endpoints: () => ({}),
});
