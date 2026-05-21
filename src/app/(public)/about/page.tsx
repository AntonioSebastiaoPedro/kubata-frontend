"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Building, 
  Users, 
  Award, 
  Heart,
  TrendingUp,
  MapPin,
  CheckCircle2,
  PhoneCall
} from "lucide-react";
import TopBar from "@/src/components/layout/TopBar";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import home1 from "@/src/assets/images/home1.jpg";
import home2 from "@/src/assets/images/home2.jpg";

export default function About() {
  const [activeTab, setActiveTab] = useState<"missao" | "visao" | "valores">("missao");

  const team = [
    { name: "António Sebastião", role: "CEO & Co-Fundador", image: home2 },
    { name: "Cláudia Manuel", role: "Diretora de Operações", image: home1 },
    { name: "Júlio Neto", role: "Gestor Comercial", image: home2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col selection:bg-[#c0652a]/30">
      <TopBar />
      <Header />

      <main className="flex-grow">
        {/* Banner/Hero Section */}
        <section className="relative py-20 sm:py-32 bg-[#402823] overflow-hidden">
          <Image 
            src={home1}
            alt="Baía de Luanda"
            fill
            className="object-cover opacity-30 scale-102"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#402823] via-[#402823]/80 to-transparent"></div>
          <div className="container md:max-w-7xl mx-auto px-4 relative z-10">
            <div className="max-w-2xl text-white space-y-6">
              <span className="text-[#c0652a] font-bold text-xs uppercase tracking-widest bg-[#c0652a]/15 px-3.5 py-1.5 rounded-full border border-[#c0652a]/20">
                Sobre o Kubata
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
                Redefinindo o mercado imobiliário em Angola
              </h1>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-medium">
                Conectamos pessoas a lares perfeitos com transparência, segurança digital e atendimento humanizado premium.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b border-gray-100 shadow-xs relative z-20 -mt-8 mx-4 rounded-3xl max-w-7xl md:mx-auto">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#c0652a] font-mono">1.200+</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">Imóveis Ativos</span>
              </div>
              <div className="space-y-1">
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#4a2e1f] font-mono">15+</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">Cidades Atendidas</span>
              </div>
              <div className="space-y-1">
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#c0652a] font-mono">5.000+</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">Clientes Felizes</span>
              </div>
              <div className="space-y-1">
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#4a2e1f] font-mono">98%</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">Satisfação Total</span>
              </div>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Values Tabs Section */}
        <section className="py-16 sm:py-24 px-4 bg-gray-50">
          <div className="container md:max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left Column: Image with dynamic content */}
              <div className="flex-1 w-full relative">
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                  <Image 
                    src={activeTab === "missao" ? home1 : activeTab === "visao" ? home2 : home1} 
                    alt="Kubata Escritório" 
                    fill 
                    className="object-cover transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-[#c0652a]/10"></div>
                </div>
              </div>

              {/* Right Column: Narrative Tabs */}
              <div className="flex-1 space-y-8 w-full">
                <div className="space-y-3">
                  <span className="text-xs uppercase font-bold text-[#c0652a] tracking-wider">Nossos Pilares</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#4a2e1f]">O que impulsiona a nossa plataforma todos os dias</h2>
                </div>

                {/* Tabs controls */}
                <div className="flex border-b border-gray-200 gap-6">
                  <button 
                    onClick={() => setActiveTab("missao")}
                    className={`pb-3 text-sm font-bold transition-all relative cursor-pointer ${activeTab === "missao" ? "text-[#c0652a]" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    Nossa Missão
                    {activeTab === "missao" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c0652a] rounded-full animate-in slide-in-from-left duration-300"></span>}
                  </button>
                  <button 
                    onClick={() => setActiveTab("visao")}
                    className={`pb-3 text-sm font-bold transition-all relative cursor-pointer ${activeTab === "visao" ? "text-[#c0652a]" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    Nossa Visão
                    {activeTab === "visao" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c0652a] rounded-full animate-in slide-in-from-left duration-300"></span>}
                  </button>
                  <button 
                    onClick={() => setActiveTab("valores")}
                    className={`pb-3 text-sm font-bold transition-all relative cursor-pointer ${activeTab === "valores" ? "text-[#c0652a]" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    Nossos Valores
                    {activeTab === "valores" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c0652a] rounded-full animate-in slide-in-from-left duration-300"></span>}
                  </button>
                </div>

                {/* Tab content panel */}
                <div className="min-h-40">
                  {activeTab === "missao" && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Nossa missão é descomplicar a busca por imóveis em Angola. Queremos prover uma plataforma online inovadora que ofereça aos arrendatários e proprietários as ferramentas necessárias para negociar com total transparência, velocidade e, acima de tudo, segurança jurídica e digital.
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <li className="flex items-center gap-2 text-xs font-semibold text-[#4a2e1f]">
                          <CheckCircle2 size={16} className="text-[#c0652a]" />
                          <span>Verificação Rigorosa</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs font-semibold text-[#4a2e1f]">
                          <CheckCircle2 size={16} className="text-[#c0652a]" />
                          <span>Processos Sem Papel</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "visao" && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Ser reconhecida como a plataforma de referência tecnológica e a maior vitrine de locação e compra de imóveis em toda Angola. Desejamos liderar a transformação digital no setor imobiliário angolano, gerando conexões duradouras baseadas na integridade e excelência operacional.
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <li className="flex items-center gap-2 text-xs font-semibold text-[#4a2e1f]">
                          <CheckCircle2 size={16} className="text-[#c0652a]" />
                          <span>Liderança Digital</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs font-semibold text-[#4a2e1f]">
                          <CheckCircle2 size={16} className="text-[#c0652a]" />
                          <span>Inovação Contínua</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "valores" && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Acreditamos que todo negócio deve ter o cliente como foco absoluto. Nossos valores inegociáveis incluem transparência radical na comunicação, segurança jurídica blindada de contratos, respeito às origens e cultura angolanas e paixão constante pela inovação tecnológica.
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <li className="flex items-center gap-2 text-xs font-semibold text-[#4a2e1f]">
                          <CheckCircle2 size={16} className="text-[#c0652a]" />
                          <span>Ética & Integridade</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs font-semibold text-[#4a2e1f]">
                          <CheckCircle2 size={16} className="text-[#c0652a]" />
                          <span>Foco no Cliente</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 sm:py-28 bg-white px-4">
          <div className="container md:max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs uppercase font-bold text-[#c0652a] tracking-wider">Time de Liderança</span>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#4a2e1f]">Nossa Equipe Executiva</h2>
              <p className="text-sm text-gray-500">Profissionais experientes dedicados a realizar seus sonhos imobiliários com perfeição.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div key={idx} className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center p-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#c0652a]/20">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#4a2e1f] group-hover:text-[#c0652a] transition-colors">{member.name}</h3>
                  <p className="text-xs text-gray-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">Líder focado em impulsionar o crescimento e inovação imobiliária digital em Luanda e províncias.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/CTA Section */}
        <section className="py-16 sm:py-24 bg-[#402823] px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-to-br from-[#c0652a]/10 to-transparent"></div>
          <div className="container md:max-w-7xl mx-auto text-center relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight">
              Procurando uma oportunidade para investir ou arrendar?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
              Nossa equipe está disponível 24 horas por dia para ajudar na seleção do seu próximo imóvel ideal.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link 
                href="/explore" 
                className="px-8 py-3.5 bg-[#c0652a] hover:bg-[#b8561f] text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-[#c0652a]/20"
              >
                Explorar Imóveis
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-3.5 border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <PhoneCall size={16} />
                <span>Contactar Suporte</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
