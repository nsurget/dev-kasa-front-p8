import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import Container from "@/components/Container";
import CreatePropertyForm from "@/components/CreatePropertyForm";

export const dynamic = "force-dynamic";

export default async function CreatePropertyPage() {
  const cookieStore = await cookies();
  const authUserCookie = cookieStore.get("auth_user")?.value;

  let isAuthorized = false;
  let userRole = "";

  if (authUserCookie) {
    try {
      const parsedUser = JSON.parse(authUserCookie);
      userRole = parsedUser?.role || "";
      if (userRole === "owner" || userRole === "admin") {
        isAuthorized = true;
      }
    } catch (e) {
      console.error("Error parsing auth_user cookie on server:", e);
    }
  }

  if (!isAuthorized) {
    return (
      <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 md:py-20 text-center font-sans">
        {/* 403 Large Text */}
        <h1 className="text-[100px] md:text-[180px] font-black text-main-red leading-none select-none tracking-tight animate-bounce-slow">
          403
        </h1>

        {/* Description Text */}
        <p className="mt-4 text-sm md:text-base font-normal text-noir max-w-[342px] md:max-w-md mx-auto leading-relaxed">
          Accès non autorisé. Vous n&apos;avez pas les droits nécessaires pour accéder à cette page. Cette fonctionnalité est réservée aux propriétaires et administrateurs.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col gap-[14px] items-center w-[200px]">
          <Link
            href="/"
            className="bg-main-red text-white text-[14px] font-medium px-[32px] py-[8px] rounded-[10px] w-full text-center hover:opacity-90 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-main-red focus:ring-offset-2 cursor-pointer"
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

  return (
    <Container className="py-8">
      <CreatePropertyForm />
    </Container>
  );
}
