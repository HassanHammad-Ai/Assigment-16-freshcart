import { api } from "@/lib/axios";
import { AuthResponse, AuthUser } from "@/features/auth/types/auth.types";

export interface UpdateProfilePayload {
  name: string;
  email: string;
  phone: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export const accountApi = {
  // NOTE: verify this path against the Postman collection for this API --
  // it is not confirmed in the excerpt available at build time.
  updateProfile: (payload: UpdateProfilePayload) =>
    api.put<{ message: string; user: AuthUser }>("/users/updateMe/", payload).then((res) => res.data),

  // NOTE: same caveat as above.
  changePassword: (payload: ChangePasswordPayload) =>
    api
      .put<AuthResponse>("/users/changeMyPassword", payload)
      .then((res) => res.data),
};
