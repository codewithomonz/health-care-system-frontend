// src/types/symptoms.d.ts

export interface SymptomAnalysis {
  _id: string;
  userId: string;
  symptoms: string[];
  freeText: string;
  context: string;
  status: string;
  differentials: string[];
  triage: string;
  redFlags: string[];
  nextSteps: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface SymptomAnalysisResponse {
  success: boolean;
  data: SymptomAnalysis[];
}
export interface SymptomAnalysisSingleResponse {
  success: boolean;
  data: SymptomAnalysis;
}
