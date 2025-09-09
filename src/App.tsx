import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthPersist } from "@/hooks/useAuthPersist";

import LandingPage from "./pages/LandingPage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Dashboard from "./pages/Dashboard";

import AdminPage from "@/pages/AdminPage";
// import DoctorPage from "@/pages/DoctorPage";
import Unauthorized from "@/pages/Unauthorized";
import PrivateRoute from "@/components/PrivateRoute";

const queryClient = new QueryClient();

function AppRoutes() {
  useAuthPersist();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute roles={["admin"]}>
            <AdminPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
