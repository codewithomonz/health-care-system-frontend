import { apiSlice } from "../api/apiSlice";
import { USERS } from "../constant";

export interface User {
  _id: string;
  name: string;
  hospitalId: string;
  role: string;
  createdAt: string;
}

interface UserResponse {
  success: string;
  count: number;
  data: User[];
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users (Admin only)
    getUsers: builder.query<UserResponse, void>({
      query: () => ({
        url: `${USERS}`,
        method: "GET",
        providesTags: ["Users"],
      }),
    }),

    // Update user profile
    updateUserProfile: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: `${USERS}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserProfileMutation } = userApiSlice;
