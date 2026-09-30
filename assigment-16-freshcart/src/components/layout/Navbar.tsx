"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  IconChevronDown,
  IconHeadset,
  IconHeart,
  IconLogout,
  IconMail,
  IconMenu2,
  IconPhone,
  IconSearch,
  IconShoppingCart,
  IconTruck,
  IconUser,
  IconUserCircle,
  IconX,
} from "@tabler/icons-react";
import logo from "@/assets/images/freshcart-logo.svg";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/hooks/useCart";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeMobileMenu, toggleMobileMenu } from "@/store/ui.slice";

export default function Navbar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated, user, logout } = useAuth();
  const { data: cart } = useCart();
  const { data: wishlist } = useWishlist();
  const { data: categoriesData } = useCategories();
  const isMobileMenuOpen = useAppSelector((s) => s.ui.isMobileMenuOpen);
  const dispatch = useAppDispatch();

  const cartCount = cart?.numOfCartItems ?? 0;
  const wishlistCount = wishlist?.count ?? 0;
  const categories = categoriesData?.data ?? [];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    dispatch(closeMobileMenu());
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Top utility bar */}
      <div className="hidden lg:block border-b border-gray-100 bg-primary-50/40">
        <div className="container flex items-center justify-between py-2 text-xs text-gray-600">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <IconTruck size={15} className="text-primary-600" />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="hidden xl:flex items-center gap-1.5">
              New Arrivals Daily
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+18001234567" className="flex items-center gap-1.5 hover:text-primary-600">
              <IconPhone size={15} />
              +1 (800) 123-4567
            </a>
            <a href="mailto:support@freshcart.com" className="hidden xl:flex items-center gap-1.5 hover:text-primary-600">
              <IconMail size={15} />
              support@freshcart.com
            </a>
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="hover:text-primary-600">
                  {user?.name?.split(" ")[0] ?? "Account"}
                </Link>
                <button onClick={handleLogout} className="hover:text-primary-600">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-primary-600">Sign In</Link>
                <Link href="/signup" className="hover:text-primary-600">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main row: logo, nav links, search, wishlist/cart, sign in */}
      <div className="container flex items-center gap-4 lg:gap-8 py-3">
        <Link href="/" className="shrink-0">
          <Image src={logo} alt="FreshCart" className="h-8 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 shrink-0 font-medium text-gray-700">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-primary-600 transition-colors">
            Shop
          </Link>
          <div className="group/categories relative">
            <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
              Categories
              <IconChevronDown size={16} />
            </button>
            <ul className="hidden group-hover/categories:flex flex-col absolute z-50 top-7 left-0 rounded-lg bg-white shadow-xl border border-gray-100 w-56 max-h-96 overflow-y-auto py-2">
              {categories.slice(0, 8).map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={`/categories/${cat._id}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary-600 truncate"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/categories" className="block px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-gray-50">
                  View All Categories
                </Link>
              </li>
            </ul>
          </div>
          <Link href="/brands" className="hover:text-primary-600 transition-colors">
            Brands
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="relative hidden md:flex flex-1 max-w-md">
          <input
            type="text"
            className="w-full rounded-full border border-gray-200 bg-gray-50 pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-primary-400 focus:bg-white transition-colors"
            placeholder="Search for products, brands and more..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 size-8 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors"
            aria-label="Search"
          >
            <IconSearch size={16} />
          </button>
        </form>

        <button
          onClick={() => dispatch(toggleMobileMenu())}
          className="lg:hidden ml-auto size-10 rounded-full bg-primary-600 text-white flex items-center justify-center"
          aria-label="Open menu"
        >
          <IconMenu2 size={20} />
        </button>

        <div className="hidden lg:flex items-center gap-5 shrink-0 ml-auto">
          <div className="hidden xl:flex items-center gap-2 text-sm text-gray-500">
            <IconHeadset size={22} className="text-primary-600" />
            <div className="leading-tight">
              <p>Support</p>
              <p className="font-semibold text-gray-700">24/7 Help</p>
            </div>
          </div>

          <Link href="/wishlist" className="relative text-gray-600 hover:text-primary-600" aria-label="Wishlist">
            <IconHeart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 size-4.5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative text-gray-600 hover:text-primary-600" aria-label="Cart">
            <IconShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 size-4.5 rounded-full bg-primary-600 text-white text-[10px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link href="/profile" className="text-gray-600 hover:text-primary-600" aria-label="Account">
              <IconUserCircle size={24} />
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              <IconUser size={16} />
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile offcanvas menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => dispatch(closeMobileMenu())}
          ></div>

          <div className="fixed p-5 w-80 top-0 bottom-0 left-0 bg-white shadow-xl z-50 overflow-y-auto flex flex-col lg:hidden">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <Image src={logo} alt="FreshCart" className="h-8 w-auto" />
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
                onClick={() => dispatch(closeMobileMenu())}
              >
                <IconX size={20} />
              </button>
            </div>

            <form onSubmit={handleSearch} className="relative my-4">
              <input
                type="text"
                className="w-full rounded-full border border-gray-200 bg-gray-50 pl-4 pr-12 py-2.5 text-sm"
                placeholder="Search for products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 size-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
                <IconSearch size={16} />
              </button>
            </form>

            <ul className="space-y-1 border-b border-gray-200 pb-4">
              <li>
                <Link href="/" onClick={() => dispatch(closeMobileMenu())} className="block p-3 rounded-lg hover:bg-gray-100">Home</Link>
              </li>
              <li>
                <Link href="/shop" onClick={() => dispatch(closeMobileMenu())} className="block p-3 rounded-lg hover:bg-gray-100">Shop</Link>
              </li>
              <li>
                <Link href="/categories" onClick={() => dispatch(closeMobileMenu())} className="block p-3 rounded-lg hover:bg-gray-100">Categories</Link>
              </li>
              <li>
                <Link href="/brands" onClick={() => dispatch(closeMobileMenu())} className="block p-3 rounded-lg hover:bg-gray-100">Brands</Link>
              </li>
            </ul>

            <ul className="space-y-1 border-b border-gray-200 py-4">
              <li>
                <Link href="/wishlist" onClick={() => dispatch(closeMobileMenu())} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                  <IconHeart size={20} />
                  <span>Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}</span>
                </Link>
              </li>
              <li>
                <Link href="/cart" onClick={() => dispatch(closeMobileMenu())} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                  <IconShoppingCart size={20} />
                  <span>Cart ({cartCount})</span>
                </Link>
              </li>
            </ul>

            <ul className="space-y-1 pt-4">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link href="/profile" onClick={() => dispatch(closeMobileMenu())} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                      <IconUserCircle size={20} />
                      <span>{user?.name ?? "Account"}</span>
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left text-red-500">
                      <IconLogout size={20} />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className="flex gap-3">
                  <Link href="/login" onClick={() => dispatch(closeMobileMenu())} className="flex-1 text-center py-2.5 rounded-full bg-primary-600 text-white font-semibold">
                    Sign In
                  </Link>
                  <Link href="/signup" onClick={() => dispatch(closeMobileMenu())} className="flex-1 text-center py-2.5 rounded-full border border-primary-600 text-primary-600 font-semibold">
                    Sign Up
                  </Link>
                </li>
              )}
            </ul>

            <Link
              href="/contact"
              onClick={() => dispatch(closeMobileMenu())}
              className="mt-6 flex items-center gap-3 rounded-xl bg-primary-50 p-3"
            >
              <span className="size-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                <IconHeadset size={18} />
              </span>
              <span className="leading-tight">
                <span className="block text-xs text-gray-500">Need Help?</span>
                <span className="block text-sm font-semibold text-primary-700">Contact Support</span>
              </span>
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
