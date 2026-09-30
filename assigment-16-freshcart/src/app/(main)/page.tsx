import HeroSlider from "@/features/home/components/HeroSlider";
import FeaturesBar from "@/features/home/components/FeaturesBar";
import CategoriesSection from "@/features/home/components/CategoriesSection";
import PromoBanners from "@/features/home/components/PromoBanners";
import FeaturedProducts from "@/features/home/components/FeaturedProducts";
import Newsletter from "@/features/home/components/Newsletter";

export default function HomePage() {
  return (
    <div className="container py-6 md:py-8 space-y-10 md:space-y-14">
      <HeroSlider />
      <FeaturesBar />
      <CategoriesSection />
      <PromoBanners />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
}
