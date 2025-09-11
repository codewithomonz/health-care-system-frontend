import { apiSlice } from "../api/apiSlice";
import { CREATE_SYMPTOMS } from "../constant";

export const symptomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new symptoms analysis
    createSymptoms: builder.mutation({
      query: (data) => ({
        url: `${CREATE_SYMPTOMS}`,
        method: "POST",
        body: data,
      }),
    }),

    // Get all analyses for logged-in user
    getUserAnalyses: builder.query({
      query: () => `${CREATE_SYMPTOMS}`,
    }),

    // Get single analysis by ID
    getSingleAnalysis: builder.query({
      query: (id) => `${CREATE_SYMPTOMS}/${id}`,
    }),

    // Delete analysis
    deleteAnalysis: builder.mutation({
      query: (id) => ({
        url: `${CREATE_SYMPTOMS}/${id}`,
        method: "DELETE",
      }),
    }),

    // Admin only — get all analyses
    getAllAnalysesAdmin: builder.query({
      query: () => `${CREATE_SYMPTOMS}/all`,
    }),
  }),
});

export const {
  useCreateSymptomsMutation,
  useGetUserAnalysesQuery,
  useGetSingleAnalysisQuery,
  useDeleteAnalysisMutation,
  useGetAllAnalysesAdminQuery,
} = symptomsApiSlice;
