"use client";

import { Mail, Phone, MapPin, Share2, MessageCircle, Send, Globe } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#4a2e1f] text-gray-200">
            {/* Main Footer */}
            <div className="px-4 py-16 border-b border-gray-700">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        {/* Company Info */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Kubata</h3>
                            <p className="text-sm text-gray-400 mb-6">
                                Sua plataforma confiável para encontrar o lar perfeito em Angola.
                            </p>
                            {/* Social Links */}
                            <div className="flex gap-3">
                                <a href="#" className="p-2 bg-[#c0652a] hover:bg-[#b8561f] rounded-full transition-colors" title="Share">
                                    <Share2 size={18} />
                                </a>
                                <a href="#" className="p-2 bg-[#c0652a] hover:bg-[#b8561f] rounded-full transition-colors" title="Message">
                                    <MessageCircle size={18} />
                                </a>
                                <a href="#" className="p-2 bg-[#c0652a] hover:bg-[#b8561f] rounded-full transition-colors" title="Send">
                                    <Send size={18} />
                                </a>
                                <a href="#" className="p-2 bg-[#c0652a] hover:bg-[#b8561f] rounded-full transition-colors" title="Website">
                                    <Globe size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-[#c0652a] transition-colors">
                                        Início
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-[#c0652a] transition-colors">
                                        Explorar Propriedades
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-[#c0652a] transition-colors">
                                        Sobre Nós
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-[#c0652a] transition-colors">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Categories */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Categorias</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-[#c0652a] transition-colors">
                                        Apartamentos
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-[#c0652a] transition-colors">
                                        Casas
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-[#c0652a] transition-colors">
                                        Escritórios
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-[#c0652a] transition-colors">
                                        Villas
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Contacte-nos</h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Phone size={18} className="text-[#c0652a] mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-400">+244 923 000 000</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail size={18} className="text-[#c0652a] mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-400">info@kubata.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-[#c0652a] mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-400">Luanda, Angola</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="px-4 py-8">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-400">
                            &copy; {currentYear} Kubata. Todos os direitos reservados.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-[#c0652a] transition-colors">
                                Política de Privacidade
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#c0652a] transition-colors">
                                Termos de Serviço
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#c0652a] transition-colors">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
