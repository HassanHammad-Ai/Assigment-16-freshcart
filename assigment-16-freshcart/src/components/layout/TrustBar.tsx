import {
  IconHeadset,
  IconRotate,
  IconShieldCheck,
  IconTruck,
} from "@tabler/icons-react";

const items = [
  { icon: IconTruck, title: "Free Shipping", desc: "On orders over 500 EGP" },
  { icon: IconRotate, title: "Easy Returns", desc: "14-day return policy" },
  { icon: IconShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: IconHeadset, title: "24/7 Support", desc: "Contact us anytime" },
];

export default function TrustBar() {
  return (
    <div className="bg-primary-50 py-6">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon size={22} className="text-primary-600 shrink-0" />
            <div className="leading-tight">
              <p className="font-semibold text-sm text-gray-800">{title}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
