import React from "react";
import Link from "next/link";
import Container from "@/components/Container";

export const metadata = {
  title: "Page introuvable - Kasa",
  description: "Il semble que la page que vous cherchez ait pris des vacances… ou n'ait jamais existé.",
};

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 md:py-20 text-center">
      {/* 404 Large Text */}
      <h1 className="text-[100px] md:text-[180px] font-black text-main-red leading-none select-none tracking-tight animate-bounce-slow">
        404
      </h1>

      {/* Description Text */}
      <p className="mt-4 text-sm md:text-base font-normal text-noir max-w-[342px] md:max-w-md mx-auto leading-relaxed">
        Il semble que la page que vous cherchez ait pris des vacances… ou n’ait jamais existé.
      </p>

      {/* Call to Actions */}
      <div className="mt-10 flex flex-col gap-[14px] items-center w-[200px]">
        <Link
          href="/"
          className="bg-main-red text-white text-[14px] font-medium px-[32px] py-[8px] rounded-[10px] w-full text-center hover:opacity-90 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-main-red focus:ring-offset-2"
          aria-label="Retourner à la page d'accueil"
        >
          Accueil
        </Link>
        <Link
          href="/#properties-list"
          className="bg-main-red text-white text-[14px] font-medium px-[32px] py-[8px] rounded-[10px] w-full text-center hover:opacity-90 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-main-red focus:ring-offset-2"
          aria-label="Voir la liste des logements"
        >
          Logements
        </Link>
      </div>
    </Container>
  );
}
