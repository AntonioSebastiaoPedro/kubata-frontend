
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
    }, 8000);
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
    <section className="relative w-full min-h-[67vh] flex items-center justify-center overflow-hidden">
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
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-medium mb-6 leading-tight animate-fade-in">
          {slides[currentSlide].title}
        </h1>
        
        <p className="text-base md:text-lg mb-8 text-gray-100 max-w-xl mx-auto animate-fade-in">
          {slides[currentSlide].description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <button className="px-8 py-3 bg-[#c0652a] hover:bg-[#b8561f] transition-colors rounded-lg font-medium flex items-center gap-2 group">
            Começar Agora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-3 border-2 border-white hover:bg-white hover:text-[#4a2e1f] transition-colors rounded-lg font-medium">
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

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
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