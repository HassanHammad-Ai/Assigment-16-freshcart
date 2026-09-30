import type { Metadata } from "next";
import CheckoutContent from "@/features/checkout/components/CheckoutContent";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return <CheckoutContent />;
}
