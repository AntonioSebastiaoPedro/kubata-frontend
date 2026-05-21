"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Heart, 
  Star, 
  BedDouble, 
  Bath, 
  Maximize, 
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Share2,
  Shield,
  MessageSquare
} from "lucide-react";
import TopBar from "@/src/components/layout/TopBar";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import home1 from "@/src/assets/images/home1.jpg";
import home2 from "@/src/assets/images/home2.jpg";

// React 19 uses standard nextjs routing, but we can read from Next.js params.
// Let's adapt to Next.js App Router hooks!
import { useParams as useNextParams } from "next/navigation";

const propertiesData = [
  {
    id: 1,
    title: "Apartamento Moderno Downtown",
    location: "Luanda, Centro",
    price: "250.000 AOA/mês",
    description: "Elegante apartamento com vista para a cidade, ideal para profissionais ou famílias jovens. Localizado no coração de Luanda, com acesso rápido a centros de negócios, restaurantes premium e espaços de lazer. Equipado com acabamentos modernos, cozinha em plano aberto e ar condicionado em todos os cômodos.",
    image: home1,
    rating: 4.8,
    reviews: 128,
    bedrooms: 2,
    bathrooms: 2,
    area: "120m²",
    type: "Apartamento",
    category: "Aluguel",
    amenities: ["Ar Condicionado", "Segurança 24/7", "Vista Panorâmica", "Elevador", "Gerador Auxiliar", "Internet Fibra"],
    agent: {
      name: "Manuel dos Santos",
      phone: "+244 923 888 777",
      email: "manuel.santos@kubata.com",
      image: home2,
    }
  },
  {
    id: 2,
    title: "Casa Familiar Confortável",
    location: "Bairro Alto, Talatona",
    price: "350.000 AOA/mês",
    description: "Espaçosa vivenda com jardim privativo no bairro mais nobre de Talatona. Perfeito para famílias grandes que valorizam tranquilidade, privacidade e conforto. Possui área de lazer completa com churrasqueira, quartos amplos com suíte e uma cozinha gourmet totalmente equipada.",
    image: home2,
    rating: 4.9,
    reviews: 205,
    bedrooms: 3,
    bathrooms: 2,
    area: "250m²",
    type: "Casa",
    category: "Aluguel",
    amenities: ["Jardim", "Churrasqueira", "Garagem Privativa", "Cozinha Equipada", "Segurança 24/7", "Reservatório de Água"],
    agent: {
      name: "Ana Bela Neto",
      phone: "+244 934 111 222",
      email: "anabela.neto@kubata.com",
      image: home1,
    }
  },
  {
    id: 3,
    title: "Loft Contemporâneo Minimalista",
    location: "Belas, Zona Premium",
    price: "300.000 AOA/mês",
    description: "Design moderno com pé-direito duplo e excelente iluminação natural. Perfeito para quem aprecia estética clean e sofisticação urbana. Espaço de convivência integrado à cozinha e mezanino espaçoso configurado como suíte master.",
    image: home1,
    rating: 4.7,
    reviews: 89,
    bedrooms: 1,
    bathrooms: 1,
    area: "85m²",
    type: "Loft",
    category: "Aluguel",
    amenities: ["Pé-direito Duplo", "Internet Fibra", "Varanda Integrada", "Estacionamento Coberto", "Portaria 24h", "Móveis Planejados"],
    agent: {
      name: "Manuel dos Santos",
      phone: "+244 923 888 777",
      email: "manuel.santos@kubata.com",
      image: home2,
    }
  },
  {
    id: 4,
    title: "Penthouse de Luxo",
    location: "Kinaxixi, Topo da Cidade",
    price: "500.000 AOA/mês",
    description: "Espetacular cobertura duplex com piscina privativa e vista panorâmica incrível sobre a Baía de Luanda. Acabamentos de altíssimo padrão, automação residencial, closets amplos e segurança privada 24 horas por dia.",
    image: home2,
    rating: 5.0,
    reviews: 142,
    bedrooms: 4,
    bathrooms: 3,
    area: "450m²",
    type: "Penthouse",
    category: "Aluguel",
    amenities: ["Piscina Privada", "Vista Panorâmica", "Elevador Privado", "Automação Residencial", "Segurança Armada", "3 Vagas Garagem"],
    agent: {
      name: "Ana Bela Neto",
      phone: "+244 934 111 222",
      email: "anabela.neto@kubata.com",
      image: home1,
    }
  },
  {
    id: 5,
    title: "Apartamento Espaçoso Duplex",
    location: "Zango, Residencial",
    price: "280.000 AOA/mês",
    description: "Confortável duplex em condomínio fechado com excelente relação custo-benefício. Escada interna moderna de madeira, quartos espaçosos no piso superior e sala de estar integrada a uma agradável varanda no piso inferior.",
    image: home1,
    rating: 4.6,
    reviews: 97,
    bedrooms: 3,
    bathrooms: 2,
    area: "160m²",
    type: "Apartamento",
    category: "Aluguel",
    amenities: ["Condomínio Fechado", "Varanda", "Playground", "Quadra Poliesportiva", "Segurança 24/7", "Poço de Água"],
    agent: {
      name: "Manuel dos Santos",
      phone: "+244 923 888 777",
      email: "manuel.santos@kubata.com",
      image: home2,
    }
  },
  {
    id: 6,
    title: "Vivenda T4 com Piscina",
    location: "Talatona, Luanda",
    price: "850.000 AOA/mês",
    description: "Espetacular vivenda T4 independente em condomínio fechado de altíssimo padrão em Talatona. Área externa com piscina privativa impecável, deck de madeira, churrasqueira e anexo completo. Uma verdadeira joia imobiliária pronta para habitar.",
    image: home2,
    rating: 4.9,
    reviews: 198,
    bedrooms: 4,
    bathrooms: 3,
    area: "350m²",
    type: "Casa",
    category: "Venda",
    amenities: ["Piscina", "Condomínio Fechado", "Churrasqueira", "Deck de Madeira", "Anexo Completo", "Segurança Privada 24h"],
    agent: {
      name: "Ana Bela Neto",
      phone: "+244 934 111 222",
      email: "anabela.neto@kubata.com",
      image: home1,
    }
  }
];

