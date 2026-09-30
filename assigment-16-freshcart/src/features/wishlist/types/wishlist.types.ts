import { Product } from "@/features/products/types/product.types";

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}

export interface WishlistMutationResponse {
  status: string;
  message: string;
  data: string[];
}
