import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const banners = [
  {
    tag: "Deal of the Day",
    title: "Fresh Organic Fruits",
    text: "Get up to 40% off on selected items",
    badge: "40% OFF",
    code: "ORGANIC40",
    href: "/search?keyword=fruit",
    className: "from-primary-600 to-primary-500",
    button: "text-primary-700",
  },
  {
    tag: "New Arrivals",
    title: "Exotic Vegetables",
    text: "Get up to 25% off on fresh picks",
    badge: "25% OFF",
    code: "FRESH25",
    href: "/search?keyword=vegetable",
    className: "from-orange-500 to-red-500",
    button: "text-orange-600",
  },
];

export default function PromoBanners() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {banners.map((b) => (
        <div
          key={b.title}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${b.className} p-8 text-white min-h-[15rem] flex flex-col justify-center`}
        >
          <span className="absolute -top-10 -right-10 size-40 rounded-full bg-white/10" />
          <span className="absolute -bottom-12 right-16 size-32 rounded-full bg-white/10" />
          <div className="relative">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold mb-3">
              {b.tag}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-1">{b.title}</h3>
            <p className="text-white/90 mb-4">
              {b.text} · <span className="font-bold">{b.badge}</span>
            </p>
            <p className="text-sm text-white/80 mb-5">
              Use code: <span className="font-bold">{b.code}</span>
            </p>
            <Link
              href={b.href}
              className={`inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold ${b.button} hover:bg-gray-100 transition-colors`}
            >
              Shop Now <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
