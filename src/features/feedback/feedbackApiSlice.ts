import { apiSlice } from "../api/apiSlice";

export interface Feedback {
  _id: string;
  user: string;
  message: string;
  createdAt: string;
}

export const feedbackApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create new feedback
    createFeedback: builder.mutation<
      { success: boolean; feedback: Feedback },
      { message: string }
    >({
      query: (data) => ({
        url: "/feedback",
        method: "POST",
        body: data,
      }),
    }),

    // Get all feedbacks (admin only)
    getAllFeedbacks: builder.query<Feedback[], void>({
      query: () => "/feedback",
    }),

    // Delete feedback (admin only)
    deleteFeedback: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/feedback/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetAllFeedbacksQuery,
  useDeleteFeedbackMutation,
} = feedbackApiSlice;
