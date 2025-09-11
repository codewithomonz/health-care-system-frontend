import { apiSlice } from "../api/apiSlice";
import { CREATE_SYMPTOMS } from "../constant";
import {
  type SymptomAnalysisResponse,
  type SymptomAnalysis,
} from "@/types/symptoms";

export const symptomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new symptoms analysis
    createSymptoms: builder.mutation<SymptomAnalysis, Partial<SymptomAnalysis>>(
      {
        query: (data) => ({
          url: `${CREATE_SYMPTOMS}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Symptoms"], // ✅ no error
      }
    ),

    // Get all analyses for logged-in user
    getUserAnalyses: builder.query<SymptomAnalysisResponse, void>({
      query: () => ({
        url: `${CREATE_SYMPTOMS}/analysis`,
        method: "GET",
      }),
      providesTags: ["Symptoms"], // ✅ no error
    }),

    // Get single analysis by ID
    getSingleAnalysis: builder.query<SymptomAnalysis, string>({
      query: (id) => `${CREATE_SYMPTOMS}/${id}`,
    }),

    // Delete analysis
    deleteAnalysis: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `${CREATE_SYMPTOMS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Symptoms"], // ✅ trigger refetch of getUserAnalyses
    }),

    // Admin only — get all analyses
    getAllAnalysesAdmin: builder.query<SymptomAnalysisResponse, void>({
      query: () => `${CREATE_SYMPTOMS}/all`,
      providesTags: ["Symptoms"], // optional: keeps admin list fresh too
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
