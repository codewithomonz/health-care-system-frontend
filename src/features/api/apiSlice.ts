import {
  createApi,
  fetchBaseQuery,
  type FetchArgs,
  type FetchBaseQueryError,
  type BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BASE_URL } from "../constant";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("hcs-access-token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // Handle expired/invalid access token
  if (result?.error?.status === 401) {
    const refreshToken = Cookies.get("hcs-refresh-token");

    if (refreshToken) {
      const refreshResult = await rawBaseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (
        refreshResult?.data &&
        typeof refreshResult.data === "object" &&
        "accessToken" in refreshResult.data &&
        "refreshToken" in refreshResult.data
      ) {
        const data = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
          expiresAt?: string;
        };

        // ✅ Save both tokens
        Cookies.set("hcs-access-token", data.accessToken, { expires: 7 });
        Cookies.set("hcs-refresh-token", data.refreshToken, { expires: 7 });

        // 🔑 Retry the original query with the new access token
        if (typeof args === "string") {
          args = { url: args };
        }
        if (!args.headers) {
          args.headers = new Headers();
        } else if (!(args.headers instanceof Headers)) {
          args.headers = new Headers(args.headers as Record<string, string>);
        }
        args.headers.set("Authorization", `Bearer ${data.accessToken}`);

        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        // refresh failed → logout user
        api.dispatch({ type: "auth/logout" });
      }
    } else {
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Feedback", "Symptoms", "Users"],
  endpoints: () => ({}),
});
