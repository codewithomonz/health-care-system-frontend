import { createBrowserRouter } from "react-router";

import PublicLayout from "@/layout/PublicLayout";
import PrivateRoute from "@/layout/PrivateRoute";

import {
  LandingPage,
  LoginPage,
  SignupPage,
  Dashboard,
  NotFound,
  DiagnosisHistory,
  FeedbackPage,
  AdminPage,
  FeedbackListPage,
  SettingsPage,
  UsersPage,
} from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "diagnosis-history", element: <DiagnosisHistory /> },
      { path: "feedback", element: <FeedbackPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "user-feedback", element: <FeedbackListPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
