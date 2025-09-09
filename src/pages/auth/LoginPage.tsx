import { useState, useEffect } from "react";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useNavigate } from "react-router";

import AuthPageWrapper from "./_components/AuthPageWrapper";
import loginImage from "@/assets/images/login.png";
import logo from "@/assets/images/logo-2.png";
import AuthPageHeader from "./_components/AuthPageHeader";

export default function LoginPage() {
  const [hostpitalId, setHospitalId] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginStatus, loginError } = useAuthActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus === "success") {
      navigate("/dashboard", { replace: true });
    }
  }, [loginStatus, navigate]);

  return (
    <AuthPageWrapper image={loginImage}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await login({ hostpitalId, password });
          } catch (err) {
            console.log(err);
            // handled by loginError
          }
        }}
        className="w-full md:w-6/12 flex-1 h-screen bg-white/60 backdrop-blur-xl 
        border-white/30 flex flex-col gap-6 items-start justify-center shadow-lg"
      >
        <AuthPageHeader
          title="HealthAi"
          description="AI-driven health analysis, smarter and faster."
          image={logo}
        />

        <div className="flex flex-col gap-5 w-full px-8 md:px-20">
          <div>
            <label
              htmlFor="hospitalId"
              className="block text-sm font-medium mb-1"
            >
              Hospital-ID
            </label>
            <input
              id="hospitalId"
              type="text"
              placeholder="Enter your hospital-id"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              value={hostpitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
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

        <div className="px-8 md:px-20 w-full">
          {loginError && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {loginError.message || "Invalid hospital ID or password"}
            </p>
          )}

          <button
            type="submit"
            disabled={loginStatus === "pending"}
            className="w-[150px] bg-cyan-600 hover:bg-cyan-700 py-3 rounded-lg text-white text-lg font-medium transition disabled:opacity-50 mx-auto block"
          >
            {loginStatus === "pending" ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </AuthPageWrapper>
  );
}
