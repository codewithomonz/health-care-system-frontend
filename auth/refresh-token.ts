import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add access token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 expired token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data.message === "TokenExpired"
    ) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh-tokens",
          { refreshToken }
        );

        localStorage.setItem("accessToken", res.data.accessToken);

        // retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token invalid, logging out...");
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
