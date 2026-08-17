import { apiSlice } from "../api/apiSlice";
import { CREATE_SYMPTOMS } from "../constant";
import {
  type SymptomAnalysisResponse,
  type SymptomAnalysisSingleResponse,
  type SymptomAnalysis,
} from "@/types/symptoms";

export const symptomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new symptoms analysis
    createSymptoms: builder.mutation<
      SymptomAnalysisSingleResponse, // ✅ create returns one object
      Partial<SymptomAnalysis>
    >({
      query: (data) => ({
        url: `${CREATE_SYMPTOMS}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Symptoms"],
    }),

    // Get all analyses for logged-in user (DiagnosisHistory)
    getUserAnalyses: builder.query<SymptomAnalysisResponse, void>({
      query: () => ({
        url: `${CREATE_SYMPTOMS}/analysis`,
        method: "GET",
      }),
      providesTags: ["Symptoms"],
    }),

    // Get latest single analysis for dashboard
    getLatestAnalysis: builder.query<SymptomAnalysisSingleResponse, void>({
      query: () => ({
        url: `${CREATE_SYMPTOMS}/latest`, // 👈 or your actual endpoint
        method: "GET",
      }),
      providesTags: ["Symptoms"],
    }),

    // Get single analysis by ID
    getSingleAnalysis: builder.query<SymptomAnalysisSingleResponse, string>({
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
      invalidatesTags: ["Symptoms"],
    }),

    // Admin only — get all analyses
    getAllAnalysesAdmin: builder.query<SymptomAnalysisResponse, void>({
      query: () => `${CREATE_SYMPTOMS}/all`,
      providesTags: ["Symptoms"],
    }),
  }),
});

export const {
  useCreateSymptomsMutation,
  useGetUserAnalysesQuery,
  useGetLatestAnalysisQuery, // ✅ for Dashboard
  useGetSingleAnalysisQuery,
  useDeleteAnalysisMutation,
  useGetAllAnalysesAdminQuery,
} = symptomsApiSlice;
