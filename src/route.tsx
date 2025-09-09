import { createBrowserRouter } from "react-router";

import PublicLayout from "@/layout/PublicLayout";
import PrivateRoute from "@/layout/PrivateRoute";

import {
  LandingPage,
  LoginPage,
  SignupPage,
  Dashboard,
  NotFound,
} from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <SignupPage /> },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [{ path: "dashboard", element: <Dashboard /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
