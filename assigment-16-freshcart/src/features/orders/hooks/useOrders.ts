import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ordersApi } from "../services/orders.api";
import { ShippingAddress } from "../types/order.types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/axios";

export function useUserOrders() {
  const { userId, isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => ordersApi.getUserOrders(userId as string),
    enabled: isAuthenticated && Boolean(userId),
  });
}

export function useCreateCashOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      cartId,
      shippingAddress,
    }: {
      cartId: string;
      shippingAddress: ShippingAddress;
    }) => ordersApi.createCashOrder(cartId, shippingAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order placed successfully!");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: ({
      cartId,
      shippingAddress,
      returnUrl,
    }: {
      cartId: string;
      shippingAddress: ShippingAddress;
      returnUrl: string;
    }) => ordersApi.createCheckoutSession(cartId, shippingAddress, returnUrl),
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
