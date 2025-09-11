import { apiSlice } from "../api/apiSlice";

export interface User {
  _id: string;
  name: string;
  hostpitalId: string;
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
      query: () => "/auth/users",
      providesTags: ["Users"],
    }),

    // Update user profile
    updateUserProfile: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: `/auth/users/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserProfileMutation } = userApiSlice;
