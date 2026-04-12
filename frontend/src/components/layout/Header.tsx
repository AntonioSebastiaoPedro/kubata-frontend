
"use client";

import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import icon from "@/src/assets/images/iconKubata.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", href: "#" },
    { label: "Explorar", href: "#" },
    { label: "Serviços", href: "#" },
    { label: "Sobre Nós", href: "#" },
    { label: "Contacto", href: "#" },
  ];

  return (
    <header className="bg-white sticky w-full top-0 z-40 border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4 flex items-center">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm text-gray-700 hover:text-[#c0652a] transition-colors font-normal"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Logo - Center */}
        <div className="md:flex-1 md:flex md:justify-center">
          <Image
            src={icon}
            alt="Kubata"
            width={120}
            height={40}
            className="h-10 w-auto  object-center"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Search Button */}
          <button
            aria-label="Buscar"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#4a2e1f] cursor-pointer"
          >
            <Search size={20} />
          </button>

          {/* Separator */}
          <div className="hidden md:block w-px h-6 bg-gray-300"></div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="px-4 py-2 text-[#4a2e1f] hover:text-[#c0652a] font-medium transition-colors cursor-pointer">
              Login
            </button>
            <button className="px-6 py-2 bg-[#c0652a] text-white rounded-lg hover:bg-[#b8561f] transition-colors font-medium cursor-pointer">
              Registar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#4a2e1f]"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          {/* Menu Panel */}
          <div className="absolute top-0 left-0 w-full bg-white shadow-2xl flex flex-col rounded-b-3xl animate-in slide-in-from-top duration-300">
            {/* Menu Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={icon}
                  alt="Kubata"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="font-bold text-[#4a2e1f]">Kubata</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#4a2e1f]"
                aria-label="Fechar menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-center px-4 py-4 rounded-2xl text-[#4a2e1f] bg-gray-50 hover:bg-[#c0652a]/10 hover:text-[#c0652a] transition-all font-medium text-center border border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Menu Footer - Auth */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/30 grid grid-cols-2 gap-4 rounded-b-3xl">
              <button className="w-full px-4 py-3.5 text-[#4a2e1f] bg-white border border-gray-200 rounded-xl font-semibold transition-all shadow-sm active:scale-95">
                Login
              </button>
              <button className="w-full px-4 py-3.5 bg-[#c0652a] text-white rounded-xl hover:bg-[#b8561f] font-semibold transition-all shadow-xl shadow-[#c0652a]/20 active:scale-95">
                Registar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}