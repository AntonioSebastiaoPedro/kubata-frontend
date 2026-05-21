"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  UserCheck, 
  Settings, 
  Grid, 
  Users, 
  LogOut 
} from "lucide-react";
import icon from "@/src/assets/images/iconKubata.png";

interface SidebarProps {
  activeTab: "overview" | "proprietarios" | "propriedades" | "clientes" | "definicoes";
  setActiveTab: (tab: "overview" | "proprietarios" | "propriedades" | "clientes" | "definicoes") => void;
  sidebarOpen: boolean;
}

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen }: SidebarProps) {
  return (
    <aside className={`bg-[#402823] text-white flex flex-col justify-between transition-all duration-300 border-r border-[#c0652a]/10 shrink-0 z-40 ${
      sidebarOpen ? "w-64" : "w-20"
    }`}>
      <div className="space-y-8">
        {/* Logo Brand Header */}
        <div className="p-6 flex items-center justify-between border-b border-[#c0652a]/10">
          <div className="flex items-center gap-3">
            <Image src={icon} alt="Kubata Admin" width={32} height={32} className="bg-white/10 p-1.5 rounded-lg" />
            {sidebarOpen && (
              <div className="leading-none">
                <span className="font-extrabold text-base tracking-tight text-white block">Kubata</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#c0652a] block">Super Admin</span>
              </div>
            )}
          </div>
        </div>

        {/* Nav items */}
        <nav className="px-3 space-y-1.5">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-4.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === "overview" ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/15" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Grid size={18} className="shrink-0" />
            {sidebarOpen && <span>Visão Geral</span>}
            {activeTab === "overview" && <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>}
          </button>

          <button
            onClick={() => setActiveTab("proprietarios")}
            className={`w-full flex items-center gap-4.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === "proprietarios" ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/15" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <UserCheck size={18} className="shrink-0" />
            {sidebarOpen && <span>Proprietários</span>}
            {activeTab === "proprietarios" && <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>}
          </button>

          <button
            onClick={() => setActiveTab("propriedades")}
            className={`w-full flex items-center gap-4.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === "propriedades" ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/15" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Building2 size={18} className="shrink-0" />
            {sidebarOpen && <span>Propriedades</span>}
            {activeTab === "propriedades" && <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>}
          </button>

          <button
            onClick={() => setActiveTab("clientes")}
            className={`w-full flex items-center gap-4.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === "clientes" ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/15" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users size={18} className="shrink-0" />
            {sidebarOpen && <span>Clientes</span>}
            {activeTab === "clientes" && <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>}
          </button>

          <button
            onClick={() => setActiveTab("definicoes")}
            className={`w-full flex items-center gap-4.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === "definicoes" ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/15" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings size={18} className="shrink-0" />
            {sidebarOpen && <span>Configurações</span>}
            {activeTab === "definicoes" && <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>}
          </button>
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-[#c0652a]/10">
        <Link href="/" className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <LogOut size={18} className="shrink-0 text-red-400/80" />
          {sidebarOpen && <span>Sair do Painel</span>}
        </Link>
      </div>
    </aside>
  );
}
