import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly, such as your name, email, phone number, and shipping address, as well as order history and payment details necessary to process transactions.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Your information is used to process orders, provide customer support, personalize your shopping experience, and send you updates about your orders or promotions you've opted into.",
  },
  {
    title: "3. Data Sharing",
    body: "We do not sell your personal data. Information may be shared with trusted third parties such as payment processors and delivery partners solely to fulfill your orders.",
  },
  {
    title: "4. Cookies",
    body: "FreshCart uses cookies and similar technologies to keep you signed in, remember your preferences, and understand how you use our platform.",
  },
  {
    title: "5. Data Security",
    body: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.",
  },
  {
    title: "6. Your Rights",
    body: "You may access, update, or request deletion of your personal information at any time from your account settings, or by contacting our support team.",
  },
  {
    title: "7. Changes to This Policy",
    body: "We may update this Privacy Policy periodically. We encourage you to review this page regularly for the latest information on our privacy practices.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
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
