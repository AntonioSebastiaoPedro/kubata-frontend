"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import icon from "@/src/assets/images/iconKubata.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 text-gray-200">
            <div className="px-4 py-12">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Logo e Descrição */}
                        <div>
                            <Image
                                src={icon}
                                alt="Kubata"
                                width={120}
                                height={40}
                                className="h-10 w-auto mb-2 "
                            />
                            <p className="text-sm text-gray-400">
                                Plataforma de imóveis em Angola
                            </p>
                        </div>

                        {/* Contato */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex items-center gap-2">
                                <Mail size={18} className="text-[#c0652a]" />
                                <a href="mailto:info@kubata.com" className="text-sm text-gray-400 hover:text-[#c0652a] transition-colors">
                                    info@kubata.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={18} className="text-[#c0652a]" />
                                <a href="tel:+244923000000" className="text-sm text-gray-400 hover:text-[#c0652a] transition-colors">
                                    +244 923 000 000
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Separador */}
                    <div className="border-t border-gray-700 my-6"></div>

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
