"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Menu,
  Check,
  X,
  Activity
} from "lucide-react";

// Modular admin components
import Sidebar from "@/src/components/admin/Sidebar";
import OverviewTab from "@/src/components/admin/OverviewTab";
import ProprietariosTab from "@/src/components/admin/ProprietariosTab";
import PropriedadesTab from "@/src/components/admin/PropriedadesTab";
import ClientesTab from "@/src/components/admin/ClientesTab";
import DefinicoesTab from "@/src/components/admin/DefinicoesTab";
import { LandlordModal, PropertyModal, ClientModal } from "@/src/components/admin/Modals";

// Shared Types
import { Proprietario, Propriedade, Cliente } from "@/src/components/admin/types";

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
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        sidebarOpen={sidebarOpen} 
      />

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Dashboard Top Header Bar */}
        <header className="bg-white border-b border-[#c0652a]/5 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-50 rounded-xl text-gray-500 hover:text-[#c0652a] transition-colors cursor-pointer"
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
          {activeTab === "overview" && (
            <OverviewTab 
              proprietarios={proprietarios}
              propriedades={propriedades}
              clientes={clientes}
              handleApproveProperty={handleApproveProperty}
              handleRejectProperty={handleRejectProperty}
            />
          )}

          {activeTab === "proprietarios" && (
            <ProprietariosTab 
              proprietarios={proprietarios}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              openAddLandlord={() => {
                setIsEditMode(false);
                setModalType("landlord");
              }}
              openEditLandlord={openEditLandlord}
              handleDeleteLandlord={handleDeleteLandlord}
            />
          )}

          {activeTab === "propriedades" && (
            <PropriedadesTab 
              propriedades={propriedades}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              openAddProperty={() => {
                setIsEditMode(false);
                setModalType("property");
              }}
              openEditProperty={openEditProperty}
              handleDeleteProperty={handleDeleteProperty}
              handleApproveProperty={handleApproveProperty}
              handleRejectProperty={handleRejectProperty}
            />
          )}

          {activeTab === "clientes" && (
            <ClientesTab 
              clientes={clientes}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              openAddClient={() => {
                setIsEditMode(false);
                setModalType("client");
              }}
              openEditClient={openEditClient}
              handleDeleteClient={handleDeleteClient}
            />
          )}

          {activeTab === "definicoes" && (
            <DefinicoesTab 
              triggerToast={triggerToast}
            />
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODALS RENDER ORCHESTRATOR */}
      {/* ========================================================================= */}
      <LandlordModal 
        isOpen={modalType === "landlord"}
        isEditMode={isEditMode}
        onClose={closeAllModals}
        onSubmit={handleLandlordSubmit}
        name={landlordName}
        setName={setLandlordName}
        email={landlordEmail}
        setEmail={setLandlordEmail}
        phone={landlordPhone}
        setPhone={setLandlordPhone}
        status={landlordStatus}
        setStatus={setLandlordStatus}
      />

      <PropertyModal 
        isOpen={modalType === "property"}
        isEditMode={isEditMode}
        onClose={closeAllModals}
        onSubmit={handlePropertySubmit}
        title={propertyTitle}
        setTitle={setPropertyTitle}
        location={propertyLocation}
        setLocation={setPropertyLocation}
        price={propertyPrice}
        setPrice={setPropertyPrice}
        type={propertyType}
        setType={setPropertyType}
        owner={propertyOwner}
        setOwner={setPropertyOwner}
        status={propertyStatus}
        setStatus={setPropertyStatus}
      />

      <ClientModal 
        isOpen={modalType === "client"}
        isEditMode={isEditMode}
        onClose={closeAllModals}
        onSubmit={handleClientSubmit}
        name={clientName}
        setName={setClientName}
        email={clientEmail}
        setEmail={setClientEmail}
        phone={clientPhone}
        setPhone={setClientPhone}
        status={clientStatus}
        setStatus={setClientStatus}
      />

    </div>
  );
}
