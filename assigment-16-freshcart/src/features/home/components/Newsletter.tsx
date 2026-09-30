"use client";

import { FormEvent, useState } from "react";
import { IconBrandAndroid, IconBrandApple, IconMailFilled, IconTruck, IconDiscount2, IconBell } from "@tabler/icons-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thanks for subscribing! Check your inbox for updates.");
    setEmail("");
  };

  return (
    <section className="rounded-3xl bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-6 md:p-12 grid lg:grid-cols-[3fr_2fr] gap-8 items-center shadow-sm">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 mb-4">
          <IconMailFilled size={14} /> Newsletter
        </span>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
          Get the Freshest Updates <span className="text-primary-600">Delivered Free</span>
        </h2>
        <p className="text-gray-600 mb-5 max-w-lg">
          Weekly recipes, seasonal offers and exclusive member-only deals straight to your inbox.
        </p>
        <div className="flex flex-wrap gap-3 mb-6 text-sm text-gray-700">
          <span className="flex items-center gap-2 rounded-full bg-white border border-gray-100 px-3 py-1.5"><IconDiscount2 size={16} className="text-primary-600" /> Weekly deals</span>
          <span className="flex items-center gap-2 rounded-full bg-white border border-gray-100 px-3 py-1.5"><IconTruck size={16} className="text-primary-600" /> Free delivery alerts</span>
          <span className="flex items-center gap-2 rounded-full bg-white border border-gray-100 px-3 py-1.5"><IconBell size={16} className="text-primary-600" /> New arrivals</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
          <button
            type="submit"
            className="rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-colors"
          >
            Subscribe →
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-3">✓ No spam, unsubscribe anytime</p>
      </div>

      <div className="rounded-2xl bg-[#101828] p-6 md:p-8 text-white">
        <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Mobile App</span>
        <h3 className="text-xl md:text-2xl font-bold mt-2 mb-2">Shop Faster on Our App</h3>
        <p className="text-sm text-slate-400 mb-5">
          Get app-exclusive deals and track your orders in real time.
        </p>
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => toast.info("The mobile app is coming soon.")}
            className="w-full flex items-center gap-3 rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-left hover:bg-white/15 transition-colors"
          >
            <IconBrandApple size={26} />
            <span className="leading-tight">
              <span className="block text-[11px] text-slate-400">Download on the</span>
              <span className="block font-semibold">App Store</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => toast.info("The mobile app is coming soon.")}
            className="w-full flex items-center gap-3 rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-left hover:bg-white/15 transition-colors"
          >
            <IconBrandAndroid size={26} />
            <span className="leading-tight">
              <span className="block text-[11px] text-slate-400">Get it on</span>
              <span className="block font-semibold">Google Play</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
