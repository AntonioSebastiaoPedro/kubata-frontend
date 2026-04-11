

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MapPin, Heart, Star } from "lucide-react";
import home1 from "@/src/assets/images/home1.jpg";
import home2 from "@/src/assets/images/home2.jpg";

const propertiesData = [
    {
        id: 1,
        title: "Apartamento Moderno Downtown",
        location: "Luanda, Centro",
        price: "250.000 AOA/mês",
        description: "Elegante apartamento com vista para a cidade, 2 quartos, 2 banheiros, balcão espaçoso.",
        image: home1,
        rating: 4.8,
        reviews: 128,
        bedrooms: 2,
        bathrooms: 2,
    },
    {
        id: 2,
        title: "Casa Familiar Confortável",
        location: "Bairro Alto, Talatona",
        price: "350.000 AOA/mês",
        description: "Casa aconchegante com jardim, 3 quartos, escritório, garagem para 2 carros.",
        image: home2,
        rating: 4.9,
        reviews: 205,
        bedrooms: 3,
        bathrooms: 2,
    },
    {
        id: 3,
        title: "Loft Contemporâneo Minimalista",
        location: "Belas, Zona Premium",
        price: "300.000 AOA/mês",
        description: "Design contemporâneo, pé-direito duplo, cozinha integrada, área de trabalho flexível.",
        image: home1,
        rating: 4.7,
        reviews: 89,
        bedrooms: 1,
        bathrooms: 1,
    },
    {
        id: 4,
        title: "Penthouse de Luxo",
        location: "Kinaxixi, Topo da Cidade",
        price: "500.000 AOA/mês",
        description: "Propriedade premium com piscina privada, terraço panorâmico, 4 suites.",
        image: home2,
        rating: 5.0,
        reviews: 142,
        bedrooms: 4,
        bathrooms: 3,
    },
    {
        id: 5,
        title: "Apartamento Espaçoso Duplex",
        location: "Zango, Residencial",
        price: "280.000 AOA/mês",
        description: "Duplex moderno com escada interna, 3 quartos, cozinha completa, área social ampla.",
        image: home1,
        rating: 4.6,
        reviews: 97,
        bedrooms: 3,
        bathrooms: 2,
    },
];

export default function FeaturedProperties() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const CARD_WIDTH = 900; // Largura do card
    const GAP = 20; // Gap entre cards
    const CARD_WITH_GAP = CARD_WIDTH + GAP;

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setStartX(e.clientX);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        const distance = e.clientX - startX;
        containerRef.current.scrollLeft = scrollLeft - distance;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        snapToCard();
    };

    const snapToCard = () => {
        if (!containerRef.current) return;
        const scrollLeft = containerRef.current.scrollLeft;
        const index = Math.round(scrollLeft / CARD_WITH_GAP);
        setCurrentIndex(Math.min(index, propertiesData.length - 1));
        containerRef.current.scrollLeft = index * CARD_WITH_GAP;
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const index = Math.round(scrollLeft / CARD_WITH_GAP);
            setCurrentIndex(Math.min(index, propertiesData.length - 1));
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="py-16 px-0 bg-gray-100">
            <div className="container mx-auto">

                <div className="" >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-medium text-[#4a2e1f] mb-2">
                            Propriedades em Destaque
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Conheça nossas seleções premium de propriedades mais procuradas. Deslize para explorar mais detalhes.
                        </p>
                    </div>
                    <div>

                    </div>
                </div>

                {/* Properties Carousel */}
                <div
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="overflow-x-scroll scrollbar-hide"
                    style={{ scrollBehavior: "smooth" }}
                >
                    <div className="flex gap-5 pb-4" style={{ width: "max-content" }}>
                        {propertiesData.map((property, index) => (
                            <div
                                key={property.id}
                                className={`relative rounded-sm overflow-hidden shrink-0 transition-all duration-300 card-featured ${index === currentIndex
                                    ? "card-featured-active"
                                    : "card-featured-inactive"
                                    }`}
                            >
                                {/* Background Image */}
                                <Image
                                    src={property.image}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                />

                                {/* Dark Overlay linear */}
                                <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-linear-to-t from-black/90 via-black/50 to-transparent"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-3">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={`${i < Math.floor(property.rating)
                                                        ? "fill-[#c0652a] text-[#c0652a]"
                                                        : "text-gray-400"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-white text-sm ml-1">
                                            {property.rating} ({property.reviews} avaliações)
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-semibold text-white mb-2">
                                        {property.title}
                                    </h3>

                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-gray-200 mb-3">
                                        <MapPin size={18} className="text-[#c0652a]" />
                                        <span className="text-sm">{property.location}</span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-100 text-sm mb-4 line-clamp-2">
                                        {property.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex gap-4 mb-4 text-gray-200 text-sm">
                                        <div className="flex items-center gap-1">
                                            <span>🛏️</span>
                                            <span>{property.bedrooms} Quartos</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>🚿</span>
                                            <span>{property.bathrooms} Banheiros</span>
                                        </div>
                                    </div>

                                    {/* Bottom Section */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[#c0652a] font-semibold text-lg">
                                                {property.price}
                                            </p>
                                        </div>
                                        <button className="px-6 py-2 bg-[#c0652a] hover:bg-[#b8561f] text-white rounded-sm font-medium transition-colors">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </div>

                                {/* Favorite Button */}
                                <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white transition-colors z-10">
                                    <Heart size={20} className="text-[#c0652a]" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indicators */}
                <div className="flex items-center justify-center gap-2 mt-8 container mx-auto">
                    {propertiesData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (containerRef.current) {
                                    containerRef.current.scrollLeft = index * CARD_WITH_GAP;
                                }
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "w-8 bg-[#c0652a]"
                                : "w-2 bg-gray-300 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to property ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
        .card-featured {
          width: 900px;
          height: 480px;
          flex-shrink: 0;
        }

        .card-featured-active {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 20px 20px -10px rgba(0, 0, 0, 0.04);
          opacity: 1;
        }

        .card-featured-inactive {
          opacity: 0.7;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

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