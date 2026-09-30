"use client";

import Link from "next/link";
import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCreditCard,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import logo from "@/assets/images/freshcart-logo.svg";
import { useAuth } from "@/features/auth/hooks/useAuth";

const linkClass = "text-slate-400 hover:text-primary-400 transition-colors";

export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer id="footer" className="bg-[#101828] text-slate-300 pt-12">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Link href="/" className="mb-5 inline-block rounded-lg bg-white px-3 py-1.5">
              <Image src={logo} alt="FreshCart" className="h-7 w-auto" />
            </Link>
            <p className="text-slate-400 text-sm mb-5 max-w-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From fashion to
              electronics, we bring you the best brands at competitive prices with a
              seamless shopping experience.
            </p>
            <ul className="space-y-2.5 text-sm text-slate-400 mb-5">
              <li className="flex items-center gap-2">
                <IconPhone size={15} className="text-primary-500" /> +1 (800) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <IconMail size={15} className="text-primary-500" /> support@freshcart.com
              </li>
              <li className="flex items-center gap-2">
                <IconMapPin size={15} className="text-primary-500" /> 123 Commerce Street, New York, NY 10001
              </li>
            </ul>
            <div className="flex gap-3">
              {[IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandYoutube].map(
                (Icon, i) => (
                  <span
                    key={i}
                    className="size-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary-600 hover:text-white cursor-pointer transition-colors"
                  >
                    <Icon size={16} />
                  </span>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop" className={linkClass}>All Products</Link></li>
              <li><Link href="/categories" className={linkClass}>Categories</Link></li>
              <li><Link href="/brands" className={linkClass}>Brands</Link></li>
              <li><Link href="/search?keyword=electronics" className={linkClass}>Electronics</Link></li>
              <li><Link href="/search?keyword=men" className={linkClass}>Men&apos;s Fashion</Link></li>
              <li><Link href="/search?keyword=women" className={linkClass}>Women&apos;s Fashion</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5">Account</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/profile" className={linkClass}>My Account</Link></li>
              <li><Link href="/orders" className={linkClass}>Order History</Link></li>
              <li><Link href="/wishlist" className={linkClass}>Wishlist</Link></li>
              <li><Link href="/cart" className={linkClass}>Shopping Cart</Link></li>
              {!isAuthenticated && (
                <>
                  <li><Link href="/login" className={linkClass}>Sign In</Link></li>
                  <li><Link href="/signup" className={linkClass}>Create Account</Link></li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact" className={linkClass}>Contact Us</Link></li>
              <li><Link href="/contact" className={linkClass}>Help Center</Link></li>
              <li><Link href="/contact" className={linkClass}>Shipping Info</Link></li>
              <li><Link href="/contact" className={linkClass}>Returns &amp; Refunds</Link></li>
              <li><Link href="/orders" className={linkClass}>Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-5">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy-policy" className={linkClass}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={linkClass}>Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className={linkClass}>Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><IconCreditCard size={16} /> Visa</span>
            <span className="flex items-center gap-1.5"><IconCreditCard size={16} /> Mastercard</span>
            <span className="flex items-center gap-1.5"><IconCreditCard size={16} /> PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