export default function PropertyDetails() {
  const params = useNextParams();
  const idStr = params?.id;
  const propertyId = idStr ? parseInt(idStr as string, 10) : 1;

  const [property, setProperty] = useState<typeof propertiesData[0] | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Form states
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("Olá, gostaria de obter mais informações sobre este imóvel.");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");
  const [selectedVisitDate, setSelectedVisitDate] = useState("");
  const [visitStatus, setVisitStatus] = useState<"idle" | "booking" | "success">("idle");

  useEffect(() => {
    const found = propertiesData.find((p) => p.id === propertyId) || propertiesData[0];
    setProperty(found);
    
    // Check local storage for favorites
    const favs = localStorage.getItem("kubata_favorites");
    if (favs) {
      const parsed = JSON.parse(favs);
      setIsFavorite(parsed.includes(found.id));
    }
  }, [propertyId]);

  const toggleFavorite = () => {
    if (!property) return;
    const favs = localStorage.getItem("kubata_favorites");
    let parsed: number[] = [];
    if (favs) {
      parsed = JSON.parse(favs);
    }
    
    if (parsed.includes(property.id)) {
      parsed = parsed.filter(id => id !== property.id);
      setIsFavorite(false);
    } else {
      parsed.push(property.id);
      setIsFavorite(true);
    }
    localStorage.setItem("kubata_favorites", JSON.stringify(parsed));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVisitDate) return;
    setVisitStatus("booking");
    setTimeout(() => {
      setVisitStatus("success");
      setTimeout(() => setVisitStatus("idle"), 5000);
    }, 1500);
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium animate-pulse">Carregando detalhes do imóvel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col selection:bg-[#c0652a]/30">
      <TopBar />
      <Header />

      <main className="flex-1 py-6 sm:py-10 px-4">
        <div className="container md:max-w-7xl mx-auto">
          {/* Breadcrumbs / Back button */}
          <div className="mb-6">
            <Link 
              href="/explore" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#c0652a] transition-colors group"
            >
              <div className="p-2 rounded-xl bg-white border border-gray-100 group-hover:bg-[#c0652a]/10 transition-colors shadow-sm">
                <ArrowLeft size={16} />
              </div>
              <span>Voltar para Explorar</span>
            </Link>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left/Center Column - Image, Info, Amenities */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Header Title Section */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#402823] rounded-lg text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                      {property.category}
                    </span>
                    <span className="px-3 py-1 bg-[#c0652a]/10 text-[#c0652a] rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {property.type}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={toggleFavorite}
                      className="p-2.5 rounded-xl border border-gray-100 hover:bg-[#c0652a]/10 transition-all shadow-sm active:scale-95 bg-gray-50/50"
                      title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      <Heart 
                        size={20} 
                        className={`transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
                      />
                    </button>
                    <button className="p-2.5 rounded-xl border border-gray-100 hover:bg-[#c0652a]/10 transition-all shadow-sm active:scale-95 bg-gray-50/50">
                      <Share2 size={20} className="text-gray-400" />
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold text-[#4a2e1f] mb-3 leading-tight">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-gray-500 mb-6 text-sm">
                  <MapPin size={18} className="text-[#c0652a]" />
                  <span className="font-medium">{property.location}</span>
                </div>

                <div className="flex items-baseline gap-2 pt-4 border-t border-gray-100">
                  <span className="text-3xl font-extrabold text-[#c0652a]">{property.price}</span>
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Valor do Investimento</span>
                </div>
              </div>

              {/* Media Gallery */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-md border border-gray-100 group">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Property Attributes Overview */}
              <div className="grid grid-cols-3 gap-4 bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm">
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                  <BedDouble size={22} className="text-[#402823] mb-1.5" />
                  <span className="text-xs text-gray-500">Quartos</span>
                  <span className="text-sm font-bold text-[#4a2e1f] mt-0.5">{property.bedrooms} Quartos</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                  <Bath size={22} className="text-[#402823] mb-1.5" />
                  <span className="text-xs text-gray-500">Banheiros</span>
                  <span className="text-sm font-bold text-[#4a2e1f] mt-0.5">{property.bathrooms} Banheiros</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                  <Maximize size={22} className="text-[#402823] mb-1.5" />
                  <span className="text-xs text-gray-500">Área Privativa</span>
                  <span className="text-sm font-bold text-[#4a2e1f] font-mono mt-0.5">{property.area}</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#4a2e1f] border-b border-gray-100 pb-3">
                  Descrição do Imóvel
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#4a2e1f] border-b border-gray-100 pb-3">
                  Comodidades e Atributos
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-gray-600 text-sm py-1">
                      <CheckCircle2 size={18} className="text-[#c0652a] shrink-0" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking & Agent Contact */}
            <div className="space-y-6 sm:space-y-8">
              {/* Agent Profile & Contact Form */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#c0652a]/20">
                    <Image
                      src={property.agent.image}
                      alt={property.agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#c0652a] tracking-wider">Agente Responsável</span>
                    <h4 className="text-base font-bold text-[#4a2e1f]">{property.agent.name}</h4>
                    <span className="text-xs text-gray-500 font-medium">Equipe de Mediação Kubata</span>
                  </div>
                </div>

                {/* Form status banner */}
                {formStatus === "success" && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs flex items-center gap-2 border border-emerald-100 animate-in fade-in duration-300">
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span>Sua mensagem foi enviada! O agente entrará em contato em breve.</span>
                  </div>
                )}

                {/* Agent Contact Form */}
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#4a2e1f] ml-1">Seu Nome</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Ex: João Manuel"
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-xs text-[#4a2e1f]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#4a2e1f] ml-1">Seu Telefone</label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="Ex: +244 923 000 000"
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-xs text-[#4a2e1f]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#4a2e1f] ml-1">Mensagem</label>
                    <textarea
                      required
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-xs text-[#4a2e1f] resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full py-3.5 bg-[#c0652a] hover:bg-[#b8561f] text-white rounded-xl font-bold text-xs shadow-lg shadow-[#c0652a]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75"
                  >
                    <MessageSquare size={16} />
                    <span>{formStatus === "sending" ? "Enviando..." : "Falar com Agente"}</span>
                  </button>
                </form>

                {/* Direct info buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-xs font-semibold text-[#4a2e1f] active:scale-95"
                  >
                    <Phone size={14} className="text-[#c0652a]" />
                    <span>Ligar</span>
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-xs font-semibold text-[#4a2e1f] active:scale-95"
                  >
                    <Mail size={14} className="text-[#c0652a]" />
                    <span>E-mail</span>
                  </a>
                </div>
              </div>

              {/* Schedule Visit Section */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                  <Calendar size={20} className="text-[#c0652a]" />
                  <div>
                    <h4 className="text-base font-bold text-[#4a2e1f]">Agendar uma Visita</h4>
                    <p className="text-[10px] text-gray-500 font-medium">Reserve seu horário online de forma gratuita</p>
                  </div>
                </div>

                {visitStatus === "success" && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs flex items-center gap-2 border border-emerald-100 animate-in fade-in duration-300">
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span>Visita pré-agendada com sucesso! Confirmaremos pelo telefone.</span>
                  </div>
                )}

                <form onSubmit={handleVisitSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#4a2e1f] ml-1">Data Desejada</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={selectedVisitDate}
                      onChange={(e) => setSelectedVisitDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-xs text-[#4a2e1f]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={visitStatus === "booking"}
                    className="w-full py-3.5 bg-[#402823] hover:bg-[#2f1d16] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75"
                  >
                    <Calendar size={16} />
                    <span>{visitStatus === "booking" ? "Reservando..." : "Confirmar Pré-Agendamento"}</span>
                  </button>
                </form>

                <div className="flex gap-2 items-center text-[10px] text-gray-500 font-semibold bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                  <Shield size={16} className="text-[#c0652a] shrink-0" />
                  <span>Seus dados de agendamento estão protegidos sob os termos da Kubata.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
