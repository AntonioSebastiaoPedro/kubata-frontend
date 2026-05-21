"use client";

import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Proprietario } from "./types";

interface ProprietariosTabProps {
  proprietarios: Proprietario[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  openAddLandlord: () => void;
  openEditLandlord: (item: Proprietario) => void;
  handleDeleteLandlord: (id: number) => void;
}

export default function ProprietariosTab({
  proprietarios,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  openAddLandlord,
  openEditLandlord,
  handleDeleteLandlord
}: ProprietariosTabProps) {
  const getFilteredProprietarios = () => {
    return proprietarios.filter(p => {
      const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "Todos" || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  };

  const filtered = getFilteredProprietarios();

  return (
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
          onClick={openAddLandlord}
          className="px-5 py-2.5 bg-[#c0652a] hover:bg-[#b8561f] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-[#c0652a]/15 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400 font-semibold">Nenhum proprietário encontrado.</td>
                </tr>
              ) : (
                filtered.map((item) => (
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
  );
}
