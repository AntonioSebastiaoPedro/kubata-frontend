"use client";

interface DefinicoesTabProps {
  triggerToast: (msg: string, type: "success" | "danger" | "info") => void;
}

export default function DefinicoesTab({ triggerToast }: DefinicoesTabProps) {
  return (
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
              <input type="checkbox" id="mod1" defaultChecked className="w-4 h-4 text-[#c0652a] rounded focus:ring-[#c0652a] cursor-pointer" />
              <label htmlFor="mod1" className="text-xs text-gray-600 font-semibold cursor-pointer select-none">Exigir verificação do número de telefone antes de agendar visitas.</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="mod2" defaultChecked className="w-4 h-4 text-[#c0652a] rounded focus:ring-[#c0652a] cursor-pointer" />
              <label htmlFor="mod2" className="text-xs text-gray-600 font-semibold cursor-pointer select-none">Notificar corretores por WhatsApp imediatamente após novas propostas.</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="mod3" className="w-4 h-4 text-[#c0652a] rounded focus:ring-[#c0652a] cursor-pointer" />
              <label htmlFor="mod3" className="text-xs text-gray-600 font-semibold cursor-pointer select-none">Aprovar automaticamente anúncios vindos de Proprietários Premium.</label>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button 
            type="button"
            onClick={() => triggerToast("Definições do sistema salvas com sucesso!", "success")}
            className="px-6 py-3 bg-[#c0652a] hover:bg-[#b8561f] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
          >
            Salvar Definições
          </button>
        </div>
      </div>
    </div>
  );
}
