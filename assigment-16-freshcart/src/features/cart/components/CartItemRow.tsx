"use client";

import Image from "next/image";
import Link from "next/link";
import { IconMinus, IconPackageOff, IconPlus, IconTrash } from "@tabler/icons-react";
import { CartItem as CartItemType } from "../types/cart.types";
import { formatPrice } from "@/lib/utils";
import { useRemoveCartItem, useUpdateCartItem } from "../hooks/useCart";
import { toLineRef } from "../services/cart.api";

export default function CartItemRow({ item }: { item: CartItemType }) {
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const busy = updateItem.isPending || removeItem.isPending;

  // A cart line's product can occasionally fail to resolve (e.g. removed from
  // the catalog); render a clear "unavailable" state instead of blank UI.
  const product = item.product;
  const productId = product?._id;
  const title = product?.title || "Product unavailable";
  const image = product?.imageCover;
  const categoryName = product?.category?.name;
  const inStock = (product?.quantity ?? 0) > 0;

  const ref = toLineRef(item);

  const handleDecrease = () => {
    if (item.count <= 1) return;
    updateItem.mutate({ ref, count: item.count - 1 });
  };

  const handleIncrease = () => {
    updateItem.mutate({ ref, count: item.count + 1 });
  };

  const thumbnail = (
    <div className="relative size-24 shrink-0 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center">
      {image ? (
        <Image src={image} alt={title} fill className="object-contain p-2" sizes="96px" />
      ) : (
        <IconPackageOff className="text-gray-300" size={28} />
      )}
      {inStock && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
          ✓ In Stock
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
      {productId ? <Link href={`/product/${productId}`}>{thumbnail}</Link> : thumbnail}

      <div className="flex-1 min-w-0">
        {productId ? (
          <Link
            href={`/product/${productId}`}
            className="font-semibold text-gray-800 hover:text-primary-600 line-clamp-2"
          >
            {title}
          </Link>
        ) : (
          <p className="font-semibold text-gray-400 italic line-clamp-2">{title}</p>
        )}
        {categoryName && (
          <span className="inline-block mt-1 text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
            {categoryName}
          </span>
        )}
        <p className="mt-2 text-sm text-gray-500">
          <span className="font-bold text-primary-600 text-base">{formatPrice(item.price)}</span>{" "}
          per unit
        </p>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={handleDecrease}
            disabled={busy || item.count <= 1}
            className="size-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            <IconMinus size={14} />
          </button>
          <span className="w-8 text-center font-semibold">{item.count}</span>
          <button
            onClick={handleIncrease}
            disabled={busy}
            className="size-8 rounded-lg bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-50"
            aria-label="Increase quantity"
          >
            <IconPlus size={14} />
          </button>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 sm:self-stretch">
        <div className="sm:text-right">
          <p className="text-xs text-gray-400">Total</p>
          <p className="font-bold text-gray-900">{formatPrice(item.price * item.count)}</p>
        </div>
        <button
          onClick={() => removeItem.mutate(ref)}
          disabled={busy}
          className="size-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 disabled:opacity-50"
          aria-label="Remove item"
        >
          <IconTrash size={16} />
        </button>
      </div>
    </div>
  );
}
