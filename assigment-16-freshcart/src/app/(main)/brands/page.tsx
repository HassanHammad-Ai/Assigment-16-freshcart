"use client";

import Image from "next/image";
import Link from "next/link";
import { IconTags } from "@tabler/icons-react";
import { useBrands } from "@/features/brands/hooks/useBrands";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/layout/PageHeader";

export default function BrandsPage() {
  const { data, isPending, isError } = useBrands();
  const brands = data?.data ?? [];

  return (
    <div>
      <PageHeader
        variant="purple"
        icon={<IconTags size={22} />}
        title="Top Brands"
        subtitle="Shop from your favorite brands"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Brands" }]}
      />

      <div className="container py-8">
        {isPending && <Spinner />}
        {isError && (
          <EmptyState title="Couldn't load brands" description="Please try again later." />
        )}
        {!isPending && !isError && brands.length === 0 && <EmptyState title="No brands found" />}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-lg hover:border-violet-200 transition-all"
            >
              <div className="relative w-full h-16">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
              <span className="text-xs font-medium text-gray-500 group-hover:text-violet-600 transition-colors">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
