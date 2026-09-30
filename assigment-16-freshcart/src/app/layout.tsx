import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";

// DESIGN.md (extracted from the Figma file) specifies Exo as the dominant
// typeface across the type scale (headings and most body text).
// Self-hosted (rather than next/font/google) so the build never depends on
// reaching fonts.googleapis.com at build time.
const exo = localFont({
  src: "../assets/fonts/Exo-Variable.ttf",
  variable: "--font-exo",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "FreshCart - Fresh Products Delivered to Your Door",
    template: "%s | FreshCart",
  },
  description:
    "FreshCart is a versatile e-commerce platform offering a wide range of products, from fashion to electronics.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${exo.variable}`}
      data-scroll-behavior="smooth"
    >
      {/* suppressHydrationWarning: some browser extensions (e.g. ColorZilla)
          inject attributes like cz-shortcut-listen onto <body> before React
          hydrates. That's the extension's DOM, not ours -- nothing to fix on
          our end, so we tell React not to warn about it. */}
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
