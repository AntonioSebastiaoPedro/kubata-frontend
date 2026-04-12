import Image from "next/image";
import home from "@/src/assets/images/home1.jpg";
import { Home, Building, Warehouse } from "lucide-react";

export default function Highlight() {
    return (
        <section className="py-12 sm:py-20 px-4 bg-white overflow-hidden">
            <div className="container md:max-w-7xl  mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Left - Content */}
                    <div className="flex-1 text-center lg:text-left w-full max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#4a2e1f] mb-4 sm:mb-6 leading-tight">
                            Encontre o Lar dos seus Sonhos
                        </h2>
                        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                            Descubra propriedades exclusivas selecionadas especialmente para você. 
                            Da confortável casa nos subúrbios ao elegante apartamento no centro, 
                            temos a propriedade perfeita que se encaixa no seu estilo de vida.
                        </p>
                    </div>

                    {/* Center - Image */}
                    <div className="flex-1 flex justify-center w-full max-w-sm mx-auto lg:max-w-none">
                        <div className="relative w-full aspect-square sm:aspect-auto sm:h-[400px] rounded-3xl overflow-hidden shadow-2xl skew-y-1 lg:skew-y-0 hover:skew-y-0 transition-transform duration-500">
                            <Image
                                src={home}
                                alt="Propriedade em Destaque"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
                        </div>
                    </div>

                    {/* Right - Categories */}
                    <div className="flex-1 w-full max-w-sm mx-auto lg:mx-0 space-y-8">
                        <div className="space-y-3">
                            {/* Category 1 */}
                            <button className="w-full group flex items-start gap-3 pb-3 border-b border-gray-300 hover:border-[#c0652a] transition-colors text-left">
                                <Home size={20} className="text-[#c0652a] mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-medium text-[#4a2e1f] group-hover:text-[#c0652a] transition-colors">
                                        Apartamentos Urbanos
                                    </h3>
                                    <p className="text-xs text-gray-500">120 propriedades</p>
                                </div>
                            </button>

                            {/* Category 2 */}
                            <button className="w-full group flex items-start gap-3 pb-3 border-b border-gray-300 hover:border-[#c0652a] transition-colors text-left">
                                <Building size={20} className="text-[#c0652a] mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-medium text-[#4a2e1f] group-hover:text-[#c0652a] transition-colors">
                                        Casas Familiares
                                    </h3>
                                    <p className="text-xs text-gray-500">85 propriedades</p>
                                </div>
                            </button>

                            {/* Category 3 */}
                            <button className="w-full group flex items-start gap-3 pb-3 border-b border-gray-300 hover:border-[#c0652a] transition-colors text-left">
                                <Warehouse size={20} className="text-[#c0652a] mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-medium text-[#4a2e1f] group-hover:text-[#c0652a] transition-colors">
                                        Espaços Comerciais
                                    </h3>
                                    <p className="text-xs text-gray-500">45 propriedades</p>
                                </div>
                            </button>
                        </div>

                        {/* CTA Button */}
                        <button className="w-full px-8 py-4 bg-[#c0652a] hover:bg-[#b8561f] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#c0652a]/20 mt-4 active:scale-95">
                            Ver Todas as Propriedades
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}