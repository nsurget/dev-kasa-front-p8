"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 md:px-4 md:py-4 md:py-6 bg-transparent">
      {/* Desktop Navigation (Visible on MD screens and above) */}
      <div className="hidden md:block mx-auto w-fit bg-white md:rounded-[10px] md:shadow-[0px_4px_4px_0px_rgba(182,182,182,0.05)] md:border md:border-[#f5f5f5]">
        <div className="flex gap-[46px] h-16 items-center justify-between px-4 md:px-[100px]">
          
          {/* Header Left: Navigation Links */}
          <nav className="flex items-center gap-[28px]">
            <Link
              href="/"
              className={`text-[14px] font-normal transition-colors duration-200 ${
                isActive("/") ? "text-[#99331a] font-medium" : "text-[#0d0d0d] hover:text-[#99331a]"
              }`}
            >
              Accueil
            </Link>
            <Link
              href="/about"
              className={`text-[14px] font-normal transition-colors duration-200 ${
                isActive("/about") ? "text-[#99331a] font-medium" : "text-[#0d0d0d] hover:text-[#99331a]"
              }`}
            >
              À propos
            </Link>
          </nav>

          {/* Header Center: Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" aria-label="Kasa Home">
              <Logo size="small" />
            </Link>
          </div>

          {/* Header Right: Auth links */}
          <div className="flex items-center gap-[28px]">
            <Link
              href="/login"
              className={`text-[14px] font-normal transition-colors duration-200 ${
                isActive("/login") ? "text-[#99331a] font-medium" : "text-[#0d0d0d] hover:text-[#99331a]"
              }`}
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className={`text-[14px] font-medium px-3 py-1.5 rounded-md border border-[#99331a] text-[#99331a] hover:bg-[#99331a] hover:text-white transition-all duration-200 ${
                isActive("/register") ? "bg-[#99331a] text-white" : ""
              }`}
            >
              S'inscrire
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Navigation (Visible below MD screens) */}
      <div className="md:hidden w-full bg-white shadow-[0px_4px_4px_0px_rgba(182,182,182,0.05)] border border-[#f5f5f5]">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" aria-label="Kasa Home" className="flex items-center">
            <Logo variant="picto" className="h-[40px] w-[34.5px]" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center p-2 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <div className="relative w-[28px] h-[20px]">
              <span
                className={`absolute block h-[2px] bg-[#0d0d0d] rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? "w-[28px] rotate-45 top-[9px]" : "w-[20px] top-0 right-0"
                }`}
              />
              <span
                className={`absolute block h-[2px] bg-[#0d0d0d] rounded-full transition-all duration-300 ease-in-out top-[9px] right-0 left-0 ${
                  isOpen ? "w-0 opacity-0" : "w-[28px]"
                }`}
              />
              <span
                className={`absolute block h-[2px] bg-[#0d0d0d] rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? "w-[28px] -rotate-45 top-[9px]" : "w-[14px] top-[18px] right-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isOpen && (
          <nav className="flex flex-col gap-4 px-6 py-4 border-t border-[#f5f5f5] bg-white rounded-b-[10px] animate-in fade-in slide-in-from-top-4 duration-200">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`text-[14px] font-normal transition-colors duration-200 ${
                isActive("/") ? "text-[#99331a] font-medium" : "text-[#0d0d0d] hover:text-[#99331a]"
              }`}
            >
              Accueil
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`text-[14px] font-normal transition-colors duration-200 ${
                isActive("/about") ? "text-[#99331a] font-medium" : "text-[#0d0d0d] hover:text-[#99331a]"
              }`}
            >
              À propos
            </Link>
            <hr className="border-[#f5f5f5]" />
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className={`text-[14px] font-normal transition-colors duration-200 ${
                isActive("/login") ? "text-[#99331a] font-medium" : "text-[#0d0d0d] hover:text-[#99331a]"
              }`}
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className={`text-[14px] font-medium text-center py-2 rounded-md border border-[#99331a] text-[#99331a] hover:bg-[#99331a] hover:text-white transition-all duration-200 ${
                isActive("/register") ? "bg-[#99331a] text-white" : ""
              }`}
            >
              S'inscrire
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
