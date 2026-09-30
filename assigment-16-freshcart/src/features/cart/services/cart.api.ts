import axios from "axios";
import { apiV2 } from "@/lib/axios";
import { CartItem, CartResponse } from "../types/cart.types";

/**
 * Identifies one line in the cart.
 *
 * The cart (v2) endpoints identify a line by the *product* id, not by the
 * cart line's own `_id`. Sending the line `_id` is what produced
 * "No Product Cart item found for this id: ..." on every +/- click, made
 * "delete" look successful while nothing was removed, and stopped the
 * quantity picker on the product page from working. We therefore try the
 * product id first, and only fall back to the line `_id` if the server says
 * it doesn't know the first one.
 */
export interface CartLineRef {
  productId?: string;
  itemId: string;
}

/** Product id of a cart line, whether the API populated `product` or not. */
export function getLineProductId(item: CartItem): string | undefined {
  const product = item.product as unknown;
  if (typeof product === "string") return product;
  return (product as { _id?: string } | null)?._id;
}

export function toLineRef(item: CartItem): CartLineRef {
  return { productId: getLineProductId(item), itemId: item._id };
}

function candidateIds(ref: CartLineRef): string[] {
  return [ref.productId, ref.itemId].filter(
    (id, index, all): id is string => Boolean(id) && all.indexOf(id) === index
  );
}

function isNotFound(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 404;
}

const EMPTY_CART: CartResponse = {
  status: "success",
  numOfCartItems: 0,
  cartId: "",
  data: {
    _id: "",
    cartOwner: "",
    products: [],
    totalCartPrice: 0,
    createdAt: "",
    updatedAt: "",
  },
};

async function getCart(): Promise<CartResponse> {
  try {
    const res = await apiV2.get<CartResponse>("/cart");
    return res.data;
  } catch (error) {
    // A user who has never added anything (or just cleared the cart) can get
    // a 404 -- that simply means "empty cart", not a failure.
    if (isNotFound(error)) return EMPTY_CART;
    throw error;
  }
}

export const cartApi = {
  getCart,

  addToCart: (productId: string) =>
    apiV2.post<CartResponse>("/cart", { productId }).then((res) => res.data),

  /** Sets a line's quantity to an exact `count`. */
  async updateItemCount(ref: CartLineRef, count: number): Promise<CartResponse> {
    let lastError: unknown;
    for (const id of candidateIds(ref)) {
      try {
        await apiV2.put<CartResponse>(`/cart/${id}`, { count });
        return await getCart();
      } catch (error) {
        if (!isNotFound(error)) throw error;
        lastError = error;
      }
    }
    throw lastError ?? new Error("Couldn't update this item.");
  },

  /** Removes a line and returns the fresh cart. Verifies it is really gone. */
  async removeItem(ref: CartLineRef): Promise<CartResponse> {
    let lastError: unknown;
    for (const id of candidateIds(ref)) {
      try {
        await apiV2.delete(`/cart/${id}`);
      } catch (error) {
        if (!isNotFound(error)) throw error;
        lastError = error;
        continue;
      }
      const cart = await getCart();
      const stillThere = cart.data.products.some((line) => line._id === ref.itemId);
      if (!stillThere) return cart;
    }
    throw lastError ?? new Error("We couldn't remove this item. Please try again.");
  },

  clearCart: () =>
    apiV2.delete<{ message: string }>("/cart").then((res) => res.data),

  applyCoupon: (code: string) =>
    apiV2
      .put<CartResponse>("/cart/applyCoupon", { coupon: code })
      .then((res) => res.data),
};
