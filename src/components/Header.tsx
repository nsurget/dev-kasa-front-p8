"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { isAuthenticated, logout, checkAuth } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      checkAuth();
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [checkAuth]);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 md:px-4 md:py-6 bg-transparent">
      {/* Desktop Navigation (Visible on MD screens and above) */}
      <div className="hidden md:block mx-auto w-fit bg-white md:rounded-[10px] md:shadow-[0px_4px_4px_0px_rgba(182,182,182,0.05)] md:border md:border-[#f5f5f5]">
        <div className="flex gap-[46px] h-16 items-center justify-between px-10  xl:px-[100px]">
          
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

          {/* Header Right: Auth links / Logged in view */}
          <div className="flex items-center gap-[28px]">
            {mounted && isAuthenticated ? (
              <>
                <Link
                  href="/properties/create"
                  className="text-[14px] font-medium text-[#99331a] hover:opacity-80 transition-opacity"
                >
                  +Ajouter un logement
                </Link>
                
                {/* Icons group */}
                <div className="flex gap-[8px] items-center justify-center">
                  {/* Like icon */}
                  <Link
                    href="/favorites"
                    className="flex items-center justify-center p-[3px] text-[#565656] hover:text-[#99331a] transition-colors"
                    aria-label="Mes favoris"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="size-[16px]"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </Link>

                  {/* Vertical separator */}
                  <div className="h-[12px] w-[1px] bg-[#dc3ee483] rotate-12" aria-hidden="true" />

                  {/* Message bubble icon */}
                  <Link
                    href="/messages"
                    className="flex items-center justify-center p-[3px] text-[#565656] hover:text-[#99331a] transition-colors"
                    aria-label="Mes messages"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="size-[16px]"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-1.074-.765 6 6 0 0 0 1.257-3.644C4.184 15.263 3 13.754 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                  </Link>
                </div>

                {/* Logout Door button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-[3px] text-[#565656] hover:text-[#99331a] transition-colors cursor-pointer"
                  aria-label="Se déconnecter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="size-[18px]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                </button>
              </>
            ) : (
              <>
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
                  S&apos;inscrire
                </Link>
              </>
            )}
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
            
            {mounted && isAuthenticated ? (
              <>
                <Link
                  href="/properties/create"
                  onClick={() => setIsOpen(false)}
                  className="text-[14px] font-medium text-[#99331a] py-1"
                >
                  +Ajouter un logement
                </Link>
                <Link
                  href="/favorites"
                  onClick={() => setIsOpen(false)}
                  className="text-[14px] font-normal text-[#0d0d0d] py-1"
                >
                  Mes favoris
                </Link>
                <Link
                  href="/messages"
                  onClick={() => setIsOpen(false)}
                  className="text-[14px] font-normal text-[#0d0d0d] py-1"
                >
                  Mes messages
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[14px] font-medium text-left text-red-600 py-1 cursor-pointer flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="size-[16px]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
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
                  S&apos;inscrire
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
