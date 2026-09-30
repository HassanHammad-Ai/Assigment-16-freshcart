"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : ["/placeholder.png"];

  return (
    <div className="min-w-0">
      <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-100">
        <Image
          src={gallery[active]}
          alt={title}
          fill
          priority
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>
      {gallery.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {gallery.slice(0, 8).map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={cn(
                "relative aspect-square rounded-xl overflow-hidden border-2 bg-gray-50 transition-colors",
                i === active ? "border-primary-600" : "border-gray-100 hover:border-gray-300"
              )}
            >
              <Image src={img} alt="" fill className="object-contain p-1.5" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
