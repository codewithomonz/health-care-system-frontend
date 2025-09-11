import { apiSlice } from "../api/apiSlice";

export interface Feedback {
  _id: string;
  user: string;
  message: string;
  createdAt: string;
}

interface FeedbackResponse {
  message: string;
  data: Feedback[];
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
      invalidatesTags: ["Feedback"], // ✅ refetch list after creating
    }),

    // Get all feedbacks (admin only)
    getAllFeedbacks: builder.query<FeedbackResponse, void>({
      query: () => "/feedback",
      providesTags: ["Feedback"], // ✅ this query provides the "Feedback" tag
    }),

    // Delete feedback (admin only)
    deleteFeedback: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/feedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"], // ✅ refetch list after deleting
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetAllFeedbacksQuery,
  useDeleteFeedbackMutation,
} = feedbackApiSlice;
