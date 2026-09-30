"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useBrand } from "@/features/brands/hooks/useBrands";
import ProductListing from "@/features/products/components/ProductListing";
import Spinner from "@/components/ui/Spinner";

export default function BrandDetailContent({ brandId }: { brandId: string }) {
  const { data: brand } = useBrand(brandId);

  return (
    <div>
      {brand && (
        <div className="bg-gray-100">
          <div className="container py-8 flex items-center gap-6">
            <div className="relative size-20 rounded-xl overflow-hidden bg-white shrink-0 p-2">
              <Image src={brand.image} alt={brand.name} fill className="object-contain" sizes="80px" />
            </div>
            <div>
              <p className="text-sm text-primary-600 font-medium">Brand</p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{brand.name}</h1>
            </div>
          </div>
        </div>
      )}
      <Suspense fallback={<Spinner />}>
        <ProductListing lockedBrand={brandId} />
      </Suspense>
    </div>
  );
}
