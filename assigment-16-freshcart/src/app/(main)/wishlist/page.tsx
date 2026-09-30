"use client";

import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft, IconHeart, IconLoader2, IconPackageOff, IconShoppingCart, IconTrash } from "@tabler/icons-react";
import { useRemoveFromWishlist, useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import { Product } from "@/features/products/types/product.types";
import { calcDiscountPercent, formatPrice } from "@/lib/utils";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

function WishlistRow({ product }: { product: Product }) {
  const addToCart = useAddToCart();
  const remove = useRemoveFromWishlist();
  const inStock = product.quantity > 0;
  const price = product.priceAfterDiscount ?? product.price;
  const discounted = calcDiscountPercent(product.price, product.priceAfterDiscount) !== null;

  return (
    <tr className="border-t border-gray-100 max-md:flex max-md:flex-wrap max-md:items-center max-md:gap-3 max-md:p-4">
      <td className="py-4 px-6 max-md:p-0 max-md:w-full">
        <div className="flex items-center gap-4">
          <Link
            href={`/product/${product._id}`}
            className="relative size-16 shrink-0 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden"
          >
            <Image src={product.imageCover} alt={product.title} fill className="object-contain p-1.5" sizes="64px" />
          </Link>
          <div className="min-w-0">
            <Link
              href={`/product/${product._id}`}
              className="font-semibold text-gray-800 hover:text-primary-600 line-clamp-2"
            >
              {product.title}
            </Link>
            <p className="text-xs text-gray-400 mt-0.5">{product.category?.name}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 max-md:p-0">
        <p className="font-bold text-gray-900">{formatPrice(price)}</p>
        {discounted && <p className="text-xs text-gray-400 line-through">{formatPrice(product.price)}</p>}
      </td>
      <td className="py-4 px-6 max-md:p-0">
        <span
          className={
            inStock
              ? "inline-flex items-center gap-1 text-xs font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full"
              : "inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full"
          }
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </td>
      <td className="py-4 px-6 max-md:p-0 max-md:ml-auto">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => addToCart.mutate({ productId: product._id })}
            disabled={!inStock || addToCart.isPending}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {addToCart.isPending ? <IconLoader2 size={15} className="animate-spin" /> : <IconShoppingCart size={15} />}
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => remove.mutate(product._id)}
            disabled={remove.isPending}
            aria-label="Remove from wishlist"
            className="size-9 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center disabled:opacity-50"
          >
            {remove.isPending ? <IconLoader2 size={16} className="animate-spin" /> : <IconTrash size={17} />}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function WishlistPage() {
  const { data, isPending, isError } = useWishlist();

  if (isPending) return <Spinner className="py-32" />;

  if (isError || !data || data.count === 0) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={<IconHeart size={40} stroke={1.5} />}
          title="Your wishlist is empty"
          description="Save products you love here so you can find them easily later."
          actionHref="/shop"
          actionLabel="Discover Products"
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-50/60">
      <div className="container py-8">
        <nav className="text-sm text-gray-500 mb-3">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Wishlist</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <div className="size-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
            <IconHeart size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-sm text-gray-500">
              {data.count} {data.count === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="max-md:hidden">
              <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <th className="py-3 px-6 font-semibold">Product</th>
                <th className="py-3 px-6 font-semibold">Price</th>
                <th className="py-3 px-6 font-semibold">Status</th>
                <th className="py-3 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {data.data.map((product) =>
                product.imageCover ? (
                  <WishlistRow key={product._id} product={product} />
                ) : (
                  <tr key={product._id}>
                    <td colSpan={4} className="py-4 px-6 text-sm text-gray-400 flex items-center gap-2">
                      <IconPackageOff size={18} /> Product unavailable
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <Link href="/shop" className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary-600 hover:underline">
          <IconArrowLeft size={14} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
