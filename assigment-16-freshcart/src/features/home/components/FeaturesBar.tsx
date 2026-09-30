import {
  IconArrowBackUp,
  IconHeadset,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";

const features = [
  { icon: IconTruckDelivery, title: "Free Shipping", desc: "On orders over 500 EGP", tint: "bg-blue-50 text-blue-600" },
  { icon: IconShieldCheck, title: "Secure Payment", desc: "100% secure transactions", tint: "bg-primary-50 text-primary-600" },
  { icon: IconArrowBackUp, title: "Easy Returns", desc: "14-day return policy", tint: "bg-orange-50 text-orange-500" },
  { icon: IconHeadset, title: "24/7 Support", desc: "Dedicated support team", tint: "bg-violet-50 text-violet-600" },
];

export default function FeaturesBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map(({ icon: Icon, title, desc, tint }) => (
        <div
          key={title}
          className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
        >
          <div className={`size-12 shrink-0 rounded-full flex items-center justify-center ${tint}`}>
            <Icon stroke={2} size={22} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-900">{title}</h3>
            <p className="text-xs text-gray-500">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
