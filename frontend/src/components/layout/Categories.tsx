

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import home1 from "@/src/assets/images/home1.jpg";
import home2 from "@/src/assets/images/home2.jpg";

const categoriesData = [
  {
    id: 1,
    title: "Apartamentos",
    price: "A partir de 50.000 AOA",
    image: home1,
    count: "120 Propriedades",
  },
  {
    id: 2,
    title: "Casas",
    price: "A partir de 150.000 AOA",
    image: home2,
    count: "85 Propriedades",
  },
  {
    id: 3,
    title: "Escritórios",
    price: "A partir de 200.000 AOA",
    image: home1,
    count: "45 Propriedades",
  },
  {
    id: 4,
    title: "Lofts",
    price: "A partir de 80.000 AOA",
    image: home2,
    count: "32 Propriedades",
  },
  {
    id: 5,
    title: "Villas",
    price: "A partir de 300.000 AOA",
    image: home1,
    count: "28 Propriedades",
  },
];

export default function Categories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartY(e.clientX);
    setScrollTop(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const distance = e.clientX - startY;
    containerRef.current.scrollLeft = scrollTop - distance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        {/* Categories Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex gap-4 pb-4 min-w-max">
            {categoriesData.map((category) => (
              <div
                key={category.id}
                className="relative w-80 h-72 rounded-xl overflow-hidden group cursor-pointer transition-transform duration-300 hover:shadow-lg select-none flex-shrink-0"
              >
                {/* Background Image */}
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Dark Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-black/70 to-transparent group-hover:from-black/80 transition-colors duration-300"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-4">
                  {/* Top - Title */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium text-[#c0652a] mb-1 drop-shadow-md">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-300 drop-shadow-md bg-black/40 w-fit px-2 py-1 rounded">
                      {category.count}
                    </p>
                  </div>

                  {/* Bottom - Price and Button */}
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {category.price}
                      </p>
                    </div>
                    <button className="px-6 py-2 bg-[#c0652a] hover:bg-[#b8561f] text-white rounded-lg font-medium transition-colors text-sm whitespace-nowrap">
                      Ver Mais
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}