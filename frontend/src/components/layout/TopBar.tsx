"use client";

import { useState } from "react";
import {
  Mail,
  Heart,
  ChevronDown,
  Share2,
  MessageCircle,
  Send,
  Globe,
} from "lucide-react";

export default function TopBar() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedLanguage, setSelectedLanguage] = useState("PT");

  const currencies = ["USD", "EUR", "AOA", "GBP"];
  const languages = [
    { code: "PT", label: "Português" },
    { code: "EN", label: "English" },
    { code: "ES", label: "Español" },
  ];

  const socialLinks = [
    { icon: Share2, label: "Partilhar", href: "#" },
    { icon: MessageCircle, label: "Mensagens", href: "#" },
    { icon: Send, label: "Enviar", href: "#" },
    { icon: Globe, label: "Website", href: "#" },
  ];

  return (
    <div className="bg-[#fdefeb] border-b border-gray-200 py-1.5 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Left Section - Social Media & Contact */}
          <div className="flex items-center gap-4">
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-1 rounded-lg hover:bg-[#c0652a]/10 transition-colors text-[#4a2e1f] hover:text-[#c0652a]"
                  title={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-gray-300"></div>

            {/* Email */}
            <a
              href="mailto:info@kubata.com"
              className="flex items-center gap-1 text-xs text-[#4a2e1f] hover:text-[#c0652a] transition-colors"
            >
              <Mail size={15} />
              <span className="hidden sm:inline text-xs">info@kubata.com</span>
            </a>
          </div>

          {/* Right Section - Wishlist, Currency & Language */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <button
              className="p-1 rounded-lg hover:bg-[#c0652a]/10 transition-colors text-[#c0652a] hover:text-[#c0652a]"
              title="Lista de Desejos"
            >
              <Heart size={16} />
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-gray-300"></div>

            {/* Currency Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg hover:bg-[#c0652a]/10 transition-colors text-[#4a2e1f] hover:text-[#c0652a] font-medium">
                {selectedCurrency}
                <ChevronDown size={14} />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-28">
                {currencies.map((currency) => (
                  <button
                    key={currency}
                    onClick={() => setSelectedCurrency(currency)}
                    className={`w-full text-left px-2.5 py-1.5 text-xs transition-colors ${
                      selectedCurrency === currency
                        ? "bg-[#c0652a] text-white"
                        : "hover:bg-gray-100 text-[#4a2e1f]"
                    }`}
                  >
                    {currency}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-gray-300"></div>

            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg hover:bg-[#c0652a]/10 transition-colors text-[#4a2e1f] hover:text-[#c0652a] font-medium">
                {selectedLanguage}
                <ChevronDown size={14} />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-36">
                {languages.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setSelectedLanguage(code)}
                    className={`w-full text-left px-2.5 py-1.5 text-xs transition-colors ${
                      selectedLanguage === code
                        ? "bg-[#c0652a] text-white"
                        : "hover:bg-gray-100 text-[#4a2e1f]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
