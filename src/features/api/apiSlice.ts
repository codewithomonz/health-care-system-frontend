// import {
//   createApi,
//   fetchBaseQuery,
//   type FetchArgs,
//   type FetchBaseQueryError,
//   type BaseQueryFn,
// } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";
// import { BASE_URL } from "../constant";

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   credentials: "include",
//   prepareHeaders: (headers) => {
//     const token = Cookies.get("hcs-access-token");
//     if (token) headers.set("Authorization", `Bearer ${token}`);
//     return headers;
//   },
// });

// // strongly typed baseQuery wrapper
// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     const refreshToken = Cookies.get("hcs-refresh-token");

//     if (refreshToken) {
//       const refreshResult = await baseQuery(
//         {
//           url: "/auth/refresh",
//           method: "POST",
//           body: { refreshToken },
//         },
//         api,
//         extraOptions
//       );

//       if (
//         refreshResult?.data &&
//         typeof refreshResult.data === "object" &&
//         "accessToken" in refreshResult.data
//       ) {
//         const data = refreshResult.data as { accessToken: string };
//         const newAccessToken = data.accessToken;

//         Cookies.set("hcs-access-token", newAccessToken, { expires: 7 });

//         // retry original request
//         result = await baseQuery(args, api, extraOptions);
//       } else {
//         api.dispatch({ type: "auth/logout" });
//       }
//     }
//   }

//   return result;
// };

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReauth,
//   endpoints: () => ({}),
// });

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
        "accessToken" in refreshResult.data
      ) {
        const data = refreshResult.data as { accessToken: string };
        const newAccessToken = data.accessToken;

        // Save new token
        Cookies.set("hcs-access-token", newAccessToken, { expires: 7 });

        // 🔑 Retry the original query with updated headers
        if (typeof args === "string") {
          args = { url: args };
        }
        if (!args.headers) {
          args.headers = new Headers();
        } else if (!(args.headers instanceof Headers)) {
          args.headers = new Headers(args.headers as Record<string, string>);
        }
        args.headers.set("Authorization", `Bearer ${newAccessToken}`);

        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch({ type: "auth/logout" });
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
