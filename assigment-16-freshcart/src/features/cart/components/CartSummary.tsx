"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconLoader2,
  IconLock,
  IconShieldCheck,
  IconShoppingBag,
  IconTag,
  IconTruck,
} from "@tabler/icons-react";
import { calcShipping, formatPrice } from "@/lib/utils";
import { useApplyCoupon } from "../hooks/useCart";

export default function CartSummary({
  subtotal,
  itemCount,
  checkoutHref = "/checkout",
}: {
  subtotal: number;
  itemCount: number;
  checkoutHref?: string;
}) {
  const shipping = calcShipping(subtotal);
  const applyCoupon = useApplyCoupon();
  const [showPromo, setShowPromo] = useState(false);
  const [code, setCode] = useState("");

  const handleApply = (e: FormEvent) => {
    e.preventDefault();
    if (code.trim()) applyCoupon.mutate(code.trim());
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-fit sticky top-24 shadow-sm">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <IconShoppingBag size={20} />
          Order Summary
        </h2>
        <p className="text-sm text-white/80">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="p-6">
        {shipping.isFree ? (
          <div className="flex items-start gap-3 bg-primary-50 text-primary-800 rounded-xl px-4 py-3 mb-5">
            <IconTruck size={20} className="shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold">Free Shipping!</p>
              <p className="text-primary-700">You qualify for free delivery</p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 bg-amber-50 text-amber-800 rounded-xl px-4 py-3 mb-5">
            <IconTruck size={20} className="shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold">Almost there!</p>
              <p>Add {formatPrice(shipping.amountToFreeShipping)} more to get free shipping</p>
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className={shipping.isFree ? "text-primary-600 font-semibold" : "font-medium"}>
              {shipping.isFree ? "FREE" : formatPrice(shipping.fee)}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-baseline">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">{formatPrice(shipping.total)}</span>
        </div>

        {showPromo ? (
          <form onSubmit={handleApply} className="mt-5 flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Promo code"
              className="flex-1 min-w-0 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-primary-400"
            />
            <button
              type="submit"
              disabled={applyCoupon.isPending}
              className="px-4 rounded-lg bg-gray-900 text-white text-sm font-semibold disabled:opacity-50 flex items-center gap-1"
            >
              {applyCoupon.isPending && <IconLoader2 size={14} className="animate-spin" />}
              Apply
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setShowPromo(true)}
            className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <IconTag size={16} />
            Apply Promo Code
          </button>
        )}

        <Link
          href={checkoutHref}
          className="mt-3 w-full rounded-xl bg-primary-600 text-white py-3 font-semibold hover:bg-primary-700 flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20"
        >
          <IconLock size={18} />
          Secure Checkout
        </Link>

        <div className="mt-4 flex items-center justify-center gap-5 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <IconShieldCheck size={14} className="text-primary-600" />
            Secure Payment
          </span>
          <span className="flex items-center gap-1">
            <IconTruck size={14} className="text-blue-500" />
            Fast Delivery
          </span>
        </div>

        <Link
          href="/shop"
          className="mt-4 flex items-center justify-center gap-1.5 text-sm text-primary-600 hover:underline"
        >
          <IconArrowLeft size={14} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
