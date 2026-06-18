import React from "react";
import Banner from "@/components/Banner";
import CardProperty from "@/components/CardProperty";
import Container from "@/components/Container";
import HowItWorks from "@/components/HowItWorks";
import { Property } from "../../types/property";

export const dynamic = "force-dynamic";

async function getProperties(): Promise<Property[]> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${backendUrl}/api/properties`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch properties: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export default async function Home() {
  let properties: Property[] = [];
  let errorMsg: string | null = null;

  try {
    properties = await getProperties();
  } catch (err) {
    console.error("Error fetching properties on server:", err);
    errorMsg = err instanceof Error ? err.message : "Impossible de récupérer les logements pour le moment.";
  }

  return (
    <Container className="flex flex-col gap-8 py-8">
      {/* Banner */}
      <Banner
        title={
          <>
            <span className="block md:inline">Chez vous, </span>
            <span className="block md:inline">partout et ailleurs</span>
          </>
        }
        description="Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes."
        imageSrc="/assets/hero-banner.png"
        imageAlt="Chalet en bois moderne en pleine nature, Kasa"
      />

      {/* Properties Section Container */}
      <div className="w-full">
        {errorMsg ? (
          <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-100 rounded-xl text-center">
            <span className="text-sm font-semibold text-red-600 mb-2">Erreur de chargement</span>
            <p className="text-xs text-red-800 max-w-md">{errorMsg}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12 text-[#565656]">
            Aucun logement disponible actuellement.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-items-center">
            {properties.map((property) => (
              <CardProperty key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      {/* How it Works Block */}
      <HowItWorks />
    </Container>
  );
}
