"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Users, 
  UserCheck, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  SlidersHorizontal,
  Home,
  LogOut,
  Settings,
  Grid,
  FileText,
  UserPlus,
  ShieldAlert,
  Menu,
  Activity,
  ChevronRight,
  Sparkles
} from "lucide-react";
import icon from "@/src/assets/images/iconKubata.png";
import home1 from "@/src/assets/images/home1.jpg";
import home2 from "@/src/assets/images/home2.jpg";

// Type definitions
interface Proprietario {
  id: number;
  name: string;
  email: string;
  phone: string;
  propertiesCount: number;
  status: "Ativo" | "Pendente" | "Bloqueado";
  dateJoined: string;
}

interface Propriedade {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  ownerName: string;
  status: "Aprovado" | "Pendente" | "Rejeitado";
  views: number;
}

interface Cliente {
  id: number;
  name: string;
  email: string;
  phone: string;
  activeRentals: number;
  status: "Verificado" | "Pendente";
  totalSpent: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "proprietarios" | "propriedades" | "clientes" | "definicoes">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Search/Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  // Mock data states
  const [proprietarios, setProprietarios] = useState<Proprietario[]>([
    { id: 1, name: "Manuel dos Santos", email: "manuel.santos@gmail.com", phone: "+244 923 888 777", propertiesCount: 5, status: "Ativo", dateJoined: "12 Mar 2026" },
    { id: 2, name: "Ana Bela Neto", email: "anabela.neto@hotmail.com", phone: "+244 934 111 222", propertiesCount: 3, status: "Ativo", dateJoined: "05 Abr 2026" },
    { id: 3, name: "Mateus Carvalho", email: "mateus.carv@outlook.com", phone: "+244 912 333 444", propertiesCount: 0, status: "Pendente", dateJoined: "20 Mai 2026" },
    { id: 4, name: "Filomena da Costa", email: "filomena.costa@gmail.com", phone: "+244 921 555 666", propertiesCount: 2, status: "Ativo", dateJoined: "28 Jan 2026" },
    { id: 5, name: "João Lourenço", email: "joao.l@sapo.ao", phone: "+244 944 777 888", propertiesCount: 1, status: "Bloqueado", dateJoined: "15 Fev 2026" }
  ]);

  const [propriedades, setPropriedades] = useState<Propriedade[]>([
    { id: 1, title: "Apartamento Moderno Downtown", location: "Luanda, Centro", price: "250.000 AOA/mês", type: "Apartamento", ownerName: "Manuel dos Santos", status: "Aprovado", views: 345 },
    { id: 2, title: "Vivenda T4 com Piscina", location: "Talatona, Luanda", price: "850.000 AOA/mês", type: "Casa", ownerName: "Ana Bela Neto", status: "Aprovado", views: 512 },
    { id: 3, title: "Loft Industrial", location: "Kilamba, Luanda", price: "180.000 AOA/mês", type: "Apartamento", ownerName: "Manuel dos Santos", status: "Aprovado", views: 231 },
    { id: 4, title: "Escritório Comercial", location: "Ilha de Luanda", price: "450.000 AOA/mês", type: "Comercial", ownerName: "Ana Bela Neto", status: "Pendente", views: 98 },
    { id: 5, title: "Casa Familiar Jardim", location: "Benfica, Luanda", price: "320.000 AOA/mês", type: "Casa", ownerName: "Filomena da Costa", status: "Aprovado", views: 189 },
    { id: 6, title: "Penthouse Exclusiva", location: "Kinaxixi, Luanda", price: "1.200.000 AOA/mês", type: "Apartamento", ownerName: "Manuel dos Santos", status: "Pendente", views: 423 }
  ]);

  const [clientes, setClientes] = useState<Cliente[]>([
    { id: 1, name: "Marcos Sebastião", email: "marcos.seb@gmail.com", phone: "+244 922 444 888", activeRentals: 1, status: "Verificado", totalSpent: "250.000 AOA" },
    { id: 2, name: "Clara de Assis", email: "clara.assis@outlook.com", phone: "+244 931 999 555", activeRentals: 0, status: "Verificado", totalSpent: "0 AOA" },
    { id: 3, name: "Paulo Jorge", email: "paulo.jorge@gmail.com", phone: "+244 919 222 111", activeRentals: 1, status: "Pendente", totalSpent: "850.000 AOA" },
    { id: 4, name: "Sandra Gourgel", email: "sandra.g@hotmail.com", phone: "+244 925 333 777", activeRentals: 2, status: "Verificado", totalSpent: "480.000 AOA" }
  ]);

