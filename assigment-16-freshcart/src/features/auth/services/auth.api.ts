import { api } from "@/lib/axios";
import {
  AuthResponse,
  ForgetPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
  SignupPayload,
  VerifyResetCodePayload,
} from "../types/auth.types";

export const authApi = {
  signup: (payload: SignupPayload) =>
    api.post<AuthResponse>("/auth/signup", payload).then((res) => res.data),

  login: (payload: LoginPayload) =>
    api.post<AuthResponse>("/auth/signin", payload).then((res) => res.data),

  forgetPassword: (payload: ForgetPasswordPayload) =>
    api
      .post<{ statusMsg: string; message: string }>(
        "/auth/forgotPasswords",
        payload
      )
      .then((res) => res.data),

  verifyResetCode: (payload: VerifyResetCodePayload) =>
    api
      .post<{ status: string }>("/auth/verifyResetCode", payload)
      .then((res) => res.data),

  resetPassword: (payload: ResetPasswordPayload) =>
    api
      .put<{ token: string }>("/auth/resetPassword", payload)
      .then((res) => res.data),
};
