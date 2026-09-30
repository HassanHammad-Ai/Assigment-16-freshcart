"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IconCalendar,
  IconCash,
  IconChevronDown,
  IconClock,
  IconCreditCard,
  IconMapPin,
  IconPackage,
  IconPhone,
  IconReceipt,
  IconTruck,
} from "@tabler/icons-react";
import { Order } from "../types/order.types";
import { formatPrice, cn } from "@/lib/utils";

export default function OrderCard({ order, defaultOpen = false }: { order: Order; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const date = new Date(order.createdAt);
  // This API's orders carry a human-friendly numeric `id` alongside the Mongo
  // `_id` string -- they are not interchangeable.
  const orderNumber = typeof order.id === "number" ? order.id : order._id?.slice(-6) ?? "------";
  const items = order.cartItems ?? [];
  const itemCount = items.reduce((sum, item) => sum + item.count, 0);
  const first = items[0]?.product;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.count, 0);
  const isCard = order.paymentMethodType === "card";

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 flex flex-wrap items-center gap-4">
        <div className="relative size-16 shrink-0 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center">
          {first?.imageCover ? (
            <Image src={first.imageCover} alt={first.title ?? ""} fill className="object-contain p-1.5" sizes="64px" />
          ) : (
            <IconPackage className="text-gray-300" size={26} />
          )}
          {items.length > 1 && (
            <span className="absolute -top-0 -right-0 rounded-bl-lg bg-gray-900 text-white text-[10px] font-semibold px-1.5 py-0.5">
              +{items.length - 1}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-[12rem]">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full",
                order.isDelivered ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
              )}
            >
              {order.isDelivered ? <IconTruck size={13} /> : <IconClock size={13} />}
              {order.isDelivered ? "Delivered" : "Processing"}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              {isCard ? <IconCreditCard size={13} /> : <IconCash size={13} />}
              {order.isPaid ? "Paid" : isCard ? "Card" : "Cash on Delivery"}
            </span>
          </div>
          <h3 className="font-bold text-gray-900">#{orderNumber}</h3>
          <p className="text-xs text-gray-500 flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
            <span className="flex items-center gap-1">
              <IconCalendar size={13} />
              {date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1"><IconPackage size={13} /> {itemCount} {itemCount === 1 ? "item" : "items"}</span>
            {order.shippingAddress?.city && (
              <span className="flex items-center gap-1"><IconMapPin size={13} /> {order.shippingAddress.city}</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <p className="text-xl font-bold text-gray-900">
            {new Intl.NumberFormat("en-US").format(order.totalOrderPrice)}{" "}
            <span className="text-xs font-medium text-gray-400">EGP</span>
          </p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Details
            <IconChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 p-5 space-y-5 bg-gray-50/40">
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <IconPackage size={16} className="text-primary-600" /> Order Items
            </h4>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item._id} className="flex items-center gap-3 rounded-xl bg-white border border-gray-100 p-3">
                  <span className="relative size-12 shrink-0 rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center">
                    {item.product?.imageCover ? (
                      <Image src={item.product.imageCover} alt="" fill className="object-contain p-1" sizes="48px" />
                    ) : (
                      <IconPackage size={18} className="text-gray-300" />
                    )}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-gray-800 truncate">
                      {item.product?.title || "Product unavailable"}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {item.count} × {formatPrice(item.price)}
                    </span>
                  </span>
                  <span className="font-semibold text-gray-800 text-sm">{formatPrice(item.price * item.count)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl bg-white border border-gray-100 p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <IconMapPin size={16} className="text-primary-600" /> Delivery Address
              </h4>
              <p className="text-sm font-medium text-gray-800">{order.shippingAddress?.city}</p>
              <p className="text-sm text-gray-500">{order.shippingAddress?.details}</p>
              {order.shippingAddress?.phone && (
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  <IconPhone size={14} /> {order.shippingAddress.phone}
                </p>
              )}
            </div>

            <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <IconReceipt size={16} className="text-amber-600" /> Order Summary
              </h4>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt>Shipping</dt>
                  <dd>{order.shippingPrice ? formatPrice(order.shippingPrice) : "Free"}</dd>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-amber-200">
                  <dt>Total</dt>
                  <dd>{formatPrice(order.totalOrderPrice)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
