import { Product } from "../types/product.types";
import ProductCard from "./ProductCard";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

export default function ProductGrid({
  products,
  isPending,
  isError,
  emptyMessage = "No products found. Try adjusting your filters.",
}: {
  products?: Product[];
  // Named after Tanstack Query's `isPending` (true whenever there's no data
  // yet) rather than `isLoading` (true only while a fetch is in flight).
  // The server render has no data AND isn't fetching, so `isLoading` alone
  // would be false there while `products` is still undefined -- that
  // mismatch between "no data" and "not loading" is what caused the
  // hydration warnings. `isPending` is true in both the server render and
  // the client's first render, so they agree until the real data arrives.
  isPending?: boolean;
  isError?: boolean;
  emptyMessage?: string;
}) {
  if (isPending) return <Spinner />;

  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        description="We couldn't load products right now. Please try again."
      />
    );
  }

  if (!products || products.length === 0) {
    return <EmptyState title="No products" description={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product} priority={index < 4} />
      ))}
    </div>
  );
}
