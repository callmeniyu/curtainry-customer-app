"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Home, Palette, Camera, Wrench, Star } from "lucide-react";
import Button from "../ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  primaryCTA: string;
  feature: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  };
  gradient: string;
  textColor: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Premium Curtains",
    subtitle: "Transform Your Space with Luxury",
    description:
      "Discover our handpicked collection of premium curtains crafted from the finest fabrics. From elegant sheers to rich blackouts, each piece brings sophistication and comfort to your home.",
    image: "/images/hero1.jpg",
    badge: "Premium Quality",
    primaryCTA: "Shop Premium Collection",
    feature: {
      icon: Home,
      title: "4.9★ Rating",
      description: "Loved by 1000+ customers",
    },
    gradient: "from-amber-900/80 via-amber-800/60 to-transparent",
    textColor: "text-amber-50",
  },
  {
    id: 2,
    title: "Custom Fabrics",
    subtitle: "Bespoke Curtains Made Just for You",
    description:
      "Choose from over 200+ premium fabrics including silk, velvet, linen, and cotton blends. Our experts will create curtains that perfectly match your vision and home décor.",
    image: "/images/hero_fabrics1.jpg",
    badge: "Custom Design",
    primaryCTA: "Explore Fabrics",
    feature: {
      icon: Palette,
      title: "200+ Fabrics",
      description: "Endless customization options",
    },
    gradient: "from-purple-900/80 via-purple-800/60 to-transparent",
    textColor: "text-purple-50",
  },
  {
    id: 3,
    title: "Professional Services",
    subtitle: "Complete Installation & Maintenance",
    description:
      "From precise measurements to flawless installation and ongoing maintenance. Our certified professionals ensure your curtains hang perfectly and last for years.",
    image: "/images/hero_service.jpg",
    badge: "Expert Service",
    primaryCTA: "Book Service",
    feature: {
      icon: Wrench,
      title: "Expert Team",
      description: "Professional installation",
    },
    gradient: "from-emerald-900/80 via-emerald-800/60 to-transparent",
    textColor: "text-emerald-50",
  },
  {
    id: 4,
    title: "AR Visualization",
    subtitle: "See Before You Buy",
    description:
      "Experience the future of curtain shopping with our AR technology. Visualize how different curtains will look in your space before making a decision.",
    image: "/images/hero_ar.jpg",
    badge: "Coming Soon",
    primaryCTA: "Try AR Preview",
    feature: {
      icon: Camera,
      title: "AR Preview",
      description: "Visualize in your space",
    },
    gradient: "from-blue-900/80 via-blue-800/60 to-transparent",
    textColor: "text-blue-50",
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }
    if (isRightSwipe) {
      setCurrentSlide(
        (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
      );
    }

    // Resume auto-play after 3 seconds
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const currentSlideData = heroSlides[currentSlide];

  // Function to get navigation path based on slide CTA
  const getNavigationPath = (cta: string) => {
    switch (cta) {
      case "Shop Premium Collection":
      case "Explore Fabrics":
        return "/products";
      case "Book Service":
        return "/services";
      case "Try AR Preview":
        return "/ar";
      default:
        return "/products";
    }
  };

  return (
    <section className="relative overflow-hidden h-[50vh] sm:h-[65vh] lg:h-[100vh] select-none">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-in-out",
              index === currentSlide
                ? "opacity-100 transform translate-x-0"
                : index < currentSlide
                ? "opacity-0 transform -translate-x-full"
                : "opacity-0 transform translate-x-full"
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r",
                  slide.gradient
                )}
              />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex  items-center">
              <div className="section-padding w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
                  {/* Left - Main Content */}
                  <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-center lg:text-left">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 lg:mt-12">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {slide.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h1
                        className={cn(
                          "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-2xl",
                          slide.textColor
                        )}
                      >
                        {slide.title}
                      </h1>
                      <h2
                        className={cn(
                          "text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mt-1 sm:mt-2 opacity-90",
                          slide.textColor
                        )}
                      >
                        {slide.subtitle}
                      </h2>
                    </div>

                    {/* Description */}
                    <p
                      className={cn(
                        "text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl opacity-90 mx-auto lg:mx-0",
                        slide.textColor
                      )}
                    >
                      {slide.description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-1 sm:pt-2 lg:pt-4">
                      <Button
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl font-semibold text-sm sm:text-base"
                        onClick={() =>
                          router.push(getNavigationPath(slide.primaryCTA))
                        }
                      >
                        {slide.primaryCTA}
                      </Button>
                    </div>
                  </div>

                  {/* Right - Feature Card */}
                  <div className="hidden md:flex justify-center lg:justify-end mt-0 lg:mt-0">
                    <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-sm w-full shadow-2xl">
                      <div className="text-center space-y-4 sm:space-y-6">
                        <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <slide.feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                            {slide.feature.title}
                          </h3>
                          <p className="text-white/80 text-sm sm:text-base md:text-lg">
                            {slide.feature.description}
                          </p>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/20">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="text-white/90 text-xs sm:text-sm font-medium">
                            Trusted by 1000+
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 3000);
            }}
            className={cn(
              "w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 backdrop-blur-sm",
              index === currentSlide
                ? "bg-white w-6 sm:w-8 shadow-lg"
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
