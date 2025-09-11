import { useGetUserAnalysesQuery } from "@/features/symptoms/symptomsApiSlice";
import { type SymptomAnalysis } from "@/types/symptoms";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorMessage from "@/components/ErrorMessage";

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
        <p>No history yet</p>
      )}
    </div>
  );
};

export default DiagnosisHistory;
