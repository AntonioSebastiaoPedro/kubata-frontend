"use client";

import { X } from "lucide-react";

interface LandlordModalProps {
  isOpen: boolean;
  isEditMode: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  status: "Ativo" | "Pendente" | "Bloqueado";
  setStatus: (v: "Ativo" | "Pendente" | "Bloqueado") => void;
}

export function LandlordModal({
  isOpen,
  isEditMode,
  onClose,
  onSubmit,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  status,
  setStatus
}: LandlordModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-md w-full overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-extrabold text-base sm:text-lg text-[#4a2e1f]">
            {isEditMode ? "Editar Proprietário" : "Cadastrar Novo Proprietário"}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-rose-500 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <label className="font-bold text-[#4a2e1f] ml-1">Nome Completo</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Manuel dos Santos"
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#4a2e1f] ml-1">Endereço de E-mail</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@gmail.com"
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#4a2e1f] ml-1">Número de Telefone</label>
            <input 
              type="tel" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: +244 923 888 777"
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#4a2e1f] ml-1">Status Administrativo</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
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
              onClick={onClose}
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
  );
}

interface PropertyModalProps {
  isOpen: boolean;
  isEditMode: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  setTitle: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  owner: string;
  setOwner: (v: string) => void;
  status: "Aprovado" | "Pendente" | "Rejeitado";
  setStatus: (v: "Aprovado" | "Pendente" | "Rejeitado") => void;
}

export function PropertyModal({
  isOpen,
  isEditMode,
  onClose,
  onSubmit,
  title,
  setTitle,
  location,
  setLocation,
  price,
  setPrice,
  type,
  setType,
  owner,
  setOwner,
  status,
  setStatus
}: PropertyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-md w-full overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-extrabold text-base sm:text-lg text-[#4a2e1f]">
            {isEditMode ? "Editar Propriedade" : "Adicionar Nova Propriedade"}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-rose-500 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <label className="font-bold text-[#4a2e1f] ml-1">Título do Anúncio</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Vivenda T4 com Piscina"
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#4a2e1f] ml-1">Localização (Bairro / Cidade)</label>
            <input 
              type="text" 
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 350.000 AOA/mês"
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-[#4a2e1f] ml-1">Tipo de Imóvel</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
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
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="Ex: Manuel dos Santos"
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-[#4a2e1f] ml-1">Status de Publicação</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
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
              onClick={onClose}
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
  );
}

interface ClientModalProps {
  isOpen: boolean;
  isEditMode: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  status: "Verificado" | "Pendente";
  setStatus: (v: "Verificado" | "Pendente") => void;
}

export function ClientModal({
  isOpen,
  isEditMode,
  onClose,
  onSubmit,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  status,
  setStatus
}: ClientModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-md w-full overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-extrabold text-base sm:text-lg text-[#4a2e1f]">
            {isEditMode ? "Editar Cliente" : "Cadastrar Novo Cliente"}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-rose-500 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <label className="font-bold text-[#4a2e1f] ml-1">Nome Completo</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Marcos Sebastião"
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#4a2e1f] ml-1">Endereço de E-mail</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cliente@gmail.com"
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#4a2e1f] ml-1">Número de Telefone</label>
            <input 
              type="tel" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: +244 922 444 888"
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f]"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#4a2e1f] ml-1">Status do Cliente</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#c0652a]/20 outline-none transition-all text-xs font-semibold text-[#4a2e1f] cursor-pointer"
            >
              <option value="Verificado">Perfil Verificado</option>
              <option value="Pendente">Perfil sob Análise (Pendente)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
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
  );
}
