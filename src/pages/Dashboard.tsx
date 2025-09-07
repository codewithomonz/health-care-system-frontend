import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);

  const analyzeSymptoms = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/symptoms/diagnose",
        { symptoms: symptoms.split(",") },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Error analyzing symptoms");
    }
  };

  return (
    <div className="min-h-screen p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <textarea
        placeholder="Enter your symptoms separated by commas..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="w-full max-w-2xl h-32 p-4 rounded-lg bg-white/20 text-white"
      />
      <button
        onClick={analyzeSymptoms}
        className="mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-lg"
      >
        Analyze Symptoms
      </button>
      {result && (
        <div className="mt-10 bg-white/10 p-6 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-3">Analysis Result:</h2>
          <pre className="text-left whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
