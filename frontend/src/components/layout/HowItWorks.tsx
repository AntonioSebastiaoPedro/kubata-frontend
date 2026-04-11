"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Como faço para registar uma conta na Kubata?",
        answer: "O registro é simples! Clique em 'Registar' no topo da página, preencha seus dados (nome, email, telefone) e crie uma senha. Você receberá um email de confirmação para ativar sua conta.",
    },
    {
        question: "Quais são as formas de pagamento disponíveis?",
        answer: "Aceitamos transferências bancárias, depósitos em dinheiro, cartões de crédito/débito e parcerias com instituições financeiras. Você pode escolher a forma mais conveniente no momento da transação.",
    },
    {
        question: "Posso agendar uma visita mesmo fora do horário comercial?",
        answer: "Sim! Você pode agendar visitas através da plataforma a qualquer momento. Nossos agentes confirmam os horários disponíveis e entram em contato para ajustar conforme sua disponibilidade.",
    },
    {
        question: "Quanto tempo leva o processo de aluguel?",
        answer: "O processo típico leva entre 3 a 7 dias úteis após a aprovação. Isso inclui verificação de documentos, vistoria da propriedade e assinatura do contrato.",
    },
    {
        question: "A Kubata oferece garantia ou proteção ao inquilino?",
        answer: "Sim! Oferecemos proteção completa com depósito de caução, seguro de propriedade e mediação em caso de disputas. Todas as transações são seguras e registadas legalmente.",
    },
    {
        question: "Como faço para listar minha propriedade na Kubata?",
        answer: "Faça login em sua conta, acesse 'Minhas Propriedades' e clique em 'Adicionar Nova'. Preencha os detalhes, adicione fotos e aceite nossos termos. Nossa equipe revisa e publica em até 24 horas.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-4 bg-white">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-medium text-[#4a2e1f] mb-4">
                        Perguntas Frequentes
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Encontre respostas para as dúvidas mais comuns sobre a Kubata
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4 mb-12">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#c0652a] transition-colors"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <h3 className="text-left text-lg font-medium text-[#4a2e1f]">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    size={24}
                                    className={`text-[#c0652a] shrink-0 transition-transform duration-300 ${
                                        openIndex === index ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {openIndex === index && (
                                <div className="px-6 py-4 bg-white border-t border-gray-200">
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
