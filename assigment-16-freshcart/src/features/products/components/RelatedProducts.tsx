"use client";

import { useRef } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function RelatedProducts({
  categoryId,
  excludeProductId,
}: {
  categoryId: string;
  excludeProductId: string;
}) {
  const { data } = useProducts({ category: categoryId, limit: 12 });
  const scroller = useRef<HTMLDivElement>(null);
  const related = (data?.data ?? []).filter((p) => p._id !== excludeProductId);

  if (related.length === 0) return null;

  const scrollBy = (direction: 1 | -1) =>
    scroller.current?.scrollBy({
      left: direction * (scroller.current.clientWidth * 0.8),
      behavior: "smooth",
    });

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            You May Also <span className="text-primary-600">Like</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="size-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50"
          >
            <IconChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="size-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50"
          >
            <IconChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {related.map((product) => (
          <div
            key={product._id}
            className="snap-start shrink-0 basis-[calc(50%-0.5rem)] md:basis-[calc(33.333%-0.75rem)] lg:basis-[calc(20%-0.8rem)]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
