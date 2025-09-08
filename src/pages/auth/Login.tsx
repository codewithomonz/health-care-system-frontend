import { useState } from "react";
import axios from "axios";
import AuthPageWrapper from "./_components/AuthPageWrapper";
import loginImage from "@/assets/images/login.png";
import logo from "@/assets/images/logo-2.png";
import AuthPageHeader from "./_components/AuthPageHeader";

export default function Login() {
  const [hostpitalId, setHospitalId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        hostpitalId,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      // Narrow unknown error safely and extract a message when possible
      let message = "Invalid email or password. Please try again.";

      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as { message?: string } | undefined;
        if (data?.message && typeof data.message === "string") {
          message = data.message;
        }
        console.error(err);
      } else if (err instanceof Error) {
        console.error(err);
        message = err.message;
      } else {
        console.error(err);
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageWrapper image={loginImage}>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-6/12 flex-1 h-screen bg-white/60 backdrop-blur-xl border-white/30 flex flex-col gap-6 items-start justify-center shadow-lg"
      >
        <AuthPageHeader
          title="HealthAi"
          description="Get instant AI-driven analysis of your symptoms, track your health, and connect with trusted professionals. Your health, smarter."
          image={logo}
        />

        <div className="flex flex-col gap-5 w-full px-8 md:px-20">
          <div>
            <label
              htmlFor="hostpitalId"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Hospital-ID
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your hostpital-id"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={hostpitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="px-8 md:px-20">
          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[150px] bg-cyan-600  hover:bg-cyan-700 py-3 rounded-lg text-white text-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </AuthPageWrapper>
  );
}
