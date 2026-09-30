import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addressesApi } from "../services/addresses.api";
import { AddressPayload } from "../types/address.types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/axios";

const ADDRESSES_KEY = ["addresses"];

export function useAddresses() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ADDRESSES_KEY,
    queryFn: () => addressesApi.getAll(),
    enabled: isAuthenticated,
  });
}

export function useAddAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddressPayload) => addressesApi.add(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY });
      toast.success("Address added");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useRemoveAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => addressesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY });
      toast.success("Address removed");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
