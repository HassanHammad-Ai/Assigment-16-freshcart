import Navbar from "@/components/layout/Navbar";
import TrustBar from "@/components/layout/TrustBar";
import Footer from "@/components/layout/Footer";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <TrustBar />
      <Footer />
    </>
  );
}
