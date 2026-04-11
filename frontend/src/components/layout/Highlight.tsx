import Image from "next/image";
import home from "@/src/assets/images/home1.jpg";
import { Home, Building, Warehouse } from "lucide-react";

export default function Highlight() {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
                <div className="flex items-center justify-between gap-8 lg:gap-12">
                    {/* Left - Content */}
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-medium text-[#4a2e1f] mb-4">
                            Encontre o Lar dos seus Sonhos
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Descubra propriedades exclusivas selecionadas especialmente para você. 
                            Da confortável casa nos subúrbios ao elegante apartamento no centro, 
                            temos a propriedade perfeita que se encaixa no seu estilo de vida.
                        </p>
                    </div>

                    {/* Center - Image */}
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src={home}
                                alt="Propriedade em Destaque"
                                width={400}
                                height={400}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>
                    </div>

                    {/* Right - Categories */}
                    <div className="flex-1 space-y-6">
                        <div className="space-y-3">
                            {/* Category 1 */}
                            <button className="w-full group flex items-start gap-3 pb-3 border-b border-gray-300 hover:border-[#c0652a] transition-colors text-left">
                                <Home size={20} className="text-[#c0652a] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium text-[#4a2e1f] group-hover:text-[#c0652a] transition-colors">
                                        Apartamentos Urbanos
                                    </h3>
                                    <p className="text-xs text-gray-500">120 propriedades</p>
                                </div>
                            </button>

                            {/* Category 2 */}
                            <button className="w-full group flex items-start gap-3 pb-3 border-b border-gray-300 hover:border-[#c0652a] transition-colors text-left">
                                <Building size={20} className="text-[#c0652a] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium text-[#4a2e1f] group-hover:text-[#c0652a] transition-colors">
                                        Casas Familiares
                                    </h3>
                                    <p className="text-xs text-gray-500">85 propriedades</p>
                                </div>
                            </button>

                            {/* Category 3 */}
                            <button className="w-full group flex items-start gap-3 pb-3 border-b border-gray-300 hover:border-[#c0652a] transition-colors text-left">
                                <Warehouse size={20} className="text-[#c0652a] mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium text-[#4a2e1f] group-hover:text-[#c0652a] transition-colors">
                                        Espaços Comerciais
                                    </h3>
                                    <p className="text-xs text-gray-500">45 propriedades</p>
                                </div>
                            </button>
                        </div>

                        {/* CTA Button */}
                        <button className="w-full px-6 py-3 bg-[#c0652a] hover:bg-[#b8561f] text-white font-medium rounded-lg transition-colors mt-4">
                            Ver Todas as Propriedades
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}