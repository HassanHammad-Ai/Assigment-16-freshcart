import Navbar from "@/components/layout/Navbar";
import TrustBar from "@/components/layout/TrustBar";
import Footer from "@/components/layout/Footer";

// The Figma auth screens (login, sign up, password reset) all sit inside the
// normal site chrome: top bar + navbar above, trust bar + footer below.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50/60">
        <div className="container py-10 lg:py-14">{children}</div>
      </main>
      <TrustBar />
      <Footer />
    </>
  );
}