  // Modal / Form state management
  const [modalType, setModalType] = useState<"landlord" | "property" | "client" | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  // Notification state
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "danger" | "info">("success");

  // Inputs for Add/Edit Landlord
  const [landlordName, setLandlordName] = useState("");
  const [landlordEmail, setLandlordEmail] = useState("");
  const [landlordPhone, setLandlordPhone] = useState("");
  const [landlordStatus, setLandlordStatus] = useState<"Ativo" | "Pendente" | "Bloqueado">("Ativo");

  // Inputs for Add/Edit Property
  const [propertyTitle, setPropertyTitle] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [propertyPrice, setPropertyPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyOwner, setPropertyOwner] = useState("");
  const [propertyStatus, setPropertyStatus] = useState<"Aprovado" | "Pendente" | "Rejeitado">("Pendente");

  // Inputs for Add/Edit Client
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientStatus, setClientStatus] = useState<"Verificado" | "Pendente">("Verificado");

  // Show Toast helper
  const triggerToast = (msg: string, type: "success" | "danger" | "info" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Delete Handlers
  const handleDeleteLandlord = (id: number) => {
    setProprietarios(proprietarios.filter((p) => p.id !== id));
    triggerToast("Proprietário excluído com sucesso!", "danger");
  };

  const handleDeleteProperty = (id: number) => {
    setPropriedades(propriedades.filter((p) => p.id !== id));
    triggerToast("Propriedade excluída com sucesso!", "danger");
  };

  const handleDeleteClient = (id: number) => {
    setClientes(clientes.filter((c) => c.id !== id));
    triggerToast("Cliente excluído com sucesso!", "danger");
  };

  // Approval Handlers
  const handleApproveProperty = (id: number) => {
    setPropriedades(propriedades.map((p) => p.id === id ? { ...p, status: "Aprovado" } : p));
    triggerToast("Propriedade aprovada e publicada no portal!", "success");
  };

  const handleRejectProperty = (id: number) => {
    setPropriedades(propriedades.map((p) => p.id === id ? { ...p, status: "Rejeitado" } : p));
    triggerToast("Propriedade rejeitada com sucesso.", "info");
  };

  // Open modals for editing
  const openEditLandlord = (item: Proprietario) => {
    setIsEditMode(true);
    setSelectedId(item.id);
    setLandlordName(item.name);
    setLandlordEmail(item.email);
    setLandlordPhone(item.phone);
    setLandlordStatus(item.status);
    setModalType("landlord");
  };

  const openEditProperty = (item: Propriedade) => {
    setIsEditMode(true);
    setSelectedId(item.id);
    setPropertyTitle(item.title);
    setPropertyLocation(item.location);
    setPropertyPrice(item.price);
    setPropertyType(item.type);
    setPropertyOwner(item.ownerName);
    setPropertyStatus(item.status);
    setModalType("property");
  };

  const openEditClient = (item: Cliente) => {
    setIsEditMode(true);
    setSelectedId(item.id);
    setClientName(item.name);
    setClientEmail(item.email);
    setClientPhone(item.phone);
    setClientStatus(item.status);
    setModalType("client");
  };

  // Submit Modals Handlers
  const handleLandlordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && selectedId !== null) {
      setProprietarios(proprietarios.map(p => p.id === selectedId ? {
        ...p,
        name: landlordName,
        email: landlordEmail,
        phone: landlordPhone,
        status: landlordStatus
      } : p));
      triggerToast("Dados do proprietário atualizados!");
    } else {
      const newLandlord: Proprietario = {
        id: proprietarios.length + 1,
        name: landlordName,
        email: landlordEmail,
        phone: landlordPhone,
        propertiesCount: 0,
        status: landlordStatus,
        dateJoined: new Date().toLocaleDateString("pt-AO", { day: "2-digit", month: "short", year: "numeric" })
      };
      setProprietarios([newLandlord, ...proprietarios]);
      triggerToast("Novo proprietário registrado com sucesso!");
    }
    closeAllModals();
  };

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && selectedId !== null) {
      setPropriedades(propriedades.map(p => p.id === selectedId ? {
        ...p,
        title: propertyTitle,
        location: propertyLocation,
        price: propertyPrice,
        type: propertyType,
        ownerName: propertyOwner,
        status: propertyStatus
      } : p));
      triggerToast("Dados da propriedade atualizados!");
    } else {
      const newProperty: Propriedade = {
        id: propriedades.length + 1,
        title: propertyTitle,
        location: propertyLocation,
        price: propertyPrice,
        type: propertyType,
        ownerName: propertyOwner,
        status: propertyStatus,
        views: 0
      };
      setPropriedades([newProperty, ...propriedades]);
      triggerToast("Nova propriedade adicionada ao sistema!");
    }
    closeAllModals();
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && selectedId !== null) {
      setClientes(clientes.map(c => c.id === selectedId ? {
        ...c,
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        status: clientStatus
      } : c));
      triggerToast("Dados do cliente atualizados!");
    } else {
      const newClient: Cliente = {
        id: clientes.length + 1,
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        activeRentals: 0,
        status: clientStatus,
        totalSpent: "0 AOA"
      };
      setClientes([newClient, ...clientes]);
      triggerToast("Novo cliente cadastrado com sucesso!");
    }
    closeAllModals();
  };

  const closeAllModals = () => {
    setModalType(null);
    setIsEditMode(false);
    setSelectedId(null);
    
    // Clear Landlord
    setLandlordName("");
    setLandlordEmail("");
    setLandlordPhone("");
    setLandlordStatus("Ativo");
    
    // Clear Property
    setPropertyTitle("");
    setPropertyLocation("");
    setPropertyPrice("");
    setPropertyType("");
    setPropertyOwner("");
    setPropertyStatus("Pendente");
    
    // Clear Client
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setClientStatus("Verificado");
  };

  // Filter lists based on Search & Select status
  const getFilteredProprietarios = () => {
    return proprietarios.filter(p => {
      const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "Todos" || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  };

  const getFilteredPropriedades = () => {
    return propriedades.filter(p => {
      const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "Todos" || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  };

  const getFilteredClientes = () => {
    return clientes.filter(c => {
      const matchesQuery = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "Todos" || c.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  };

  // Reset filter when switching tabs
  useEffect(() => {
    setSearchQuery("");
    setStatusFilter("Todos");
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#fdefeb]/30 flex font-sans selection:bg-[#c0652a]/20">
      
      {/* Dynamic Toast System */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl flex items-center gap-3 border transition-all duration-300 transform translate-y-0 scale-100 ${
          toastType === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-100" :
          toastType === "danger" ? "bg-rose-50 text-rose-800 border-rose-100" :
          "bg-blue-50 text-blue-800 border-blue-100"
        }`}>
          {toastType === "success" && <Check className="w-5 h-5 text-emerald-600 bg-emerald-100 p-0.5 rounded-full" />}
          {toastType === "danger" && <X className="w-5 h-5 text-rose-600 bg-rose-100 p-0.5 rounded-full" />}
          {toastType === "info" && <Activity className="w-5 h-5 text-blue-600 bg-blue-100 p-0.5 rounded-full" />}
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
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
              className={`w-full flex items-center gap-4.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                activeTab === "overview" ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/15" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Grid size={18} className="shrink-0" />
              {sidebarOpen && <span>Visão Geral</span>}
              {activeTab === "overview" && <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>}
            </button>

            <button
              onClick={() => setActiveTab("proprietarios")}
              className={`w-full flex items-center gap-4.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                activeTab === "proprietarios" ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/15" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <UserCheck size={18} className="shrink-0" />
              {sidebarOpen && <span>Proprietários</span>}
              {activeTab === "proprietarios" && <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>}
            </button>

            <button
              onClick={() => setActiveTab("propriedades")}
              className={`w-full flex items-center gap-4.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                activeTab === "propriedades" ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/15" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Building2 size={18} className="shrink-0" />
              {sidebarOpen && <span>Propriedades</span>}
              {activeTab === "propriedades" && <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>}
            </button>

            <button
              onClick={() => setActiveTab("clientes")}
              className={`w-full flex items-center gap-4.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                activeTab === "clientes" ? "bg-[#c0652a] text-white shadow-lg shadow-[#c0652a]/15" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users size={18} className="shrink-0" />
              {sidebarOpen && <span>Clientes</span>}
              {activeTab === "clientes" && <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>}
            </button>

            <button
              onClick={() => setActiveTab("definicoes")}
              className={`w-full flex items-center gap-4.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
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

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Dashboard Top Header Bar */}
        <header className="bg-white border-b border-[#c0652a]/5 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-50 rounded-xl text-gray-500 hover:text-[#c0652a] transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-extrabold text-[#4a2e1f] hidden sm:block">
              {activeTab === "overview" && "Painel Geral Administrativo"}
              {activeTab === "proprietarios" && "Gestão de Proprietários / Senhorios"}
              {activeTab === "propriedades" && "Moderação & Listagem de Imóveis"}
              {activeTab === "clientes" && "Base de Inquilinos & Clientes"}
              {activeTab === "definicoes" && "Definições do Sistema Kubata"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick action shortcuts */}
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setIsEditMode(false);
                  setModalType("property");
                }}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-[#c0652a] hover:bg-[#b8561f] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <Plus size={14} />
                <span>Nova Propriedade</span>
              </button>
            </div>

            {/* Profile Avatar info */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="leading-none text-right hidden sm:block">
                <span className="font-bold text-xs text-[#4a2e1f] block">Super Admin</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">Nível Superior</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#c0652a]/10 border border-[#c0652a]/20 flex items-center justify-center font-bold text-xs text-[#c0652a]">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 p-6 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Quick stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Stat 1 */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Faturamento Estimado</span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#4a2e1f]">4.250.000 AOA</h3>
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-lg w-fit">
                      <TrendingUp size={12} />
                      <span>+12.4% este mês</span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#c0652a]/10 text-[#c0652a] rounded-2xl">
                    <DollarSign size={24} />
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Propriedades Ativas</span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#4a2e1f]">{propriedades.filter(p => p.status === "Aprovado").length} Imóveis</h3>
                    <div className="flex items-center gap-1 text-[#c0652a] text-xs font-semibold">
                      <span>Total de cadastros: {propriedades.length}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#c0652a]/10 text-[#c0652a] rounded-2xl">
                    <Building2 size={24} />
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Proprietários</span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#4a2e1f]">{proprietarios.length} Senhorios</h3>
                    <div className="flex items-center gap-1 text-yellow-600 text-xs font-bold bg-yellow-50 px-2 py-0.5 rounded-lg w-fit">
                      <span>{proprietarios.filter(p => p.status === "Pendente").length} pendentes</span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#c0652a]/10 text-[#c0652a] rounded-2xl">
                    <UserCheck size={24} />
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Clientes Ativos</span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#4a2e1f]">{clientes.length} Inquilinos</h3>
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-lg w-fit">
                      <span>{clientes.filter(c => c.activeRentals > 0).length} contratos</span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#c0652a]/10 text-[#c0652a] rounded-2xl">
                    <Users size={24} />
                  </div>
                </div>
              </div>

              {/* Grid block: Pending Moderation & Quick Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Moderation Panel (2 Columns) */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-xs p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="font-extrabold text-base text-[#4a2e1f]">Imóveis Pendentes de Moderação</h3>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5">Analise e aprove novos anúncios de proprietários antes de publicá-los no portal.</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-50 border border-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">
                      {propriedades.filter(p => p.status === "Pendente").length} Pendentes
                    </span>
                  </div>

                  <div className="space-y-4">
                    {propriedades.filter(p => p.status === "Pendente").length === 0 ? (
                      <div className="text-center py-8 space-y-2 text-gray-400 text-sm">
                        <span>✨</span>
                        <p className="font-semibold">Nenhuma propriedade pendente de aprovação!</p>
                      </div>
                    ) : (
                      propriedades.filter(p => p.status === "Pendente").map((item) => (
                        <div key={item.id} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="space-y-1">
                            <h4 className="font-bold text-[#4a2e1f] text-sm">{item.title}</h4>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
                              <span>📍 {item.location}</span>
                              <span className="text-[#c0652a] font-bold">{item.price}</span>
                              <span>👤 Senhorio: {item.ownerName}</span>
                            </div>
                          </div>
                          
                          {/* Approval Actions */}
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleRejectProperty(item.id)}
                              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1"
                            >
                              <X size={14} />
                              <span>Rejeitar</span>
                            </button>
                            <button 
                              onClick={() => handleApproveProperty(item.id)}
                              className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-1"
                            >
                              <Check size={14} />
                              <span>Aprovar</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Activity Feed / System log (1 Column) */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="font-extrabold text-base text-[#4a2e1f]">Atividades Recentes</h3>
                    <p className="text-xs text-gray-400 font-semibold mt-0.5">Histórico de ações de utilizadores da plataforma Kubata.</p>
                  </div>

                  <div className="space-y-4.5">
                    <div className="flex gap-3 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-1"></div>
                      <div>
                        <p className="text-gray-600 leading-tight">Novo proprietário <strong>Mateus Carvalho</strong> solicitou cadastro administrativo.</p>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Há 10 minutos</span>
                      </div>
                    </div>

                    <div className="flex gap-3 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 mt-1"></div>
                      <div>
                        <p className="text-gray-600 leading-tight">Inquilino <strong>Paulo Jorge</strong> concluiu pré-reserva de visita em Talatona.</p>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Há 1 hora</span>
                      </div>
                    </div>

                    <div className="flex gap-3 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#c0652a] shrink-0 mt-1"></div>
                      <div>
                        <p className="text-gray-600 leading-tight">Propriedade <strong>Vivenda T4 com Piscina</strong> foi marcada como Favorita 12 vezes.</p>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Há 4 horas</span>
                      </div>
                    </div>

                    <div className="flex gap-3 text-xs">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 mt-1"></div>
                      <div>
                        <p className="text-gray-600 leading-tight">Administrador bloqueou a conta de utilizador de <strong>João Lourenço</strong> por spam.</p>
                        <span className="text-[10px] text-gray-400 block mt-0.5">Ontem</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROPRIETARIOS */}
          {activeTab === "proprietarios" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header and Add Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                {/* Search / Filters block */}
                <div className="flex flex-col sm:flex-row items-center gap-3 flex-grow max-w-xl">
                  <div className="w-full relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Pesquise proprietário por nome ou e-mail..."
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none text-xs sm:text-sm font-medium transition-all text-[#4a2e1f]"
                    />
                  </div>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-44 px-3 py-2.5 bg-gray-50 border border-transparent rounded-xl text-xs sm:text-sm font-semibold text-[#4a2e1f] cursor-pointer"
                  >
                    <option value="Todos">Todos os Status</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Bloqueado">Bloqueado</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setIsEditMode(false);
                    setModalType("landlord");
                  }}
                  className="px-5 py-2.5 bg-[#c0652a] hover:bg-[#b8561f] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#c0652a]/15 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Plus size={16} />
                  <span>Adicionar Proprietário</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <th className="p-4 sm:p-5">Nome / Contacto</th>
                        <th className="p-4 sm:p-5">Telefone</th>
                        <th className="p-4 sm:p-5">Imóveis Ativos</th>
                        <th className="p-4 sm:p-5">Data de Ingresso</th>
                        <th className="p-4 sm:p-5">Status</th>
                        <th className="p-4 sm:p-5 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-xs sm:text-sm">
                      {getFilteredProprietarios().length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-400 font-semibold">Nenhum proprietário encontrado.</td>
                        </tr>
                      ) : (
                        getFilteredProprietarios().map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 sm:p-5">
                              <div className="space-y-0.5">
                                <span className="font-bold text-[#4a2e1f] block">{item.name}</span>
                                <span className="text-[10px] text-gray-400 block font-medium">{item.email}</span>
                              </div>
                            </td>
                            <td className="p-4 sm:p-5 text-gray-600 font-semibold">{item.phone}</td>
                            <td className="p-4 sm:p-5 text-center font-bold text-[#4a2e1f]">
                              <span className="inline-block px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-black">
                                {item.propertiesCount}
                              </span>
                            </td>
                            <td className="p-4 sm:p-5 text-gray-500 font-medium">{item.dateJoined}</td>
                            <td className="p-4 sm:p-5">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide border ${
                                item.status === "Ativo" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                item.status === "Pendente" ? "bg-yellow-50 text-yellow-700 border-yellow-100" :
                                "bg-rose-50 text-rose-700 border-rose-100"
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="p-4 sm:p-5">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => openEditLandlord(item)}
                                  className="p-2 hover:bg-[#c0652a]/10 hover:text-[#c0652a] rounded-xl text-gray-400 transition-colors cursor-pointer"
                                  title="Editar"
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteLandlord(item.id)}
                                  className="p-2 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-gray-400 transition-colors cursor-pointer"
                                  title="Deletar"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROPRIEDADES */}
          {activeTab === "propriedades" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header and Add Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                {/* Search / Filters block */}
                <div className="flex flex-col sm:flex-row items-center gap-3 flex-grow max-w-xl">
                  <div className="w-full relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Pesquise propriedade por título ou local..."
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none text-xs sm:text-sm font-medium transition-all text-[#4a2e1f]"
                    />
                  </div>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-44 px-3 py-2.5 bg-gray-50 border border-transparent rounded-xl text-xs sm:text-sm font-semibold text-[#4a2e1f] cursor-pointer"
                  >
                    <option value="Todos">Todos os Status</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Rejeitado">Rejeitado</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setIsEditMode(false);
                    setModalType("property");
                  }}
                  className="px-5 py-2.5 bg-[#c0652a] hover:bg-[#b8561f] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#c0652a]/15 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Plus size={16} />
                  <span>Nova Propriedade</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <th className="p-4 sm:p-5">Propriedade</th>
                        <th className="p-4 sm:p-5">Localização</th>
                        <th className="p-4 sm:p-5">Preço / Investimento</th>
                        <th className="p-4 sm:p-5">Proprietário</th>
                        <th className="p-4 sm:p-5">Tipo</th>
                        <th className="p-4 sm:p-5">Status</th>
                        <th className="p-4 sm:p-5 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-xs sm:text-sm">
                      {getFilteredPropriedades().length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-gray-400 font-semibold">Nenhuma propriedade encontrada.</td>
                        </tr>
                      ) : (
                        getFilteredPropriedades().map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 sm:p-5">
                              <div className="space-y-0.5">
                                <span className="font-bold text-[#4a2e1f] block">{item.title}</span>
                                <span className="text-[10px] text-gray-400 block font-semibold">👁️ {item.views} visualizações</span>
                              </div>
                            </td>
                            <td className="p-4 sm:p-5 text-gray-600 font-semibold">📍 {item.location}</td>
                            <td className="p-4 sm:p-5 text-[#c0652a] font-extrabold">{item.price}</td>
                            <td className="p-4 sm:p-5 text-gray-500 font-medium">{item.ownerName}</td>
                            <td className="p-4 sm:p-5 font-bold text-[#4a2e1f]">{item.type}</td>
                            <td className="p-4 sm:p-5">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide border ${
                                item.status === "Aprovado" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                item.status === "Pendente" ? "bg-yellow-50 text-yellow-700 border-yellow-100" :
                                "bg-rose-50 text-rose-700 border-rose-100"
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="p-4 sm:p-5">
                              <div className="flex items-center justify-end gap-1.5">
                                {item.status === "Pendente" && (
                                  <>
                                    <button 
                                      onClick={() => handleRejectProperty(item.id)}
                                      className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                                      title="Rejeitar"
                                    >
                                      <X size={14} />
                                    </button>
                                    <button 
                                      onClick={() => handleApproveProperty(item.id)}
                                      className="p-2 bg-emerald-500 text-white hover:bg-emerald-600 rounded-xl transition-colors shadow-xs cursor-pointer"
                                      title="Aprovar"
                                    >
                                      <Check size={14} />
                                    </button>
                                  </>
                                )}
                                <button 
                                  onClick={() => openEditProperty(item)}
                                  className="p-2 hover:bg-[#c0652a]/10 hover:text-[#c0652a] rounded-xl text-gray-400 transition-colors cursor-pointer"
                                  title="Editar"
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProperty(item.id)}
                                  className="p-2 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-gray-400 transition-colors cursor-pointer"
                                  title="Deletar"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CLIENTES */}
          {activeTab === "clientes" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header and Add Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
                {/* Search / Filters block */}
                <div className="flex flex-col sm:flex-row items-center gap-3 flex-grow max-w-xl">
                  <div className="w-full relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Pesquise cliente por nome ou e-mail..."
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none text-xs sm:text-sm font-medium transition-all text-[#4a2e1f]"
                    />
                  </div>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-44 px-3 py-2.5 bg-gray-50 border border-transparent rounded-xl text-xs sm:text-sm font-semibold text-[#4a2e1f] cursor-pointer"
                  >
                    <option value="Todos">Todos os Status</option>
                    <option value="Verificado">Verificado</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setIsEditMode(false);
                    setModalType("client");
                  }}
                  className="px-5 py-2.5 bg-[#c0652a] hover:bg-[#b8561f] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#c0652a]/15 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Plus size={16} />
                  <span>Adicionar Cliente</span>
                </button>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <th className="p-4 sm:p-5">Nome / Contacto</th>
                        <th className="p-4 sm:p-5">Telefone</th>
                        <th className="p-4 sm:p-5">Arrendamentos Activos</th>
                        <th className="p-4 sm:p-5">Valor Investido</th>
                        <th className="p-4 sm:p-5">Status</th>
                        <th className="p-4 sm:p-5 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-xs sm:text-sm">
                      {getFilteredClientes().length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-400 font-semibold">Nenhum cliente encontrado.</td>
                        </tr>
                      ) : (
                        getFilteredClientes().map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 sm:p-5">
                              <div className="space-y-0.5">
                                <span className="font-bold text-[#4a2e1f] block">{item.name}</span>
                                <span className="text-[10px] text-gray-400 block font-medium">{item.email}</span>
                              </div>
                            </td>
                            <td className="p-4 sm:p-5 text-gray-600 font-semibold">{item.phone}</td>
                            <td className="p-4 sm:p-5 text-center font-bold text-[#4a2e1f]">{item.activeRentals}</td>
                            <td className="p-4 sm:p-5 text-gray-500 font-medium font-mono">{item.totalSpent}</td>
                            <td className="p-4 sm:p-5">
                              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide border ${
                                item.status === "Verificado" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                "bg-yellow-50 text-yellow-700 border-yellow-100"
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="p-4 sm:p-5">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => openEditClient(item)}
                                  className="p-2 hover:bg-[#c0652a]/10 hover:text-[#c0652a] rounded-xl text-gray-400 transition-colors cursor-pointer"
                                  title="Editar"
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteClient(item.id)}
                                  className="p-2 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-gray-400 transition-colors cursor-pointer"
                                  title="Deletar"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DEFINICOES */}
          {activeTab === "definicoes" && (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
              
              <div className="border-b border-gray-100 pb-4">
                <h3 className="font-extrabold text-[#4a2e1f] text-lg">Definições Gerais da Plataforma</h3>
                <p className="text-xs text-gray-500 font-medium">Controle as regras de negócios, e-mails de notificação e taxas operacionais do Kubata.</p>
              </div>

              {/* Form elements */}
              <div className="space-y-6 text-sm">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#4a2e1f]">Nome do Portal</label>
                    <input 
                      type="text" 
                      defaultValue="Kubata Imobiliária Angola" 
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl outline-none font-medium text-[#4a2e1f] text-xs sm:text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#4a2e1f]">E-mail Remetente do Sistema</label>
                    <input 
                      type="email" 
                      defaultValue="sistema@kubata.com" 
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl outline-none font-medium text-[#4a2e1f] text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#4a2e1f]">Taxa de Corretagem (%)</label>
                    <input 
                      type="number" 
                      defaultValue={10} 
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl outline-none font-medium text-[#4a2e1f] text-xs sm:text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#4a2e1f]">Limite de Fotos por Anúncio</label>
                    <input 
                      type="number" 
                      defaultValue={15} 
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl outline-none font-medium text-[#4a2e1f] text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-xs font-bold text-[#4a2e1f] block">Regras de Moderação Automática</label>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="mod1" defaultChecked className="w-4 h-4 text-[#c0652a] rounded focus:ring-[#c0652a]" />
                      <label htmlFor="mod1" className="text-xs text-gray-600 font-semibold cursor-pointer">Exigir verificação do número de telefone antes de agendar visitas.</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="mod2" defaultChecked className="w-4 h-4 text-[#c0652a] rounded focus:ring-[#c0652a]" />
                      <label htmlFor="mod2" className="text-xs text-gray-600 font-semibold cursor-pointer">Notificar corretores por WhatsApp imediatamente após novas propostas.</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="mod3" className="w-4 h-4 text-[#c0652a] rounded focus:ring-[#c0652a]" />
                      <label htmlFor="mod3" className="text-xs text-gray-600 font-semibold cursor-pointer">Aprovar automaticamente anúncios vindos de Proprietários Premium.</label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={() => triggerToast("Definições do sistema salvas com sucesso!", "success")}
                    className="px-6 py-3 bg-[#c0652a] hover:bg-[#b8561f] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    Salvar Definições
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL SYSTEM: LANDLORD FORM */}
      {/* ========================================================================= */}
      {modalType === "landlord" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-md w-full overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base sm:text-lg text-[#4a2e1f]">
                {isEditMode ? "Editar Proprietário" : "Cadastrar Novo Proprietário"}
              </h3>
              <button onClick={closeAllModals} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-rose-500 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleLandlordSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-[#4a2e1f] ml-1">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={landlordName}
                  onChange={(e) => setLandlordName(e.target.value)}
                  placeholder="Ex: Manuel dos Santos"
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#4a2e1f] ml-1">Endereço de E-mail</label>
                <input 
                  type="email" 
                  required
                  value={landlordEmail}
                  onChange={(e) => setLandlordEmail(e.target.value)}
                  placeholder="exemplo@gmail.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#4a2e1f] ml-1">Número de Telefone</label>
                <input 
                  type="tel" 
                  required
                  value={landlordPhone}
                  onChange={(e) => setLandlordPhone(e.target.value)}
                  placeholder="Ex: +244 923 888 777"
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#4a2e1f] ml-1">Status Administrativo</label>
                <select
                  value={landlordStatus}
                  onChange={(e) => setLandlordStatus(e.target.value as any)}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f] cursor-pointer"
                >
                  <option value="Ativo">Ativo / Aprovado</option>
                  <option value="Pendente">Aguardando Aprovação (Pendente)</option>
                  <option value="Bloqueado">Bloqueado / Suspenso</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={closeAllModals}
                  className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl font-bold text-xs cursor-pointer active:scale-95 transition-all text-[#4a2e1f]"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-[#c0652a] hover:bg-[#b8561f] text-white font-bold rounded-xl text-xs shadow-md shadow-[#c0652a]/15 cursor-pointer active:scale-95 transition-all"
                >
                  {isEditMode ? "Atualizar" : "Cadastrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL SYSTEM: PROPERTY FORM */}
      {/* ========================================================================= */}
      {modalType === "property" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-md w-full overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base sm:text-lg text-[#4a2e1f]">
                {isEditMode ? "Editar Propriedade" : "Adicionar Nova Propriedade"}
              </h3>
              <button onClick={closeAllModals} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-rose-500 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePropertySubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-[#4a2e1f] ml-1">Título do Anúncio</label>
                <input 
                  type="text" 
                  required
                  value={propertyTitle}
                  onChange={(e) => setPropertyTitle(e.target.value)}
                  placeholder="Ex: Vivenda T4 com Piscina"
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#4a2e1f] ml-1">Localização (Bairro / Cidade)</label>
                <input 
                  type="text" 
                  required
                  value={propertyLocation}
                  onChange={(e) => setPropertyLocation(e.target.value)}
                  placeholder="Ex: Talatona, Luanda"
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#4a2e1f] ml-1">Preço Mensal</label>
                  <input 
                    type="text" 
                    required
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(e.target.value)}
                    placeholder="Ex: 350.000 AOA/mês"
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#4a2e1f] ml-1">Tipo de Imóvel</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f] cursor-pointer"
                  >
                    <option value="">Selecione...</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Vivenda / Casa</option>
                    <option value="Comercial">Escritório / Loja</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#4a2e1f] ml-1">Proprietário</label>
                  <input 
                    type="text" 
                    required
                    value={propertyOwner}
                    onChange={(e) => setPropertyOwner(e.target.value)}
                    placeholder="Ex: Manuel dos Santos"
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#4a2e1f] ml-1">Status de Publicação</label>
                  <select
                    value={propertyStatus}
                    onChange={(e) => setPropertyStatus(e.target.value as any)}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f] cursor-pointer"
                  >
                    <option value="Pendente">Aguardando Aprovação (Pendente)</option>
                    <option value="Aprovado">Aprovado & Publicado</option>
                    <option value="Rejeitado">Rejeitado / Reprovado</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={closeAllModals}
                  className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl font-bold text-xs cursor-pointer active:scale-95 transition-all text-[#4a2e1f]"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-[#c0652a] hover:bg-[#b8561f] text-white font-bold rounded-xl text-xs shadow-md shadow-[#c0652a]/15 cursor-pointer active:scale-95 transition-all"
                >
                  {isEditMode ? "Atualizar" : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL SYSTEM: CLIENT FORM */}
      {/* ========================================================================= */}
      {modalType === "client" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-md w-full overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base sm:text-lg text-[#4a2e1f]">
                {isEditMode ? "Editar Cliente" : "Cadastrar Novo Cliente"}
              </h3>
              <button onClick={closeAllModals} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-rose-500 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleClientSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-[#4a2e1f] ml-1">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ex: Marcos Sebastião"
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#4a2e1f] ml-1">Endereço de E-mail</label>
                <input 
                  type="email" 
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="cliente@gmail.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#4a2e1f] ml-1">Número de Telefone</label>
                <input 
                  type="tel" 
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Ex: +244 922 444 888"
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#4a2e1f] ml-1">Status do Cliente</label>
                <select
                  value={clientStatus}
                  onChange={(e) => setClientStatus(e.target.value as any)}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f] cursor-pointer"
                >
                  <option value="Verificado">Perfil Verificado</option>
                  <option value="Pendente">Perfil sob Análise (Pendente)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={closeAllModals}
                  className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl font-bold text-xs cursor-pointer active:scale-95 transition-all text-[#4a2e1f]"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-[#c0652a] hover:bg-[#b8561f] text-white font-bold rounded-xl text-xs shadow-md shadow-[#c0652a]/15 cursor-pointer active:scale-95 transition-all"
                >
                  {isEditMode ? "Atualizar" : "Cadastrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
