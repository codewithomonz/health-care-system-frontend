import { useGetUserAnalysesQuery } from "@/features/symptoms/symptomsApiSlice";
import { type SymptomAnalysis } from "@/types/symptoms";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router";

const DiagnosisHistory = () => {
  const { isError, isLoading, data: analysis } = useGetUserAnalysesQuery();

  if (isLoading) return <LoadingSkeleton />;

  if (isError)
    return <ErrorMessage message="Failed to load diagnosis history." />;

  const hasHistory = analysis?.data && analysis.data.length > 0;

  return (
    <div>
      <h4 className="text-2xl font-semibold mb-8">Diagnosis history</h4>
      <hr />
      {hasHistory ? (
        <div className="w-full md:max-w-2xl mx-auto flex flex-col border border-b-slate200 gap-6">
          {analysis!.data.map((analysisResponse: SymptomAnalysis) => (
            <div key={analysisResponse._id} className="space-y-4 mb">
              {/* User freeText bubble */}
              <div className="flex justify-end mb-4">
                <div className="bg-cyan-500 text-white px-4 py-3 rounded-2xl max-w-[80%] shadow">
                  {analysisResponse.freeText}
                </div>
              </div>

              {/* System response bubble */}
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-800 px-4 py-3 rounded-2xl max-w-[80%] shadow space-y-3">
                  <p>
                    <strong>Possible Conditions:</strong>{" "}
                    {analysisResponse.differentials.join(", ")}
                  </p>
                  <p>
                    <strong>Triage:</strong> {analysisResponse.triage}
                  </p>
                  <p>
                    <strong>Red Flags:</strong>
                  </p>
                  <ul className="list-disc pl-6 text-sm">
                    {analysisResponse.redFlags.map((flag, i) => (
                      <li key={i}>{flag}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Next Steps:</strong>
                  </p>
                  <ul className="list-disc pl-6 text-sm">
                    {analysisResponse.nextSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          {/* Decorative Icon */}
          <div className="bg-cyan-100 p-6 rounded-full mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-cyan-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-6h13v6M9 11V7a4 4 0 018 0v4m-4 6h.01"
              />
            </svg>
          </div>

          {/* Message */}
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">
            No Diagnosis History Yet
          </h3>
          <p className="text-slate-500 max-w-sm">
            Once you start submitting symptoms, your past diagnoses will appear
            here.
          </p>

          {/* Call-to-Action */}
          <Link
            to="/dashboard"
            className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-xl shadow hover:bg-cyan-600 transition"
          >
            Start New Diagnosis
          </Link>
        </div>
      )}
    </div>
  );
};

export default DiagnosisHistory;
