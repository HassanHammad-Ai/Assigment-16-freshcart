"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  IconArrowLeft,
  IconCash,
  IconCheck,
  IconCreditCard,
  IconInfoCircle,
  IconLoader2,
  IconLock,
  IconMapPin,
  IconPackage,
  IconPhone,
  IconPlus,
  IconShieldCheck,
  IconShoppingBag,
  IconShoppingCart,
  IconTruck,
} from "@tabler/icons-react";
import { ShippingAddressFormValues, shippingAddressSchema } from "../schemas/checkout.schema";
import { useCart } from "@/features/cart/hooks/useCart";
import { useAddresses } from "@/features/addresses/hooks/useAddresses";
import { useCreateCashOrder, useCreateCheckoutSession } from "@/features/orders/hooks/useOrders";
import { formatPrice, calcShipping, cn } from "@/lib/utils";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";

function SectionCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 flex items-center gap-3">
        <span className="size-10 rounded-xl bg-white/20 flex items-center justify-center">{icon}</span>
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="text-sm text-white/80">{subtitle}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

export default function CheckoutContent() {
  const router = useRouter();
  const { data: cart, isPending } = useCart();
  const { data: addressesData } = useAddresses();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  // "new" = fill in the form; otherwise the _id of a saved address.
  const [selectedAddress, setSelectedAddress] = useState<string>("new");
  const createCashOrder = useCreateCashOrder();
  const createCheckoutSession = useCreateCheckoutSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddressFormValues>({
    resolver: zodResolver(shippingAddressSchema),
  });

  if (isPending) return <Spinner className="py-32" />;

  if (!cart || cart.numOfCartItems === 0) {
    return (
      <div className="container py-16">
        <EmptyState
          icon={<IconShoppingCart size={40} stroke={1.5} />}
          title="Your cart is empty"
          description="Add some products before checking out."
          actionHref="/shop"
          actionLabel="Start Shopping"
        />
      </div>
    );
  }

  const savedAddresses = addressesData?.data ?? [];
  const usingSaved = selectedAddress !== "new";
  const isSubmitting = createCashOrder.isPending || createCheckoutSession.isPending;
  const shipping = calcShipping(cart.data.totalCartPrice);

  const placeOrder = (values: ShippingAddressFormValues) => {
    if (paymentMethod === "cash") {
      createCashOrder.mutate(
        { cartId: cart.cartId, shippingAddress: values },
        { onSuccess: () => router.push("/orders") }
      );
    } else {
      createCheckoutSession.mutate(
        {
          cartId: cart.cartId,
          shippingAddress: values,
          returnUrl: typeof window !== "undefined" ? window.location.origin : "",
        },
        {
          onSuccess: (data) => {
            window.location.href = data.session.url;
          },
        }
      );
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (usingSaved) {
      event.preventDefault();
      const saved = savedAddresses.find((a) => a._id === selectedAddress);
      if (saved) placeOrder({ details: saved.details, phone: saved.phone, city: saved.city });
      return;
    }
    handleSubmit(placeOrder)(event);
  };

  const count = cart.numOfCartItems;

  return (
    <div className="bg-gray-50/60">
      <div className="container py-8">
        <nav className="text-sm text-gray-500 mb-3">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-primary-600">Cart</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Checkout</span>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-primary-600 text-white flex items-center justify-center">
              <IconShoppingBag size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Complete Your Order</h1>
              <p className="text-sm text-gray-500">Review your items and complete your purchase</p>
            </div>
          </div>
          <Link href="/cart" className="flex items-center gap-1.5 text-sm text-primary-600 hover:underline">
            <IconArrowLeft size={14} />
            Back to Cart
          </Link>
        </div>

        <form onSubmit={onSubmit} noValidate className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <SectionCard
              icon={<IconMapPin size={20} />}
              title="Shipping Address"
              subtitle="Where should we deliver your order?"
            >
              {savedAddresses.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Saved Addresses</p>
                  <p className="text-xs text-gray-500 mb-3">Select a saved address or use a different one</p>
                  <div className="space-y-3">
                    {savedAddresses.map((addr) => (
                      <button
                        key={addr._id}
                        type="button"
                        onClick={() => setSelectedAddress(addr._id)}
                        className={cn(
                          "w-full flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors",
                          selectedAddress === addr._id
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-100 hover:border-gray-200"
                        )}
                      >
                        <span className="size-10 shrink-0 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                          <IconMapPin size={18} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-semibold text-gray-800">{addr.name}</span>
                          <span className="block text-sm text-gray-500 truncate">{addr.details}</span>
                          <span className="block text-xs text-gray-400">{addr.city} · {addr.phone}</span>
                        </span>
                        {selectedAddress === addr._id && (
                          <span className="size-6 rounded-full bg-primary-600 text-white flex items-center justify-center">
                            <IconCheck size={14} />
                          </span>
                        )}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setSelectedAddress("new")}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors",
                        selectedAddress === "new"
                          ? "border-primary-500 bg-primary-50"
                          : "border-dashed border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <span className="size-10 shrink-0 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                        <IconPlus size={18} />
                      </span>
                      <span>
                        <span className="block font-semibold text-gray-800">Use a different address</span>
                        <span className="block text-sm text-gray-500">Enter a new delivery address below</span>
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {!usingSaved && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-xl bg-primary-50 px-4 py-3 text-sm">
                    <IconInfoCircle size={18} className="text-primary-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-primary-800">Delivery Information</p>
                      <p className="text-primary-700">Please provide accurate details so your order arrives without delay.</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      className="form-control w-full"
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      {...register("city")}
                    />
                    {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="details"
                      rows={3}
                      className="form-control w-full resize-none"
                      placeholder="Street name, building number, floor, apartment..."
                      {...register("details")}
                    />
                    {errors.details && <p className="text-sm text-red-600 mt-1">{errors.details.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <IconPhone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="phone"
                        className="form-control w-full pl-9"
                        placeholder="01xxxxxxxxx"
                        {...register("phone")}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Egyptian mobile number (11 digits)</p>
                    {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
              )}
            </SectionCard>

            <SectionCard
              icon={<IconCreditCard size={20} />}
              title="Payment Method"
              subtitle="Choose how you'd like to pay"
            >
              <div className="space-y-3">
                {[
                  {
                    id: "cash" as const,
                    icon: IconCash,
                    title: "Cash on Delivery",
                    desc: "Pay when your order arrives at your doorstep",
                  },
                  {
                    id: "card" as const,
                    icon: IconCreditCard,
                    title: "Pay Online",
                    desc: "Secure payment with Visa, Mastercard or other cards",
                  },
                ].map(({ id, icon: Icon, title, desc }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={cn(
                      "w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-colors",
                      paymentMethod === id ? "border-primary-500 bg-primary-50" : "border-gray-100 hover:border-gray-200"
                    )}
                  >
                    <span className="size-11 shrink-0 rounded-xl bg-primary-600 text-white flex items-center justify-center">
                      <Icon size={22} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-gray-800">{title}</span>
                      <span className="block text-sm text-gray-500">{desc}</span>
                    </span>
                    {paymentMethod === id && (
                      <span className="size-6 rounded-full bg-primary-600 text-white flex items-center justify-center">
                        <IconCheck size={14} />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm">
                <IconShieldCheck size={18} className="text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Secure &amp; Encrypted</p>
                  <p className="text-gray-500">Your payment information is protected with industry-standard encryption.</p>
                </div>
              </div>
            </SectionCard>
          </div>

          <aside className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:sticky lg:top-24">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4">
              <h2 className="font-bold flex items-center gap-2">
                <IconShoppingBag size={18} /> Order Summary
              </h2>
              <p className="text-sm text-white/80">{count} {count === 1 ? "item" : "items"}</p>
            </div>

            <div className="p-6">
              <ul className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
                {cart.data.products.map((item) => (
                  <li key={item._id} className="flex items-center gap-3">
                    <span className="relative size-12 shrink-0 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center">
                      {item.product?.imageCover ? (
                        <Image src={item.product.imageCover} alt="" fill className="object-contain p-1" sizes="48px" />
                      ) : (
                        <IconPackage size={20} className="text-gray-300" />
                      )}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-gray-800 truncate">
                        {item.product?.title || "Product unavailable"}
                      </span>
                      <span className="block text-xs text-gray-500">{item.count} × {formatPrice(item.price)}</span>
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{formatPrice(item.price * item.count)}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1.5"><IconTruck size={14} /> Shipping</span>
                  <span className={shipping.isFree ? "text-primary-600 font-semibold" : ""}>
                    {shipping.isFree ? "FREE" : formatPrice(shipping.fee)}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-baseline mb-5">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary-600">{formatPrice(shipping.total)}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-primary-600 py-3.5 font-semibold text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <IconLoader2 className="animate-spin" size={18} /> : <IconLock size={18} />}
                {paymentMethod === "cash" ? "Place Order" : "Continue to Payment"}
              </button>

              <div className="mt-4 flex items-center justify-center gap-5 text-xs text-gray-500">
                <span className="flex items-center gap-1"><IconShieldCheck size={14} className="text-primary-600" /> Secure</span>
                <span className="flex items-center gap-1"><IconTruck size={14} className="text-blue-500" /> Fast Delivery</span>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
