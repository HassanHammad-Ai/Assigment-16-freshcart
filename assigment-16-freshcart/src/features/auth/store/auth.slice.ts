import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/lib/constants";
import { AuthUser } from "../types/auth.types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  /** Becomes true once we've read localStorage on the client, so the UI
   * doesn't flash a "logged out" state during the very first render. */
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateFromStorage(state) {
      if (typeof window === "undefined") return;
      const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
      const userRaw = window.localStorage.getItem(AUTH_USER_KEY);
      state.token = token;
      state.user = userRaw ? (JSON.parse(userRaw) as AuthUser) : null;
      state.isInitialized = true;
    },
    setCredentials(
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isInitialized = true;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(AUTH_TOKEN_KEY, token);
        window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      }
      // Mirrored cookie lets the proxy (middleware) guard protected routes.
      Cookies.set(AUTH_TOKEN_KEY, token, { expires: 30, sameSite: "lax" });
    },
    logout(state) {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
        window.localStorage.removeItem(AUTH_USER_KEY);
      }
      Cookies.remove(AUTH_TOKEN_KEY);
    },
  },
});

export const { hydrateFromStorage, setCredentials, logout } =
  authSlice.actions;
export default authSlice.reducer;
