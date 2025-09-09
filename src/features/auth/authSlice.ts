import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface User {
  _id: string;
  name: string;
  hostpitalId: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
};

const authSlice = createSlice({
  name: "hcs-user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken, expiresAt } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expiresAt = expiresAt;

      // Save to cookies
      Cookies.set("hcs-access-token", accessToken, { expires: 7 });
      Cookies.set("hcs-refresh-token", refreshToken, { expires: 7 });
      Cookies.set("hcs-expires-at", expiresAt, { expires: 7 });
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expiresAt = expiresAt;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresAt = null;

      Cookies.remove("hcs-access-token");
      Cookies.remove("hcs-refresh-token");
      Cookies.remove("hcs-expires-at");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
