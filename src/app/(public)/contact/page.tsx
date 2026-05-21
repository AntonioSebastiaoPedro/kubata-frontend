"use client";

import { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import TopBar from "@/src/components/layout/TopBar";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API contact call
    setTimeout(() => {
      setStatus("success");
      // Clear form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
      // Reset toast after 5s
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col selection:bg-[#c0652a]/30">
      <TopBar />
      <Header />

      <main className="flex-grow py-12 sm:py-20 px-4">
        <div className="container md:max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs uppercase font-bold text-[#c0652a] tracking-wider bg-[#c0652a]/10 px-3 py-1 rounded-full">
              Fale Connosco
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#4a2e1f]">Estamos aqui para ajudar</h1>
            <p className="text-sm text-gray-500">Tem alguma dúvida sobre propriedades, parcerias ou deseja anunciar? Entre em contacto connosco.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Contact Info Cards (Left - 1 Span) */}
            <div className="space-y-6">
              {/* Address card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex gap-4">
                <div className="p-3.5 bg-[#c0652a]/10 text-[#c0652a] rounded-xl h-fit shrink-0">
                  <MapPin size={22} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#4a2e1f] text-sm sm:text-base">Sede Principal</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Via S8, Condomínio Talatona Plaza, Escritório 14, Talatona, Luanda, Angola.
                  </p>
                </div>
              </div>

              {/* Phone card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex gap-4">
                <div className="p-3.5 bg-[#c0652a]/10 text-[#c0652a] rounded-xl h-fit shrink-0">
                  <Phone size={22} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#4a2e1f] text-sm sm:text-base">Telefone e WhatsApp</h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold">+244 923 888 777</p>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold">+244 934 111 222</p>
                </div>
              </div>

              {/* Email card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex gap-4">
                <div className="p-3.5 bg-[#c0652a]/10 text-[#c0652a] rounded-xl h-fit shrink-0">
                  <Mail size={22} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#4a2e1f] text-sm sm:text-base">E-mail de Suporte</h3>
                  <p className="text-xs sm:text-sm text-gray-500">geral@kubata.com</p>
                  <p className="text-xs sm:text-sm text-gray-500">suporte@kubata.com</p>
                </div>
              </div>

              {/* Working Hours card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex gap-4">
                <div className="p-3.5 bg-[#c0652a]/10 text-[#c0652a] rounded-xl h-fit shrink-0">
                  <Clock size={22} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#4a2e1f] text-sm sm:text-base">Horário de Funcionamento</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Segunda a Sexta: 08:00h às 18:00h</p>
                  <p className="text-xs sm:text-sm text-gray-500">Sábado: 09:00h às 13:00h</p>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form (Right - 2 Spans) */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
              {/* Success Notification Bar */}
              {status === "success" && (
                <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs sm:text-sm border border-emerald-100 flex items-center gap-3 animate-in fade-in duration-300">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  <div>
                    <span className="font-bold block">Mensagem Enviada!</span>
                    <span>Recebemos a sua mensagem e responderemos nas próximas 2 horas comerciais.</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Seu Nome</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João Silva"
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-sm text-[#4a2e1f]"
                    />
                  </div>
                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Seu E-mail</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemplo@dominio.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-sm text-[#4a2e1f]"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Assunto da Mensagem</label>
                  <input 
                    type="text" 
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ex: Dúvida sobre anúncio em Talatona"
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-sm text-[#4a2e1f]"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Mensagem detalhada</label>
                  <textarea 
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escreva a sua mensagem aqui..."
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 focus:ring-4 focus:ring-[#c0652a]/5 outline-none transition-all text-sm text-[#4a2e1f] resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#c0652a] hover:bg-[#b8561f] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#c0652a]/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75 cursor-pointer ml-auto"
                >
                  <Send size={16} />
                  <span>{status === "submitting" ? "Enviando..." : "Enviar Mensagem"}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Fictional/Interactive Google Map Mockup */}
          <div className="mt-16 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative h-96 group">
            {/* Visual representation of an elegant dark map with a styled pinpoint */}
            <div className="absolute inset-0 bg-[#e5e7eb] flex flex-col items-center justify-center p-6 text-center select-none space-y-4">
              {/* Map background style simulated using grids and beautiful visual details */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="relative z-10 space-y-3">
                <div className="inline-flex p-4 rounded-full bg-[#c0652a]/15 text-[#c0652a] border border-[#c0652a]/20 animate-pulse">
                  <MapPin size={32} />
                </div>
                <h3 className="text-lg font-bold text-[#4a2e1f]">Escritório Kubata Talatona</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">Via S8, Condomínio Talatona Plaza, Luanda, Angola</p>
                <div className="pt-2">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="px-6 py-2 bg-[#402823] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#c0652a] transition-all inline-block"
                  >
                    Abrir no Google Maps
                  </a>
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
