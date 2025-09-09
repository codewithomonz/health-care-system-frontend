import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosIntance";
import type { User } from "./useAuth";

export const useAuthPersist = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axiosInstance
      .get<User>("/auth/me")
      .then((res) => {
        queryClient.setQueryData(["me"], res.data);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  }, [queryClient]);
};
