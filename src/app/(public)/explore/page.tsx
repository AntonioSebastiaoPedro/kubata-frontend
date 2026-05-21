"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize, 
  Filter, 
  SlidersHorizontal,
  Heart,
  LayoutGrid,
  List
} from "lucide-react";
import TopBar from "@/src/components/layout/TopBar";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import home1 from "@/src/assets/images/home1.jpg";
import home2 from "@/src/assets/images/home2.jpg";

const properties = [
  { id: 1, title: "Apartamento Moderno Downtown", location: "Luanda, Centro", price: "250.000", bedrooms: 2, bathrooms: 2, area: "120m²", image: home1, category: "Aluguel" },
  { id: 2, title: "Vivenda T4 com Piscina", location: "Talatona, Luanda", price: "850.000", bedrooms: 4, bathrooms: 3, area: "350m²", image: home2, category: "Venda" },
  { id: 3, title: "Loft Industrial", location: "Kilamba, Luanda", price: "180.000", bedrooms: 1, bathrooms: 1, area: "85m²", image: home1, category: "Aluguel" },
  { id: 4, title: "Escritório Comercial", location: "Ilha de Luanda", price: "450.000", bedrooms: 0, bathrooms: 2, area: "200m²", image: home2, category: "Venda" },
  { id: 5, title: "Casa Familiar Jardim", location: "Benfica, Luanda", price: "320.000", bedrooms: 3, bathrooms: 2, area: "280m²", image: home1, category: "Aluguel" },
  { id: 6, title: "Penthouse Exclusiva", location: "Kinaxixi, Luanda", price: "1.200.000", bedrooms: 3, bathrooms: 4, area: "450m²", image: home2, category: "Venda" },
];

