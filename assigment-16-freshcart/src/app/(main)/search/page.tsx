import type { Metadata } from "next";
import { Suspense } from "react";
import ProductListing from "@/features/products/components/ProductListing";
import Spinner from "@/components/ui/Spinner";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProductListing title="Search Results" syncUrl />
    </Suspense>
  );
}
