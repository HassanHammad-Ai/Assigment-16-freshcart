import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { decodeJwtPayload } from "@/lib/jwt";
import { logout as logoutAction } from "../store/auth.slice";

export function useAuth() {
  const { user, token, isInitialized } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // The API doesn't include the user's id in the signin response body,
  // but it does embed it in the JWT payload.
  const userId = useMemo(() => {
    if (!token) return null;
    return decodeJwtPayload(token)?.id ?? null;
  }, [token]);

  return {
    user,
    token,
    userId,
    isAuthenticated: Boolean(token),
    isInitialized,
    logout: () => dispatch(logoutAction()),
  };
}
