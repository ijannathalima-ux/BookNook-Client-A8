
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Discover Your Next Favorite",
    description: "Explore a world of stories and imagination.",
    image: "/images/banner-img-1.jpg",
  },
  {
    title: "Every Book Has a Story",
    description: "Find inspiration on every page.",
    image: "/images/banner-img-2.jpg",
  },
  {
    title: "A Cozy Place for Readers",
    description: "Make every reading moment special.",
    image: "/images/banner-img-3.jpg",
  },
  {
    title: "Explore New Worlds",
    description: "Discover books that take you beyond imagination.",
    image: "/images/banner-img-4.jpg",
  },
  {
    title: "Your Reading Journey Starts Here",
    description: "Find, borrow, and enjoy your favorite books.",
    image: "/images/banner-img-5.jpg",
  },
];

const HeroSlider = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 md:px-8">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="overflow-hidden rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex min-h-[420px] items-center bg-cover bg-center px-8 py-16 md:min-h-[500px] md:px-16"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(25, 42, 32, 0.90), rgba(25, 42, 32, 0.25)), url(${slide.image})`,
              }}
            >
              <div className="relative z-10 max-w-2xl text-white">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-[#e5c99b]">
                  Welcome to BookNook
                </p>

                <h2 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                  {slide.title}
                </h2>

                <p className="mb-8 max-w-xl text-base leading-7 text-[#f2eee5] md:text-lg">
                  {slide.description}
                </p>

                <Link
                  href="/books"
                  className="inline-block rounded-lg bg-[#e5c99b] px-7 py-3 font-semibold text-[#253d2e] transition hover:bg-white"
                >
                  Browse Books →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
