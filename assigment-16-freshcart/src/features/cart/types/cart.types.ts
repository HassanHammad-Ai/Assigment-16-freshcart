import { Product } from "@/features/products/types/product.types";

export interface CartItem {
  count: number;
  _id: string;
  // Occasionally a cart item's linked product can no longer be fully
  // resolved (e.g. removed from the catalog since it was added) -- the API
  // can return it null or missing some fields rather than dropping the
  // line item, so every field here is treated as possibly absent.
  product: Partial<Product> | null;
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  totalPriceAfterDiscount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
