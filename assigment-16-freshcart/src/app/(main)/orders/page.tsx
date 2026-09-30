"use client";

import Link from "next/link";
import { IconArrowLeft, IconPackage } from "@tabler/icons-react";
import { useUserOrders } from "@/features/orders/hooks/useOrders";
import OrderCard from "@/features/orders/components/OrderCard";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

export default function OrdersPage() {
  const { data, isPending, isError } = useUserOrders();
  const orders = [...(data ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (isPending) return <Spinner className="py-32" />;

  if (isError || orders.length === 0) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={<IconPackage size={40} stroke={1.5} />}
          title="No orders yet"
          description="When you place an order, it will show up here."
          actionHref="/shop"
          actionLabel="Start Shopping"
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
          <span className="text-gray-800">My Orders</span>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-primary-600 text-white flex items-center justify-center">
              <IconPackage size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-sm text-gray-500">Track and manage your {orders.length} {orders.length === 1 ? "order" : "orders"}</p>
            </div>
          </div>
          <Link href="/shop" className="flex items-center gap-1.5 text-sm text-primary-600 hover:underline">
            <IconArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <OrderCard key={order._id} order={order} defaultOpen={index === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}
