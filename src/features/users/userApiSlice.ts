import { apiSlice } from "../api/apiSlice";
import { USERS } from "../constant";

// export interface User {
//   _id: string;
//   name: string;
//   hospitalId: string;
//   role: string;
//   createdAt: string;
// }

// interface UserResponse {
//   success: string;
//   count: number;
//   data: User[];
// }

export interface User {
  _id: string;
  name: string;
  hospitalId: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: User[]; // 👈 not an array
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users (Admin only)
    getUsers: builder.query<UpdateProfileResponse, void>({
      query: () => ({
        url: `${USERS}`,
        method: "GET",
        providesTags: ["Users"],
      }),
    }),

    // Update user profile
    updateUserProfile: builder.mutation<UpdateProfileResponse, Partial<User>>({
      query: (data) => ({
        url: `${USERS}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserProfileMutation } = userApiSlice;
