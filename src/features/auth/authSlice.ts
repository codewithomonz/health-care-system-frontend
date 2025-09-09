import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface User {
  name: string;
  hostpitalId: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "hcs-user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      Cookies.set("hcs-token", token, { expires: 7 });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("hcs-token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
