"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import icon from "@/src/assets/images/iconKubata.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 text-[#4a2e1f]">
            <div className="px-6 py-12 sm:py-16">
                <div className="container md:max-w-7xl  mx-auto">
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-10 md:gap-8">
                        <div className="flex flex-col items-center md:items-start">
                            <Image
                                src={icon}
                                alt="Kubata"
                                width={120}
                                height={40}
                                className="h-10 w-auto mb-3"
                            />
                            <p className="text-sm text-gray-500 max-w-[200px]">
                                A plataforma de imóveis mais completa de Angola
                            </p>
                        </div>

                        {/* Contato */}
                        <div className="flex flex-col items-center md:items-end gap-4 sm:gap-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-full shadow-sm">
                                    <Mail size={16} className="text-[#c0652a]" />
                                </div>
                                <a href="mailto:info@kubata.com" className="text-sm text-gray-600 hover:text-[#c0652a] font-medium transition-colors">
                                    info@kubata.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-full shadow-sm">
                                    <Phone size={16} className="text-[#c0652a]" />
                                </div>
                                <a href="tel:+244923000000" className="text-sm text-gray-600 hover:text-[#c0652a] font-medium transition-colors">
                                    +244 923 000 000
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Separador */}
                    <div className="border-t border-gray-200 my-8 sm:my-10"></div>

                    {/* Copyright */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            &copy; {currentYear} Kubata. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
