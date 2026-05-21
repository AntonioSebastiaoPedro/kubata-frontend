"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Globe,
  Share2,
  User,
  Phone,
  CheckCircle2
} from "lucide-react";
import icon from "@/src/assets/images/iconKubata.png";
import home1 from "@/src/assets/images/home1.jpg";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API registration call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white selection:bg-[#c0652a]/30">
      {/* Left Section - Form */}
      <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12 relative overflow-y-auto">
        {/* Back Button */}
        <Link 
          href="/" 
          className="absolute top-6 left-6 flex items-center gap-2 text-xs text-gray-500 hover:text-[#c0652a] transition-colors group"
        >
          <div className="p-1.5 rounded-full bg-gray-50 group-hover:bg-[#c0652a]/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="font-medium">Voltar</span>
        </Link>

        <div className="w-full max-w-md">
          {isSuccess ? (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500 py-8">
              <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 mb-2">
                <CheckCircle2 size={48} className="animate-bounce" />
              </div>
              <h1 className="text-2xl font-bold text-[#4a2e1f]">Conta Criada com Sucesso!</h1>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
                Enviamos um link de confirmação para o seu email. Por favor, verifique a sua caixa de entrada para ativar a sua conta Kubata.
              </p>
              <div className="pt-4">
                <Link 
                  href="/login" 
                  className="px-8 py-3.5 bg-[#c0652a] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#c0652a]/20 hover:bg-[#b8561f] transition-all inline-block"
                >
                  Ir para o Login
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Logo & Header */}
              <div className="mb-6 text-center lg:text-left mt-8 lg:mt-0">
                <div className="inline-block p-3 rounded-xl bg-gray-50 mb-4 mx-auto lg:mx-0">
                    <Image src={icon} alt="Kubata" width={40} height={40} className="h-10 w-auto" />
                </div>
                <h1 className="text-2xl font-bold text-[#4a2e1f] mb-2">Crie a sua conta gratuita</h1>
                <p className="text-sm text-gray-500">Junte-se à maior comunidade de imóveis em Angola.</p>
              </div>

              {/* Social Signup */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-[#4a2e1f] active:scale-95 cursor-pointer">
                  <Globe size={18} className="text-blue-500" />
                  <span className="text-xs">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-[#4a2e1f] active:scale-95 cursor-pointer">
                  <Share2 size={18} className="text-blue-600" />
                  <span className="text-xs">Facebook</span>
                </button>
              </div>

              <div className="relative mb-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <span className="relative px-3 text-[10px] uppercase tracking-widest text-gray-400 bg-white">Ou registre-se com email</span>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Nome Completo</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Mateus Pedro"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/30 focus:ring-4 focus:ring-[#c0652a]/10 outline-none transition-all text-sm text-[#4a2e1f]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Email</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email" 
                      required
                      placeholder="seuemail@gmail.com"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/30 focus:ring-4 focus:ring-[#c0652a]/10 outline-none transition-all text-sm text-[#4a2e1f]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Número de Telefone</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="tel" 
                      required
                      placeholder="Ex: +244 923 000 000"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/30 focus:ring-4 focus:ring-[#c0652a]/10 outline-none transition-all text-sm text-[#4a2e1f]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Palavra-passe</label>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      placeholder="Mínimo 8 caracteres"
                      className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/30 focus:ring-4 focus:ring-[#c0652a]/10 outline-none transition-all text-sm text-[#4a2e1f]"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#c0652a] transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 ml-1 pt-1">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    required
                    className="w-4 h-4 rounded border-gray-300 text-[#c0652a] focus:ring-[#c0652a] mt-0.5" 
                  />
                  <label htmlFor="terms" className="text-[11px] text-gray-500 cursor-pointer leading-tight">
                    Ao registrar-se, você concorda com os nossos <Link href="#" className="font-semibold text-[#c0652a] hover:underline">Termos de Serviço</Link> e <Link href="#" className="font-semibold text-[#c0652a] hover:underline">Política de Privacidade</Link>.
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#c0652a] text-white rounded-xl font-bold text-base shadow-lg shadow-[#c0652a]/20 hover:bg-[#b8561f] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4 cursor-pointer"
                >
                  {isLoading ? "Criando Conta..." : "Criar Minha Conta"}
                </button>
              </form>

              {/* Footer */}
              <p className="mt-6 text-center text-gray-600 text-xs pb-4">
                Já tem uma conta?{" "}
                <Link href="/login" className="font-bold text-[#c0652a] hover:underline">Entrar na minha conta</Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right Section - Image & Branding */}
      <div className="hidden lg:block relative overflow-hidden bg-[#402823]">
        <Image 
          src={home1} 
          alt="Kubata Interior" 
          fill 
          className="object-cover opacity-60 scale-105"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-[#402823]/80 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <div className="max-w-md">
            <h2 className="text-4xl font-medium mb-4 leading-tight">Encontre o lugar onde a sua história continua.</h2>
            <p className="text-base text-white/80 leading-relaxed mb-8">
              Fazemos parte de milhares de famílias em Angola, conectando sonhos a lares reais e seguros.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
