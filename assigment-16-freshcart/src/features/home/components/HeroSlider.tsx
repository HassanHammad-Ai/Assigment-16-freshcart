"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "swiper/css";
import "swiper/css/pagination";
import heroImage from "@/assets/images/home-slider-1.png";

const slides = [
  {
    id: 1,
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    primary: { label: "Shop Now", href: "/shop" },
    secondary: { label: "View Deals", href: "/search?keyword=sale" },
    gradient: "from-primary-700/95 via-primary-600/85 to-primary-500/60",
    image: heroImage,
  },
  {
    id: 2,
    title: "Discover Top Brands",
    subtitle: "Everything you love, all in one place",
    primary: { label: "Explore Brands", href: "/brands" },
    secondary: { label: "Shop All", href: "/shop" },
    gradient: "from-primary-800 via-primary-700 to-primary-500",
  },
  {
    id: 3,
    title: "New Arrivals Every Week",
    subtitle: "Be the first to grab the freshest picks",
    primary: { label: "Browse Categories", href: "/categories" },
    secondary: { label: "View Deals", href: "/search?keyword=sale" },
    gradient: "from-emerald-800 via-emerald-700 to-emerald-500",
  },
];

export default function HeroSlider() {
  return (
    <div className="relative group">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        pagination={{ clickable: true }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="rounded-2xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-72 md:h-[26rem] flex items-center bg-primary-700">
              {slide.image && (
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={slide.id === 1}
                  sizes="100vw"
                  className="object-cover"
                />
              )}
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
              <div className="relative px-8 md:px-20 text-white max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-3">{slide.title}</h2>
                <p className="text-lg md:text-xl text-white/90 mb-7">{slide.subtitle}</p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={slide.primary.href}
                    className="rounded-xl bg-white px-6 py-3 font-semibold text-primary-700 hover:bg-gray-100 transition-colors"
                  >
                    {slide.primary.label}
                  </Link>
                  <Link
                    href={slide.secondary.href}
                    className="rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    {slide.secondary.label}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Previous slide"
        className="hero-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/90 text-gray-700 shadow flex items-center justify-center hover:bg-white"
      >
        <IconChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="hero-next absolute right-3 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-white/90 text-gray-700 shadow flex items-center justify-center hover:bg-white"
      >
        <IconChevronRight size={20} />
      </button>
    </div>
  );
}
