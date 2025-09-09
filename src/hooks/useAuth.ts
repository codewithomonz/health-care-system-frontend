import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosIntance";

export interface User {
  id: number;
  name: string;
  hostpitalId: string;
  role: "admin" | "doctor" | "patient";
}

export const useAuth = () => {
  const { data, isLoading, error } = useQuery<User, Error>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosInstance.get<User>("/auth/me");
      return res.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return { user: data, isLoading, error };
};
