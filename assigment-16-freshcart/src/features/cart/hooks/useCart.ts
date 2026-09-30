import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CartLineRef, cartApi, getLineProductId } from "../services/cart.api";
import { CartResponse } from "../types/cart.types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/axios";

const CART_KEY = ["cart"];

export function useCart() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: CART_KEY,
    queryFn: () => cartApi.getCart(),
    enabled: isAuthenticated,
  });
}

/** Rebuilds the cart's totals after we change a line locally. */
function withProducts(cart: CartResponse, products: CartResponse["data"]["products"]): CartResponse {
  return {
    ...cart,
    numOfCartItems: products.length,
    data: {
      ...cart.data,
      products,
      totalCartPrice: products.reduce((sum, line) => sum + line.price * line.count, 0),
    },
  };
}

// Every cart mutation updates the UI immediately (optimistic), rolls back if
// the server refuses, and always ends with a real re-fetch so what you see
// is what the server has.

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      // If the product is already in the cart, "add N more" must end up at
      // (current + N), so remember the current count before adding.
      let previous = 0;
      if (quantity > 1) {
        const before = await cartApi.getCart();
        previous =
          before.data.products.find((line) => getLineProductId(line) === productId)?.count ?? 0;
      }

      await cartApi.addToCart(productId);

      if (quantity > 1) {
        const after = await cartApi.getCart();
        const line = after.data.products.find((l) => getLineProductId(l) === productId);
        if (line) {
          return cartApi.updateItemCount({ productId, itemId: line._id }, previous + quantity);
        }
        return after;
      }
      return cartApi.getCart();
    },
    onSuccess: (cart, { quantity = 1 }) => {
      queryClient.setQueryData(CART_KEY, cart);
      toast.success(quantity > 1 ? `Added ${quantity} items to cart` : "Added to cart");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ref, count }: { ref: CartLineRef; count: number }) =>
      cartApi.updateItemCount(ref, count),
    onMutate: async ({ ref, count }) => {
      await queryClient.cancelQueries({ queryKey: CART_KEY });
      const snapshot = queryClient.getQueryData<CartResponse>(CART_KEY);
      if (snapshot) {
        queryClient.setQueryData(
          CART_KEY,
          withProducts(
            snapshot,
            snapshot.data.products.map((line) =>
              line._id === ref.itemId ? { ...line, count } : line
            )
          )
        );
      }
      return { snapshot };
    },
    onSuccess: (cart) => queryClient.setQueryData(CART_KEY, cart),
    onError: (error, _vars, context) => {
      if (context?.snapshot) queryClient.setQueryData(CART_KEY, context.snapshot);
      toast.error(getApiErrorMessage(error));
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ref: CartLineRef) => cartApi.removeItem(ref),
    onMutate: async (ref) => {
      await queryClient.cancelQueries({ queryKey: CART_KEY });
      const snapshot = queryClient.getQueryData<CartResponse>(CART_KEY);
      if (snapshot) {
        queryClient.setQueryData(
          CART_KEY,
          withProducts(
            snapshot,
            snapshot.data.products.filter((line) => line._id !== ref.itemId)
          )
        );
      }
      return { snapshot };
    },
    onSuccess: (cart) => {
      queryClient.setQueryData(CART_KEY, cart);
      toast.success("Item removed from cart");
    },
    onError: (error, _vars, context) => {
      if (context?.snapshot) queryClient.setQueryData(CART_KEY, context.snapshot);
      toast.error(getApiErrorMessage(error));
      queryClient.invalidateQueries({ queryKey: CART_KEY });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
      toast.success("Cart cleared");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useApplyCoupon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => cartApi.applyCoupon(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_KEY });
      toast.success("Coupon applied!");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
