import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { accountApi, ChangePasswordPayload, UpdateProfilePayload } from "../services/account.api";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/features/auth/store/auth.slice";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/axios";

export function useUpdateProfile() {
  const dispatch = useAppDispatch();
  const { token } = useAuth();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => accountApi.updateProfile(payload),
    onSuccess: (data) => {
      if (token) dispatch(setCredentials({ user: data.user, token }));
      toast.success("Profile updated successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useChangePassword() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => accountApi.changePassword(payload),
    onSuccess: (data) => {
      dispatch(setCredentials({ user: data.user, token: data.token }));
      toast.success("Password changed successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
