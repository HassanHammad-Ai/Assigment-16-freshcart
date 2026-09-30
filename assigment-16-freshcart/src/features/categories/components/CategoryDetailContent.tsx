"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useCategory } from "@/features/categories/hooks/useCategories";
import ProductListing from "@/features/products/components/ProductListing";
import Spinner from "@/components/ui/Spinner";

export default function CategoryDetailContent({ categoryId }: { categoryId: string }) {
  const { data: category } = useCategory(categoryId);

  return (
    <div>
      {category && (
        <div className="bg-gray-100">
          <div className="container py-8 flex items-center gap-6">
            <div className="relative size-20 rounded-full overflow-hidden bg-white shrink-0">
              <Image src={category.image} alt={category.name} fill className="object-cover" sizes="80px" />
            </div>
            <div>
              <p className="text-sm text-primary-600 font-medium">Category</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{category.name}</h1>
            </div>
          </div>
        </div>
      )}
      <Suspense fallback={<Spinner />}>
        <ProductListing lockedCategory={categoryId} />
      </Suspense>
    </div>
  );
}
