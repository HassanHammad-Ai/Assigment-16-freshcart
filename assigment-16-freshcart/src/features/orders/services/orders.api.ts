import { api } from "@/lib/axios";
import { CheckoutSessionResponse, Order, ShippingAddress } from "../types/order.types";

export const ordersApi = {
  createCashOrder: (cartId: string, shippingAddress: ShippingAddress) =>
    api
      .post<Order>(`/orders/${cartId}`, { shippingAddress })
      .then((res) => res.data),

  createCheckoutSession: (
    cartId: string,
    shippingAddress: ShippingAddress,
    returnUrl: string
  ) =>
    api
      .post<CheckoutSessionResponse>(
        `/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
        { shippingAddress }
      )
      .then((res) => res.data),

  getUserOrders: (userId: string) =>
    api.get<Order[]>(`/orders/user/${userId}`).then((res) => res.data),
};
