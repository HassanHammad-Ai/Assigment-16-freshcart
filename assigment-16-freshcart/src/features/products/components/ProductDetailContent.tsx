"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  IconChevronRight,
  IconCheck,
  IconHeart,
  IconHeartFilled,
  IconLoader2,
  IconMinus,
  IconPlus,
  IconRotate2,
  IconShare,
  IconShieldCheck,
  IconShoppingCartPlus,
  IconTruck,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { useProduct } from "../hooks/useProducts";
import ProductGallery from "./ProductGallery";
import RatingStars from "@/components/ui/RatingStars";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import RelatedProducts from "./RelatedProducts";
import { calcDiscountPercent, cn, formatPrice } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "@/features/wishlist/hooks/useWishlist";

type Tab = "details" | "reviews" | "shipping";

export default function ProductDetailContent({ productId }: { productId: string }) {
  const router = useRouter();
  const { data: product, isPending, isError } = useProduct(productId);
  const { isAuthenticated } = useAuth();
  const { data: wishlist } = useWishlist();
  const addToCart = useAddToCart();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<Tab>("details");

  if (isPending) return <Spinner className="py-32" />;
  if (isError || !product) {
    return (
      <EmptyState
        title="Product not found"
        description="This product may have been removed."
        actionHref="/shop"
        actionLabel="Back to Shop"
      />
    );
  }

  const inStock = product.quantity > 0;
  const isInWishlist = Boolean(wishlist?.data?.some((p) => p._id === product._id));
  const discount = calcDiscountPercent(product.price, product.priceAfterDiscount);
  const unitPrice = product.priceAfterDiscount ?? product.price;
  const maxQuantity = Math.max(1, product.quantity || 99);

  const requireAuth = () => {
    toast.info("Please sign in first");
    router.push(`/login?redirect=/product/${product._id}`);
  };

  // The quantity picker is honoured in one go: the hook adds the product and
  // then sets the line to the exact amount, so choosing 2 really adds 2.
  const handleAddToCart = () => {
    if (!isAuthenticated) return requireAuth();
    addToCart.mutate({ productId: product._id, quantity });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) return requireAuth();
    addToCart.mutate(
      { productId: product._id, quantity },
      { onSuccess: () => router.push("/checkout") }
    );
  };

  const handleToggleWishlist = () => {
    if (!isAuthenticated) return requireAuth();
    if (isInWishlist) removeFromWishlist.mutate(product._id);
    else addToWishlist.mutate(product._id);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      /* the user dismissed the share sheet */
    }
  };

  const info: [string, string][] = [
    ["Category", product.category?.name ?? "-"],
    ["Subcategory", product.subcategory?.[0]?.name ?? "-"],
    ["Brand", product.brand?.name ?? "-"],
    ["Items Sold", String(product.sold ?? 0)],
  ];

  const tabs: { id: Tab; label: string }[] = [
    { id: "details", label: "Product Details" },
    { id: "reviews", label: `Reviews (${product.ratingsQuantity ?? 0})` },
    { id: "shipping", label: "Shipping & Returns" },
  ];

  return (
    <div className="bg-gray-50/60">
      <div className="container py-6 md:py-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 mb-5">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <IconChevronRight size={14} />
          {product.category && (
            <>
              <Link href={`/categories/${product.category._id}`} className="hover:text-primary-600">
                {product.category.name}
              </Link>
              <IconChevronRight size={14} />
            </>
          )}
          <span className="text-gray-800 line-clamp-1">{product.title}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-8 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-12">
          <ProductGallery
            images={product.images?.length ? product.images : [product.imageCover]}
            title={product.title}
          />

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {product.category?.name && (
                <span className="text-xs font-medium bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                  {product.category.name}
                </span>
              )}
              {product.brand?.name && (
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {product.brand.name}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.title}</h1>

            <div className="flex flex-wrap items-center gap-3">
              <RatingStars rating={product.ratingsAverage} count={product.ratingsQuantity} size={18} />
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full",
                  inStock ? "bg-primary-50 text-primary-700" : "bg-red-50 text-red-600"
                )}
              >
                {inStock && <IconCheck size={12} />}
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 my-5">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(unitPrice)}</span>
              {discount && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.price)}</span>
                  <span className="bg-red-50 text-red-600 text-sm font-semibold px-2 py-1 rounded-full">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            <div className="mb-5">
              <span className="block text-sm font-semibold text-gray-700 mb-2">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="size-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <IconMinus size={16} />
                  </button>
                  <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                    disabled={quantity >= maxQuantity}
                    className="size-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <IconPlus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {inStock ? `${product.quantity} available` : "Out of stock"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-primary-50 px-5 py-3.5 mb-5">
              <span className="text-sm font-medium text-gray-600">Total Price:</span>
              <span className="text-xl font-bold text-primary-600">{formatPrice(unitPrice * quantity)}</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={addToCart.isPending || !inStock}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 font-semibold text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700 disabled:opacity-50"
              >
                {addToCart.isPending ? (
                  <IconLoader2 size={20} className="animate-spin" />
                ) : (
                  <IconShoppingCartPlus size={20} />
                )}
                {inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={addToCart.isPending || !inStock}
                className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={handleToggleWishlist}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {isInWishlist ? (
                  <IconHeartFilled size={18} className="text-red-500" />
                ) : (
                  <IconHeart size={18} />
                )}
                {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <IconShare size={18} />
                Share
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: IconTruck, title: "Free Delivery", desc: "Orders over 500 EGP" },
                { icon: IconRotate2, title: "30 Days Return", desc: "Money back guarantee" },
                { icon: IconShieldCheck, title: "Secure Payment", desc: "100% Protected" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <span className="size-9 shrink-0 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                    <Icon size={18} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-gray-800">{title}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 mt-6 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-100">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors",
                  tab === t.id
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {tab === "details" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">About this Product</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="rounded-xl bg-gray-50 p-5">
                    <h4 className="font-semibold text-gray-900 mb-3">Product Information</h4>
                    <dl className="space-y-2 text-sm">
                      {info.map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4">
                          <dt className="text-gray-500">{label}</dt>
                          <dd className="font-medium text-gray-800 text-right">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-5">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {[
                        "Premium Quality Product",
                        "100% Authentic Guarantee",
                        "Fast & Secure Packaging",
                        "Quality Assurance Certified",
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <IconCheck size={16} className="text-primary-600 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {tab === "reviews" && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="text-center sm:pr-8 sm:border-r border-gray-100">
                  <p className="text-5xl font-bold text-gray-900">{product.ratingsAverage.toFixed(1)}</p>
                  <div className="flex justify-center my-2">
                    <RatingStars rating={product.ratingsAverage} size={18} />
                  </div>
                  <p className="text-sm text-gray-500">Based on {product.ratingsQuantity} reviews</p>
                </div>
                <p className="text-gray-600 max-w-xl">
                  Customers rate this product {product.ratingsAverage.toFixed(1)} out of 5. Individual
                  written reviews are not available for this item yet.
                </p>
              </div>
            )}

            {tab === "shipping" && (
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div className="rounded-xl bg-gray-50 p-5">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <IconTruck size={18} className="text-primary-600" /> Shipping Information
                  </h4>
                  <ul className="space-y-2">
                    <li>Free shipping on orders of 500 EGP or more</li>
                    <li>Standard delivery within 2–5 business days</li>
                    <li>Cash on delivery available</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-gray-50 p-5">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <IconRotate2 size={18} className="text-primary-600" /> Returns &amp; Refunds
                  </h4>
                  <ul className="space-y-2">
                    <li>30-day money-back guarantee</li>
                    <li>Items must be unused and in original packaging</li>
                    <li>Refunds processed within 5–7 business days</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <RelatedProducts categoryId={product.category?._id} excludeProductId={product._id} />
      </div>
    </div>
  );
}
