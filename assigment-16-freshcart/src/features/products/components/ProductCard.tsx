"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconHeart, IconHeartFilled, IconLoader2, IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";
import { Product } from "../types/product.types";
import RatingStars from "@/components/ui/RatingStars";
import { calcDiscountPercent, formatPrice } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "@/features/wishlist/hooks/useWishlist";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  /** Set for above-the-fold cards (e.g. the first row of a grid) so Next.js
   * loads that image eagerly instead of lazily -- avoids the "detected as
   * the Largest Contentful Paint" console warning for it. */
  priority?: boolean;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: wishlist } = useWishlist();
  const addToCart = useAddToCart();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const isInWishlist = Boolean(
    wishlist?.data?.some((p) => p._id === product._id)
  );
  const discount = calcDiscountPercent(product.price, product.priceAfterDiscount);
  const displayPrice = product.priceAfterDiscount ?? product.price;

  const requireAuth = () => {
    toast.info("Please sign in first");
    router.push("/login");
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) return requireAuth();
    addToCart.mutate({ productId: product._id });
  };

  const handleToggleWishlist = () => {
    if (!isAuthenticated) return requireAuth();
    if (isInWishlist) {
      removeFromWishlist.mutate(product._id);
    } else {
      addToWishlist.mutate(product._id);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      {discount && (
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
          -{discount}%
        </span>
      )}

      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 size-8 rounded-full bg-white shadow flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Toggle wishlist"
      >
        {isInWishlist ? (
          <IconHeartFilled size={16} className="text-red-500" />
        ) : (
          <IconHeart size={16} />
        )}
      </button>

      <Link href={`/product/${product._id}`} className="block">
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            priority={priority}
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        </div>
      </Link>

      <div className="p-3 flex flex-col gap-1 flex-1">
        <span className="text-xs text-primary-600">
          {product.category?.name}
        </span>
        <Link href={`/product/${product._id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-10 hover:text-primary-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <RatingStars rating={product.ratingsAverage} count={product.ratingsQuantity} size={13} />

        <div className="flex items-end justify-between mt-1">
          <div>
            <span className="font-bold text-gray-900">{formatPrice(displayPrice)}</span>
            {discount && (
              <span className="block text-xs text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={addToCart.isPending || product.quantity === 0}
            aria-label="Add to cart"
            className="size-8 shrink-0 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-70"
          >
            {addToCart.isPending ? (
              <IconLoader2 size={16} className="animate-spin" />
            ) : (
              <IconPlus size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
