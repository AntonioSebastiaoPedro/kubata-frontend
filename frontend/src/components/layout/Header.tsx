
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
    <header className="bg-white fixed w-full top-0 z-50">
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
            className="h-10 w-auto"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-[#4a2e1f] hover:text-[#c0652a] transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-gray-200 pt-3 space-y-3">
              <button className="w-full px-4 py-2 text-[#4a2e1f] hover:text-[#c0652a] font-medium transition-colors">
                Login
              </button>
              <button className="w-full px-6 py-2 bg-[#c0652a] text-white rounded-lg hover:bg-[#b8561f] transition-colors font-medium">
                Registar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}