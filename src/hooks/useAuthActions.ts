// src/hooks/useAuthActions.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosIntance";

interface LoginPayload {
  hostpitalId: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  hostpitalId: string;
  password: string;
  passwordConfirmation: string;
}

export function useAuthActions() {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      queryClient.setQueryData(["me"], data.user);
      return data.user;
    },
  });

  const register = useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post("/auth/register", payload);
      return data;
    },
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    queryClient.removeQueries({ queryKey: ["me"] });
  };

  return {
    login: login.mutateAsync,
    loginStatus: login.status,
    loginError: login.error as Error | null,

    register: register.mutateAsync,
    registerStatus: register.status,
    registerError: register.error as Error | null,

    logout,
  };
}
