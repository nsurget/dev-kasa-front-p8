import React from "react";
import Banner from "@/components/Banner";
import { Property } from "../../types/property";

export const dynamic = "force-dynamic";

async function getProperties(): Promise<Property[]> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${backendUrl}/api/properties`, {
    cache: "no-store", // disable caching to ensure we get fresh data for testing, or adjust as needed
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch properties: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export default async function Home() {
  let properties: Property[] = [];
  let errorDump: any = null;

  try {
    properties = await getProperties();
  } catch (err: any) {
    console.error("Error fetching properties on server:", err);
    errorDump = {
      message: err.message || "An error occurred while fetching properties on the server.",
      stack: err.stack,
    };
  }

  return (
    <div className="flex flex-col gap-8 py-8 max-w-[1240px] mx-auto px-4">
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

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#0d0d0d]">API Response (Server-side Fetch)</h2>

        {errorDump ? (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-red-600">Erreur lors de la requête :</span>
            <pre className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-xs overflow-auto font-mono text-left max-w-full">
              {JSON.stringify(errorDump, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-green-600">Succès ! Liste des propriétés :</span>
            <pre className="bg-slate-50 border border-slate-200 text-slate-800 p-4 rounded-xl text-xs overflow-auto font-mono text-left max-w-full">
              {JSON.stringify(properties, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
