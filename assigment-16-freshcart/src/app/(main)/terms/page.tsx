import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using FreshCart, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, please do not use our platform.",
  },
  {
    title: "2. Account Registration",
    body: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.",
  },
  {
    title: "3. Orders & Payments",
    body: "All orders are subject to product availability. Prices are displayed in EGP and may change without notice. Payment can be made via cash on delivery or secure card payment at checkout.",
  },
  {
    title: "4. Shipping & Delivery",
    body: "Estimated delivery times are provided at checkout and may vary depending on your location and product availability. FreshCart is not responsible for delays caused by circumstances beyond our control.",
  },
  {
    title: "5. Returns & Refunds",
    body: "Eligible items may be returned within 14 days of delivery in their original condition. Refunds will be processed to the original payment method within 7-10 business days of receiving the returned item.",
  },
  {
    title: "6. Prohibited Conduct",
    body: "You agree not to misuse the platform, including attempting unauthorized access, submitting fraudulent orders, or interfering with the normal operation of the service.",
  },
  {
    title: "7. Changes to These Terms",
    body: "We may update these Terms of Service from time to time. Continued use of FreshCart after changes are posted constitutes your acceptance of the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Terms of Service</h1>
      <p className="text-gray-500 mb-10">Last updated: September 2026</p>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h2>
            <p className="text-gray-600 leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
