"use client";

import Link from "next/link";
import { IconArrowLeft, IconShoppingCart, IconTrash } from "@tabler/icons-react";
import { useCart, useClearCart } from "@/features/cart/hooks/useCart";
import CartItemRow from "@/features/cart/components/CartItemRow";
import CartSummary from "@/features/cart/components/CartSummary";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

export default function CartPage() {
  const { data, isPending, isError } = useCart();
  const clearCart = useClearCart();

  if (isPending) return <Spinner className="py-32" />;

  if (isError || !data || data.numOfCartItems === 0) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={<IconShoppingCart size={40} stroke={1.5} />}
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet. Start shopping to fill it up!"
          actionHref="/shop"
          actionLabel="Start Shopping"
        />
      </div>
    );
  }

  const count = data.numOfCartItems;

  return (
    <div className="bg-gray-50/60">
      <div className="container py-8">
        <nav className="text-sm text-gray-500 mb-3">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Shopping Cart</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <div className="size-12 rounded-xl bg-primary-600 text-white flex items-center justify-center">
            <IconShoppingCart size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-sm text-gray-500">
              You have <span className="text-primary-600 font-semibold">{count} {count === 1 ? "item" : "items"}</span> in your cart
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {data.data.products.map((item) => (
                <CartItemRow key={item._id} item={item} />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <Link href="/shop" className="flex items-center gap-1.5 text-primary-600 hover:underline">
                <IconArrowLeft size={14} />
                Continue Shopping
              </Link>
              <button
                onClick={() => clearCart.mutate()}
                disabled={clearCart.isPending}
                className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 disabled:opacity-50"
              >
                <IconTrash size={14} />
                Clear all items
              </button>
            </div>
          </div>

          <CartSummary subtotal={data.data.totalCartPrice} itemCount={count} />
        </div>
      </div>
    </div>
  );
}
