export interface AuthUser {
  name: string;
  email: string;
  role?: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: AuthUser;
  token: string;
}

export interface ForgetPasswordPayload {
  email: string;
}

export interface VerifyResetCodePayload {
  resetCode: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}
