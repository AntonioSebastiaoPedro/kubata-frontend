
"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import icon from "@/src/assets/images/iconKubata.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", href: "/" },
    { label: "Explorar", href: "/explore" },
    { label: "Serviços", href: "/services" },
    { label: "Sobre Nós", href: "/about" },
    { label: "Contacto", href: "/contact" },
  ];

  return (
    <header className="bg-white sticky w-full top-0 z-40 border-b border-gray-200">
      <nav className="container md:max-w-7xl  mx-auto px-4 py-4 flex items-center">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-sm text-gray-700 hover:text-[#c0652a] transition-colors font-normal"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logo - Center */}
        <div className="md:flex-1 md:flex md:justify-center">
          <Link href="/">
            <Image
              src={icon}
              alt="Kubata"
              width={120}
              height={40}
              className="h-10 w-auto object-center"
            />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Search Button */}
          <Link
            href="/explore"
            aria-label="Buscar"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#4a2e1f] cursor-pointer"
          >
            <Search size={20} />
          </Link>

          {/* Separator */}
          <div className="hidden md:block w-px h-6 bg-gray-300"></div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login" className="px-4 py-2 text-[#4a2e1f] hover:text-[#c0652a] font-medium transition-colors cursor-pointer">
              Login
            </Link>
            <Link href="/register" className="px-6 py-2 bg-[#c0652a] text-white rounded-lg hover:bg-[#b8561f] transition-colors font-medium cursor-pointer">
              Registar
            </Link>
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
      <div 
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-0 left-0 w-full bg-white shadow-2xl flex flex-col rounded-b-3xl transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Menu Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Image
                  src={icon}
                  alt="Kubata"
                  width={32}
                  height={32}
                  className="h-10 w-auto"
                />
              </Link>
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
          <div className="flex-1 overflow-y-auto py-2 px-6">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between py-4 text-[#4a2e1f] hover:text-[#c0652a] transition-all font-medium border-b border-gray-100 last:border-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Menu Footer - Auth */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/30 grid grid-cols-2 gap-4 rounded-b-3xl">
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center px-4 py-3.5 text-[#4a2e1f] bg-white border border-gray-200 rounded-xl font-semibold transition-all shadow-sm active:scale-95">
              Login
            </Link>
            <Link href="/register" onClick={() => setIsMenuOpen(false)} className="w-full text-center px-4 py-3.5 bg-[#c0652a] text-white rounded-xl hover:bg-[#b8561f] font-semibold transition-all shadow-xl shadow-[#c0652a]/20 active:scale-95">
              Registar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}