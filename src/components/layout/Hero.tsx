
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import home1 from "@/src/assets/images/home1.jpg";
import home2 from "@/src/assets/images/home2.jpg";

const slides = [
  {
    image: home1,
    title: "Bem-vindo ao Kubata",
    description: "Descubra soluções inovadoras que transformam sua visão em realidade.",
  },
  {
    image: home2,
    title: "Qualidade e Excelência",
    description: "Oferecemos serviços de ponta que elevam seu negócio a novos patamares.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] md:h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Images Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#402823]/30"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-4 sm:mb-6 leading-tight animate-fade-in px-2">
          {slides[currentSlide].title}
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg mb-8 sm:mb-10 text-gray-100 max-w-xl mx-auto animate-fade-in px-4">
          {slides[currentSlide].description}
        </p>

        {/* Buttons */}
        <div className="flex flex-row gap-3 justify-center items-center mb-8 sm:mb-12 w-full px-2">
          <button className="px-4 sm:px-8 py-2.5 sm:py-3.5 bg-[#c0652a] hover:bg-[#b8561f] transition-colors rounded-xl text-xs sm:text-base font-semibold flex items-center justify-center gap-1.5 sm:gap-2 group shadow-lg shadow-[#c0652a]/20">
            <span className="whitespace-nowrap">Começar Agora</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-4 sm:px-8 py-2.5 sm:py-3.5 border-2 border-white hover:bg-white hover:text-[#4a2e1f] transition-colors rounded-xl text-xs sm:text-base font-semibold whitespace-nowrap">
            Saiba Mais
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex gap-2 justify-center mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Desktop Only */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-[#402823]/50 hover:bg-[#c0652a] transition-all text-white backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-[#402823]/50 hover:bg-[#c0652a] transition-all text-white backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
      `}</style>
    </section>
  );
}