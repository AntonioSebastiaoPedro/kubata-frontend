"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  Globe,
  Share2,
  Shield
} from "lucide-react";
import icon from "@/src/assets/images/iconKubata.png";
import home1 from "@/src/assets/images/home1.jpg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular carregamento e redirecionar
    setTimeout(() => {
      setIsLoading(false);
      router.push("/explore");
    }, 1500);
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
          {/* Logo & Header */}
          <div className="mb-6 text-center lg:text-left">
            <div className="inline-block p-3 rounded-xl bg-gray-50 mb-4 mx-auto lg:mx-0">
                <Image src={icon} alt="Kubata" width={40} height={40} className="h-10 w-auto" />
            </div>
            <h1 className="text-2xl font-bold text-[#4a2e1f] mb-2">Bem-vindo de volta!</h1>
            <p className="text-sm text-gray-500">Aceda à sua conta para gerir as suas propriedades e favoritos.</p>
          </div>

          {/* Social Login */}
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
            <span className="relative px-3 text-[10px] uppercase tracking-widest text-gray-400 bg-white">Ou entre com email</span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Email</label>
              <div className="relative group">
                <input 
                  type="email" 
                  required
                  placeholder="exemplo@gmail.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/30 focus:ring-4 focus:ring-[#c0652a]/10 outline-none transition-all text-sm text-[#4a2e1f]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#4a2e1f] ml-1">Palavra-passe</label>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  placeholder="••••••••"
                  className="w-full px-4 pr-11 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/30 focus:ring-4 focus:ring-[#c0652a]/10 outline-none transition-all text-sm text-[#4a2e1f]"
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

            <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 ml-1" >
				 <input 
                type="checkbox" 
                id="remember" 
                className="w-3.5 h-3.5 rounded border-gray-300 text-[#c0652a] focus:ring-[#c0652a]" 
              />
              <label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer">Manter-me ligado</label>
			 </div>

			   <Link href="#" className="text-[11px] font-semibold text-[#c0652a] hover:underline">Esqueceu a senha?</Link>
              
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#c0652a] text-white rounded-xl font-bold text-base shadow-lg shadow-[#c0652a]/20 hover:bg-[#b8561f] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer"
            >
              {isLoading ? "A carregar..." : "Entrar Agora"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-gray-600 text-xs">
            Ainda não tem conta?{" "}
            <Link href="/register" className="font-bold text-[#c0652a] hover:underline">Crie uma conta gratuita</Link>
          </p>
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