import { api } from "@/lib/axios";
import { WishlistMutationResponse, WishlistResponse } from "../types/wishlist.types";

export const wishlistApi = {
  getWishlist: () =>
    api.get<WishlistResponse>("/wishlist").then((res) => res.data),

  addToWishlist: (productId: string) =>
    api
      .post<WishlistMutationResponse>("/wishlist", { productId })
      .then((res) => res.data),

  removeFromWishlist: (productId: string) =>
    api
      .delete<WishlistMutationResponse>(`/wishlist/${productId}`)
      .then((res) => res.data),
};
