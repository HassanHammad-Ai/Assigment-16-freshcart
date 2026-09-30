import { CartItem } from "@/features/cart/types/cart.types";

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Order {
  _id: string;
  // This API's orders have a human-friendly numeric order number here, not a
  // string -- don't call string methods (.slice, etc.) on it directly.
  id: number;
  cartItems: CartItem[];
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutSessionResponse {
  status: string;
  session: { url: string; id: string };
}
