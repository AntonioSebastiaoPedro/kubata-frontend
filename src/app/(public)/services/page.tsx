"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Home, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Users, 
  Coins, 
  FileSignature, 
  CheckCircle2,
  CalendarCheck,
  Zap
} from "lucide-react";
import TopBar from "@/src/components/layout/TopBar";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";

export default function Services() {
  const [activeSegment, setActiveSegment] = useState<"inquilino" | "senhorio">("inquilino");
  
  // Consultation form state
  const [clientType, setClientType] = useState("Inquilino");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setName("");
      setPhone("");
      setNotes("");
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  const servicesInquilinos = [
    {
      icon: <Home className="text-[#c0652a]" size={24} />,
      title: "Busca Guiada e Inteligente",
      desc: "Nossos algoritmos premium de pesquisa filtram os melhores apartamentos e vivendas de acordo com a sua renda mensal e estilo de vida."
    },
    {
      icon: <Clock className="text-[#c0652a]" size={24} />,
      title: "Agendamento de Visitas Expresso",
      desc: "Pre-reserva online instantânea integrada ao calendário de corretores parceiros, permitindo visitas no mesmo dia em zonas premium."
    },
    {
      icon: <ShieldCheck className="text-[#c0652a]" size={24} />,
      title: "Contratos Digitais 100% Seguros",
      desc: "Evite filas de cartórios. Oferecemos assinatura contratual online certificada e em plena conformidade com as leis do arrendamento angolanas."
    },
    {
      icon: <Coins className="text-[#c0652a]" size={24} />,
      title: "Facilitação de Pagamentos",
      desc: "Opções de pagamentos facilitados da renda diretamente pela plataforma com relatórios financeiros completos de recibos."
    }
  ];

  const servicesSenhorios = [
    {
      icon: <Zap className="text-[#c0652a]" size={24} />,
      title: "Anúncio Premium em Destaque",
      desc: "Exposição de alta relevância com fotos de qualidade para milhares de utilizadores ativos que pesquisam diariamente em Luanda."
    },
    {
      icon: <Users className="text-[#c0652a]" size={24} />,
      title: "Análise de Perfil de Inquilinos",
      desc: "Verificação prévia detalhada de histórico de pagamentos para garantir máxima segurança contra possíveis problemas de arrendamento."
    },
    {
      icon: <FileSignature className="text-[#c0652a]" size={24} />,
      title: "Gestão Automatizada de Rendas",
      desc: "Acompanhe pagamentos mensais, envie lembretes automáticos e receba diretamente na sua conta bancária sem intermediários físicos."
    },
    {
      icon: <Layers className="text-[#c0652a]" size={24} />,
      title: "Seguro Garantia Fiança",
      desc: "Oferecemos proteção extra contra danos físicos no imóvel e cobertura especial em situações de inadimplência pontual."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col selection:bg-[#c0652a]/30">
      <TopBar />
      <Header />

      <main className="flex-grow">
        {/* Banner Section */}
        <section className="bg-[#402823] text-white py-16 sm:py-24 text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-to-br from-[#c0652a]/15 to-transparent"></div>
          <div className="container md:max-w-7xl mx-auto space-y-4 relative z-10">
            <span className="text-[#c0652a] font-bold text-xs uppercase tracking-widest bg-[#c0652a]/15 px-3 py-1.5 rounded-full border border-[#c0652a]/20">
              Nossos Serviços
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold max-w-3xl mx-auto leading-tight">
              Soluções inteligentes ponta a ponta para arrendar e vender
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
              Descubra como ajudamos proprietários e inquilinos a realizarem transações seguras em Luanda.
            </p>
          </div>
        </section>

        {/* Dynamic Interactive Segment Selector */}
        <section className="py-12 sm:py-16 px-4 bg-white border-b border-gray-100">
          <div className="container md:max-w-7xl mx-auto">
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
                <button
                  onClick={() => setActiveSegment("inquilino")}
                  className={`px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeSegment === "inquilino" ? "bg-[#c0652a] text-white shadow-md" : "text-[#4a2e1f] hover:text-[#c0652a]"}`}
                >
                  Para Inquilinos
                </button>
                <button
                  onClick={() => setActiveSegment("senhorio")}
                  className={`px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeSegment === "senhorio" ? "bg-[#c0652a] text-white shadow-md" : "text-[#4a2e1f] hover:text-[#c0652a]"}`}
                >
                  Para Senhorios
                </button>
              </div>
            </div>

            {/* Segment Contents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {activeSegment === "inquilino" ? (
                servicesInquilinos.map((item, idx) => (
                  <div key={idx} className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-start gap-4">
                    <div className="p-3 bg-[#c0652a]/10 rounded-xl shrink-0">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#4a2e1f]">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))
              ) : (
                servicesSenhorios.map((item, idx) => (
                  <div key={idx} className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-start gap-4">
                    <div className="p-3 bg-[#c0652a]/10 rounded-xl shrink-0">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#4a2e1f]">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Schedule Consultation Section */}
        <section className="py-20 sm:py-28 px-4 bg-gray-50">
          <div className="container md:max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Info Left */}
              <div className="space-y-6">
                <span className="text-xs uppercase font-bold text-[#c0652a] tracking-wider">Consultoria Exclusiva</span>
                <h2 className="text-3xl sm:text-5xl font-bold text-[#4a2e1f] leading-tight">Precisa de assessoria personalizada?</h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg">
                  Agende uma conversa rápida gratuita de 15 minutos com os nossos consultores especializados em mercado angolano. Ajudamos a planejar os seus próximos investimentos ou estruturar a locação do seu condomínio.
                </p>
                
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-500 border border-emerald-100">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#4a2e1f]">Consultoria especializada local</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-500 border border-emerald-100">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#4a2e1f]">Totalmente gratuito e confidencial</span>
                  </div>
                </div>
              </div>

              {/* Consultation Form Right */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm relative">
                {formStatus === "success" && (
                  <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs sm:text-sm border border-emerald-100 flex items-center gap-3 animate-in fade-in duration-300">
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                    <div>
                      <span className="font-bold block">Agendamento Solicitado!</span>
                      <span>Nossos especialistas entrarão em contato nas próximas 2 horas de serviço.</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Eu sou um...</label>
                    <select
                      value={clientType}
                      onChange={(e) => setClientType(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-xs text-[#4a2e1f] cursor-pointer"
                    >
                      <option value="Inquilino">Inquilino à procura de imóvel</option>
                      <option value="Senhorio">Proprietário / Senhorio</option>
                      <option value="Investidor">Investidor de Ativos</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Seu Nome</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Clara António"
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-xs text-[#4a2e1f]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Telefone de Contacto</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: +244 923 000 000"
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-xs text-[#4a2e1f]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Notas adicionais (opcional)</label>
                    <textarea 
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Descreva brevemente suas necessidades..."
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-xs text-[#4a2e1f] resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-3.5 bg-[#402823] hover:bg-[#2f1d16] text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75 cursor-pointer"
                  >
                    <CalendarCheck size={16} />
                    <span>{formStatus === "submitting" ? "Solicitando..." : "Confirmar Solicitação Gratuita"}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
