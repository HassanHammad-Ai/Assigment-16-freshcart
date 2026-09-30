"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { useProducts } from "@/features/products/hooks/useProducts";
import ProductCard from "@/features/products/components/ProductCard";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import SectionTitle from "./SectionTitle";

export default function FeaturedProducts() {
  const { data, isPending, isError } = useProducts({ limit: 20, sort: "-sold" });
  const products = data?.data ?? [];

  return (
    <section>
      <SectionTitle
        title="Featured"
        accent="Products"
        action={
          <Link href="/shop" className="flex items-center gap-1.5 text-primary-600 font-medium hover:underline">
            View All <IconArrowRight size={16} />
          </Link>
        }
      />
      {isPending ? (
        <Spinner />
      ) : isError || products.length === 0 ? (
        <EmptyState title="No products" description="We couldn't load products right now. Please try again." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} priority={index < 5} />
          ))}
        </div>
      )}
    </section>
  );
}
