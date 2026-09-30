import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { wishlistApi } from "../services/wishlist.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/axios";

const WISHLIST_KEY = ["wishlist"];

export function useWishlist() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: WISHLIST_KEY,
    queryFn: () => wishlistApi.getWishlist(),
    enabled: isAuthenticated,
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.addToWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEY });
      toast.success("Added to wishlist");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEY });
      toast.success("Removed from wishlist");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
