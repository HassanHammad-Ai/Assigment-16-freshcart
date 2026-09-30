import type { Metadata } from "next";
import { Suspense } from "react";
import ProductListing from "@/features/products/components/ProductListing";
import Spinner from "@/components/ui/Spinner";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProductListing title="Shop All Products" syncUrl />
    </Suspense>
  );
}
