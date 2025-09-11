import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SymptomAnalysis {
  _id: string;
  userId: string;
  symptoms: string[];
  freeText: string;
  context: string;
  status: "open" | "reviewed" | "closed";
  differentials: string[];
  triage: string;
  redFlags: string[];
  nextSteps: string[];
  createdAt: string;
  updatedAt: string;
}

interface SymptomsState {
  currentSymptoms: string[];
  freeText: string;
  context: string;
  analyses: SymptomAnalysis[];
  loading: boolean;
  error: string | null;
}

const initialState: SymptomsState = {
  currentSymptoms: [],
  freeText: "",
  context: "",
  analyses: [],
  loading: false,
  error: null,
};

const symptomsSlice = createSlice({
  name: "symptoms",
  initialState,
  reducers: {
    addSymptom: (state, action: PayloadAction<string>) => {
      state.currentSymptoms.push(action.payload);
    },
    removeSymptom: (state, action: PayloadAction<string>) => {
      state.currentSymptoms = state.currentSymptoms.filter(
        (symptom) => symptom !== action.payload
      );
    },
    setFreeText: (state, action: PayloadAction<string>) => {
      state.freeText = action.payload;
    },
    setContext: (state, action: PayloadAction<string>) => {
      state.context = action.payload;
    },
    clearSymptomsForm: (state) => {
      state.currentSymptoms = [];
      state.freeText = "";
      state.context = "";
    },
    setAnalyses: (state, action: PayloadAction<SymptomAnalysis[]>) => {
      state.analyses = action.payload;
    },
    addAnalysis: (state, action: PayloadAction<SymptomAnalysis>) => {
      state.analyses.unshift(action.payload); // put latest at top
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addSymptom,
  removeSymptom,
  setFreeText,
  setContext,
  clearSymptomsForm,
  setAnalyses,
  addAnalysis,
  setLoading,
  setError,
} = symptomsSlice.actions;

export default symptomsSlice.reducer;