export default function Explore() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Tipo de Imóvel");
  const [maxPrice, setMaxPrice] = useState("Preço Máximo");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activePage, setActivePage] = useState(1);

  // Safe search param reading
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("type");
      if (typeParam) {
        setSelectedType(typeParam);
      }
    }
  }, []);

  // Fetch favorites from localStorage
  useEffect(() => {
    const favs = localStorage.getItem("kubata_favorites");
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  }, []);

  const toggleFavorite = (id: number) => {
    let updatedFavs = [...favorites];
    if (updatedFavs.includes(id)) {
      updatedFavs = updatedFavs.filter(favId => favId !== id);
    } else {
      updatedFavs.push(id);
    }
    setFavorites(updatedFavs);
    localStorage.setItem("kubata_favorites", JSON.stringify(updatedFavs));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("Tipo de Imóvel");
    setMaxPrice("Preço Máximo");
  };

  // Filter properties logic
  const filteredProperties = properties.filter((property) => {
    // 1. Search term filter
    const matchesSearch = 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Type filter
    let matchesType = true;
    if (selectedType !== "Tipo de Imóvel" && selectedType !== "") {
      if (selectedType === "Apartamento") {
        matchesType = property.title.toLowerCase().includes("apartamento") || property.title.toLowerCase().includes("loft") || property.title.toLowerCase().includes("penthouse");
      } else if (selectedType === "Casa") {
        matchesType = property.title.toLowerCase().includes("casa") || property.title.toLowerCase().includes("vivenda") || property.title.toLowerCase().includes("villa");
      } else if (selectedType === "Comercial") {
        matchesType = property.title.toLowerCase().includes("escritório") || property.title.toLowerCase().includes("comercial");
      } else {
        matchesType = property.title.toLowerCase().includes(selectedType.toLowerCase());
      }
    }

    // 3. Price filter
    const priceNum = parseInt(property.price.replace(/\./g, ""), 10);
    let matchesPrice = true;
    if (maxPrice !== "Preço Máximo" && maxPrice !== "") {
      const limit = maxPrice === "500k AOA" ? 500000 : maxPrice === "1M AOA" ? 1000000 : 5000000;
      matchesPrice = priceNum <= limit;
    }

    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col selection:bg-[#c0652a]/30">
      <TopBar />
      <Header />

      {/* Explore Header & Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-[72px] z-30 shadow-xs">
        <div className="container md:max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Search Bar */}
            <div className="w-full lg:flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c0652a] transition-colors" size={20} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquise por localização, bairro ou condomínio..." 
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-sm shadow-sm"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <button 
                onClick={clearFilters}
                className="flex items-center gap-2 px-5 py-3 bg-[#c0652a] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#c0652a]/20 whitespace-nowrap active:scale-95 cursor-pointer"
              >
                <Filter size={18} />
                <span>Limpar Filtros</span>
              </button>
              
              <div className="h-10 w-px bg-gray-200 mx-2 hidden lg:block"></div>

              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-5 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-medium text-[#4a2e1f] outline-none hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <option value="Tipo de Imóvel">Tipo de Imóvel</option>
                <option value="Apartamento">Apartamentos</option>
                <option value="Casa">Casas & Vivendas</option>
                <option value="Comercial">Escritórios/Comercial</option>
              </select>

              <select 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="px-5 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-medium text-[#4a2e1f] outline-none hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <option value="Preço Máximo">Preço Máximo</option>
                <option value="500k AOA">Até 500k AOA</option>
                <option value="1M AOA">Até 1M AOA</option>
                <option value="5M AOA">Até 5M AOA</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-10 px-4">
        <div className="container md:max-w-7xl mx-auto">
          {/* Results Info & View Toggle */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-[#4a2e1f]">Imóveis Disponíveis em Luanda</h2>
              <p className="text-sm text-gray-500 mt-1">Encontramos {filteredProperties.length} propriedades perfeitas para si</p>
            </div>
            
            <div className="hidden sm:flex items-center bg-white p-1 rounded-xl shadow-sm border border-gray-100">
              <button 
                onClick={() => setViewType("grid")}
                className={`p-2 rounded-lg transition-all cursor-pointer ${viewType === "grid" ? "bg-[#c0652a] text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => setViewType("list")}
                className={`p-2 rounded-lg transition-all cursor-pointer ${viewType === "list" ? "bg-[#c0652a] text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-xl mx-auto space-y-4">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-[#4a2e1f]">Nenhum imóvel corresponde aos filtros</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Tente alterar os termos de pesquisa ou remover alguns filtros rápidos para encontrar melhores opções.</p>
              <button onClick={clearFilters} className="px-6 py-2.5 bg-[#c0652a] text-white font-bold rounded-xl text-xs shadow-md hover:bg-[#b8561f] cursor-pointer">Limpar tudo</button>
            </div>
          ) : (
            <div className={`grid gap-6 sm:gap-8 ${viewType === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filteredProperties.map((property) => (
                <div 
                  key={property.id} 
                  className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex ${viewType === "list" ? "flex-row h-72" : "flex-col"}`}
                >
                  {/* Image Section */}
                  <div className={`relative overflow-hidden ${viewType === "list" ? "w-2/5" : "h-64"}`}>
                    <Image 
                      src={property.image} 
                      alt={property.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#402823]/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                      {property.category}
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                      <div className="flex items-baseline gap-1">
                         <span className="text-white text-xl font-bold">{property.price}</span>
                         <span className="text-white/70 text-[10px] font-medium uppercase tracking-tighter">AOA / Mês</span>
                      </div>
                    </div>

                    {/* Favorite Button */}
                    <button 
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/20 hover:bg-white backdrop-blur-md text-white hover:text-[#c0652a] transition-all border border-white/20 shadow-lg active:scale-95 cursor-pointer z-10"
                    >
                      <Heart size={18} className={`drop-shadow-sm transition-colors ${favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-white"}`} />
                    </button>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex flex-col justify-between flex-1 border-x border-b border-gray-50 rounded-b-2xl">
                    <div>
                      <div className="flex items-center gap-1.5 text-[#c0652a] mb-2 px-1">
                         <MapPin size={14} fill="currentColor" fillOpacity={0.2} />
                         <span className="text-[11px] font-bold uppercase tracking-tight">{property.location}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#4a2e1f] mb-3 group-hover:text-[#c0652a] transition-colors line-clamp-1 leading-tight px-1">
                        {property.title}
                      </h3>
                    </div>

                    {/* Custom Attribute Icons */}
                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-50 mt-1">
                      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50/50 hover:bg-gray-100 transition-colors">
                         <BedDouble size={18} className="text-[#402823] mb-1" />
                         <span className="text-[10px] font-bold text-gray-600">{property.bedrooms} Qts</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50/50 hover:bg-gray-100 transition-colors">
                         <Bath size={18} className="text-[#402823] mb-1" />
                         <span className="text-[10px] font-bold text-gray-600">{property.bathrooms} Banh</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50/50 hover:bg-gray-100 transition-colors">
                         <Maximize size={18} className="text-[#402823] mb-1" />
                         <span className="text-[10px] font-bold text-gray-600 font-mono tracking-tighter">{property.area}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <Link href={`/properties/${property.id}`} className="flex-1 px-4 py-3 bg-[#c0652a] hover:bg-[#b8561f] text-white font-bold rounded-xl shadow-lg shadow-[#c0652a]/20 transition-all text-xs active:scale-[0.98] text-center flex items-center justify-center">
                        Detalhes da Propriedade
                      </Link>
                      <button 
                        onClick={() => setSelectedType(property.title.includes("Apartamento") ? "Apartamento" : "Casa")}
                        className="p-3 bg-gray-100 hover:bg-[#402823] hover:text-white text-[#402823] rounded-xl transition-all active:scale-95 cursor-pointer"
                      >
                         <SlidersHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Placeholder */}
          {filteredProperties.length > 0 && (
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center gap-2">
                <button onClick={() => setActivePage(1)} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold shadow-sm cursor-pointer transition-all border ${activePage === 1 ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/20 border-transparent" : "bg-white border-gray-200 text-gray-500 hover:border-[#c0652a] hover:text-[#c0652a]"}`}>1</button>
                <button onClick={() => setActivePage(2)} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold shadow-sm cursor-pointer transition-all border ${activePage === 2 ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/20 border-transparent" : "bg-white border-gray-200 text-gray-500 hover:border-[#c0652a] hover:text-[#c0652a]"}`}>2</button>
                <button onClick={() => setActivePage(3)} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold shadow-sm cursor-pointer transition-all border ${activePage === 3 ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/20 border-transparent" : "bg-white border-gray-200 text-gray-500 hover:border-[#c0652a] hover:text-[#c0652a]"}`}>3</button>
                <span className="px-2 text-gray-400">...</span>
                <button onClick={() => setActivePage(12)} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold shadow-sm cursor-pointer transition-all border ${activePage === 12 ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/20 border-transparent" : "bg-white border-gray-200 text-gray-500 hover:border-[#c0652a] hover:text-[#c0652a]"}`}>12</button>
              </nav>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
