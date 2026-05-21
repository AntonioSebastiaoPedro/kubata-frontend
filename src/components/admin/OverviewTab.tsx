"use client";

import { 
  Building2, 
  UserCheck, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Check, 
  X, 
  Activity 
} from "lucide-react";
import { Proprietario, Propriedade, Cliente } from "./types";

interface OverviewTabProps {
  proprietarios: Proprietario[];
  propriedades: Propriedade[];
  clientes: Cliente[];
  handleApproveProperty: (id: number) => void;
  handleRejectProperty: (id: number) => void;
}

export default function OverviewTab({
  proprietarios,
  propriedades,
  clientes,
  handleApproveProperty,
  handleRejectProperty
}: OverviewTabProps) {
  const pendingProperties = propriedades.filter(p => p.status === "Pendente");
  const activePropertiesCount = propriedades.filter(p => p.status === "Aprovado").length;
  const pendingOwnersCount = proprietarios.filter(p => p.status === "Pendente").length;
  const activeRentalsCount = clientes.filter(c => c.activeRentals > 0).length;

  return (
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
            <h3 className="text-xl sm:text-2xl font-black text-[#4a2e1f]">{activePropertiesCount} Imóveis</h3>
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
              <span>{pendingOwnersCount} pendentes</span>
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
              <span>{activeRentalsCount} contratos</span>
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
              {pendingProperties.length} Pendentes
            </span>
          </div>

          <div className="space-y-4">
            {pendingProperties.length === 0 ? (
              <div className="text-center py-8 space-y-2 text-gray-400 text-sm">
                <span>✨</span>
                <p className="font-semibold">Nenhuma propriedade pendente de aprovação!</p>
              </div>
            ) : (
              pendingProperties.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-in fade-in duration-300">
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
  );
}
