"use client";

import Image from "next/image";
import Link from "next/link";
import { IconCategory2 } from "@tabler/icons-react";
import { useCategories } from "@/features/categories/hooks/useCategories";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/layout/PageHeader";

export default function CategoriesPage() {
  const { data, isPending, isError } = useCategories();
  const categories = data?.data ?? [];

  return (
    <div>
      <PageHeader
        icon={<IconCategory2 size={22} />}
        title="All Categories"
        subtitle="Browse our wide range of product categories"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />

      <div className="container py-8 md:py-10">
        {isPending && <Spinner />}
        {isError && (
          <EmptyState title="Couldn't load categories" description="Please try again later." />
        )}
        {!isPending && !isError && categories.length === 0 && (
          <EmptyState title="No categories found" />
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat._id}`}
              className="group block bg-white rounded-2xl border border-gray-100 p-3 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
              <div className="pt-3 pb-1 text-center">
                <p className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-1">
                  {cat.name}
                </p>
                <p className="text-xs text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
