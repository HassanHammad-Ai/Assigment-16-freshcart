"use client";

import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { useCategories } from "@/features/categories/hooks/useCategories";
import Spinner from "@/components/ui/Spinner";
import SectionTitle from "./SectionTitle";

export default function CategoriesSection() {
  const { data, isPending, isError } = useCategories();
  const categories = data?.data ?? [];

  if (isPending) return <Spinner />;
  if (isError || categories.length === 0) return null;

  return (
    <section>
      <SectionTitle
        title="Shop By"
        accent="Category"
        action={
          <Link href="/categories" className="flex items-center gap-1.5 text-primary-600 font-medium hover:underline">
            View All Categories <IconArrowRight size={16} />
          </Link>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.slice(0, 10).map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/${cat._id}`}
            className="group flex flex-col items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:border-primary-200 transition-all"
          >
            <div className="relative size-20 rounded-full overflow-hidden bg-gray-50 ring-4 ring-primary-50">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="80px"
              />
            </div>
            <span className="text-sm font-semibold text-gray-800 text-center line-clamp-1 group-hover:text-primary-600 transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
