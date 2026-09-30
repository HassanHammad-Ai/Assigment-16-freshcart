import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/auth.api";
import {
  ForgetPasswordPayload,
  LoginPayload,
  ResetPasswordPayload,
  SignupPayload,
  VerifyResetCodePayload,
} from "../types/auth.types";

export function useSignupMutation() {
  return useMutation({
    mutationFn: (payload: SignupPayload) => authApi.signup(payload),
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
  });
}

export function useForgetPasswordMutation() {
  return useMutation({
    mutationFn: (payload: ForgetPasswordPayload) =>
      authApi.forgetPassword(payload),
  });
}

export function useVerifyResetCodeMutation() {
  return useMutation({
    mutationFn: (payload: VerifyResetCodePayload) =>
      authApi.verifyResetCode(payload),
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authApi.resetPassword(payload),
  });
}
